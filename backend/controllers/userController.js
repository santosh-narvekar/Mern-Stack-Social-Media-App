const bcrypt = require("bcryptjs")
const User = require("../models/usersModel");
const { createJsonWebToken } = require("../createJsonWebToken");
const { Post } = require("../models/postsModel");
const { Reply } = require("../models/replyModel");
const {v2:cloudinary}= require('cloudinary');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

// sign up activateAccount login should go in a auth controller
const signup =  async (req,res,next)=>{
  try{
    // 1. get the data from the body
     const {name,email,username,password} = req.body;
     if(!name || !email || !username || !password){
      return res.status(400).json({message:"please fill in all the fields"});
     }
     
     if(name.length > 30 && name.length < 3){
      return res.status(400).json({message:"the name you provided won't be accepted"})
     }
     
     if(username.length > 30 || username.length < 3){
      return res.status(400).json({message:"username can be between 3 to 30 characters"})
     }

     
    // 2. check if user already exists
    const existUser = await User.findOne({email,username});
    const oneUserWithEmail = await User.findOne({email});
    const oneUserWithUserName = await User.findOne({username})
    
    if(existUser || oneUserWithEmail || oneUserWithUserName ){
      return res.status(400).json({message:"email or username already taken!"});
    }
    
    
    // validating email
    const token = jwt.sign({email},process.env.SECRET_KEY)

    // 3. now encrypting password
    const hashedPassword = await bcrypt.hash(password,10);

    // 4. create new user in db
    const user = new User({name,email,username,password:hashedPassword,confirmationCode:token});

    if(!user){
      return res.status(400).json({message:"something went wrong"});
    }
    

   const sendEmail=async options=>{
     const transporter = nodemailer.createTransport({
      service:'Gmail',
      auth:{
        user:process.env.SENDER_EMAIL, //here goes the email
        pass:process.env.EMAIL_PASSWORD, //here goes the password
      }
     });

     const mailOptions ={
      from:process.env.SENDER_EMAIL,
      to:options.email,
      subject:options.subject,
      html:options.message
     }

     await transporter.sendMail(mailOptions)
   }
    
   const signupUrl = `${req.protocol}://${req.get('host')}/confirm/${token}`
    const data = await user.save()
    if(data){
      try{
        await sendEmail({
          email: user.email,
          subject:'Email Confirmation',
          message:`
           In order to use your account \n          
           Please click on this link to activate your account
           :<a href=${signupUrl}>Click here</a>
           \n This link will take you to the login page where then you can
           use your credentials to login
           `
        })
        return res.status(200).json({message:"email sent successfully,please check your gmail for activation link"});
      }catch(err){
        return res.status(400).json({message:'something went wrong'});
      }
    }
  }catch(err){
    return res.status(400).json({message:err});
  }
}

const activateAccount = async(req,res,next)=>{
  try{
    const {token} = req.params;
    const user = await User.findOne({confirmationCode:token}).select('-password').select('-confirmationCode')

    if(!user){
      return res.status(400).json({message:"user doesn't exist"})
    }

    user.status = "Active";
    await user.updateOne({status:'Active'});

    //return res.send({message:'user account activated'})
    res.redirect(`${window.location.protocol}://${window.location.host}:${window.location.port}/login`)
  }catch(err){
    console.log(err)
    return res.status(500).json({message:"something went wrong!"});
  }
}

const login = async(req,res,next)=>{
  try{
    const {email,password} = req.body;
     console.log(req.body)
    if(!email || !password){
      return res.status(400).json({message:"plz fill all the fields"});
    }

    const existUser = await User.findOne({email});
  
    if(!existUser){
      return res.status(400).json({message:"No account found with this credentials"})
    }

    if(existUser?.status!="Active"){
      return res.status(401).json({message:"Pending Account,Please Verify Your email"})
    }
    
    const checkPassword = await bcrypt.compare(password,existUser.password);
   
    if(!checkPassword){
      return res.status(400).json({message:"Invalid Credentials"});
    }

    createJsonWebToken(existUser?._id,res);
    
    const user = await User.findOne({email:existUser.email,password:existUser.password}).select('-password').select('-status').select('-confirmationCode');

    return res.status(200).json({user});    
  } catch(err) {
    return res.status(400).json({message:err});
  }
}

const followUnfollowUser = async(req,res,next)=>{
  try{
    const {_id} = req.user;
    const {id} = req.params;
    
    if(id == _id){
       return res.status(400).json({message:"you can't follow unfollow yourself"})
    }
    
    const curUser = await User.findById(_id).select('-password').select('-confirmationCode').select('-status');
    const userToFollowAndUnfollow = await User.findById(id).select('-password').select('-confirmationCode').select('-status');
    
    if(curUser.following.includes(id)){
    // if logged in user is already following the params user
    curUser.following.splice(curUser.following.indexOf(id),1);
    userToFollowAndUnfollow?.followers.splice(userToFollowAndUnfollow?.followers.indexOf(_id),1);
   
    await curUser.save();
    await userToFollowAndUnfollow.save();
    return res.status(200).json({curUser,userToFollowAndUnfollow});
    }else{
    curUser.following.push(id);
    userToFollowAndUnfollow.followers.push(_id);
    
    await curUser.save();
    await userToFollowAndUnfollow.save();
    
    return res.status(200).json({curUser,userToFollowAndUnfollow})
  }
  
}catch(err){
  console.log(err)
  return res.status(500).json({message:'something went wrong'});
}
}

const updateUser = async(req,res,next)=>{
  try{
    const {_id} = req.user;

    if(_id != req.params.id){
      return res.status(403).json({message:"Unauthorized"})
    }

    const {name,username,bio} = req.body;
    let {photo} = req.body;
    let user = await User.findById(_id).select('-password').select('-confirmationCode').select('-status');
 
    if(name == ' ' || username== " " || name== '' || username == '' ){
      return res.status(403).json({message:"fields can't be empty"})
    }

    if(name.length>30 || name.length < 3 || username.length > 30 || username.length < 3){
      return res.status(400).json({message:"username  must be between 30 to 3 characters"})
    }
    
    if(username.length > 15  || username.length<3){
      return res.status(400).json({message:'username must be between 3 to 15 characters'})
    }
    if(bio.length>30){
      return res.status(400).json({message:"about can be only 30 characters"})
    }

    if(!user){
      return res.status(400).json({message:"account not found!"});
    }

    if(photo){
      if(user.photo != photo && user.photo !== ""){
      await cloudinary.uploader.destroy(user.photo.split("/").pop().split('.')[0])
      }
      const uploadedImg = await cloudinary.uploader.upload(photo);
      photo = uploadedImg.secure_url
    }
    
    user.name = name;
    user.username = username;
    user.photo = photo;
    user.bio=bio;
  
    await Reply.updateMany({userId:_id},{
      username:user.username,
      userProfile:user.photo
    })

    await Post.updateMany({postedBy:_id},{
      user:{
        _id:user._id,
        name:user.name,
        username:user.username,
        photo:user.photo,
        bio:user.bio 
      }
    });


    user = await user.save();
    return res.status(200).json({message:"user profile updated successfully",user});
   }catch(err){
    console.log(err)
    return res.status(500).json({message:'something went wrong!maybe username has been taken already'})
  }
}

const logOutUser = async(req,res,next)=>{
  try{
    const {_id} = req.user;
    if(_id != req.params.id){
      return res.status(403).json({message:"Unauthorized Action!"});
    }
    
    // delete the jwt cookie
    
    const token = res.cookie('jwt',"",{maxAge:1})
    return res.status(200).json("User logged out successfully");
  }catch(err){
    return res.status(500).json({message:err})
  }
}

const updatePassword = async(req,res,next)=>{
  try{
    const {_id} = req.user;
    const user = await User.findById(_id).select('-confirmationCode').select('-status');
    
    if(!user){
      return res.status(400).json({message:"account not found!"})
    }

    const {password,confirmPassword,newPassword} = req.body;
    
    if(!password || !confirmPassword){
      return res.status(400).json({message:"fields are not provided"});
    }
    
    if(!newPassword){
    
      return res.status(400).json({message:"newPassword not provided"})
    }

    if(newPassword.length < 8 ){
      return res.status(400).json({message:"password must be off atleast 8 characters"})
    }

    if(password !== confirmPassword){
      return res.status(400).json({message:"password and confirm password are not the same"});
    }

    const checkPassword = await bcrypt.compare(password,user.password);

    if(!checkPassword){
      return res.status(400).json({message:"Invalid credentials, password not updated"});
    }


    const hashedPassword = await bcrypt.hash(newPassword,10);

    await user.updateOne({
      password:hashedPassword,
      passwordChangedAt:Date.now() - 1
    });

    res.cookie("jwt","",{maxAge:1})
    return res.status(201).json({message:`password updated successfully`});
  } catch(err) {
    console.log(err)
    return res.status(500).json({message:"something went wrong"})
  }
}

const getAllUsers = async(req,res,next)=>{
  try{
    const users = await User.find({status:'Active'}).select('-password').select('-confirmationCode').select('-status');
    
    if(!users){
      return res.status(400).json("something went wrong");
    }
    
    return res.status(200).json(users);
  }catch(err){
    return res.status(500).json({message:err});
  }
}

const getOneUser = async(req,res,next)=>{
  try{
    const user = await User.findById(req.params.id).select('-password').select('-confirmationCode').select('-status');
    if(!user){
      return res.status(400).json({message:"user not found!"})
    }
    return res.status(200).json(user);
  }catch(err){
    return res.status(400).json({message:"something went wrong!"});
  }
}

const getLoggedInUser = async(req,res,next)=>{
  try{
    const user = await User.findById(req.user._id).select('-password').select('-confirmationCode').select('-status');
    return res.status(200).json(user);
  }catch(err){
    return res.status(500).json({message:'something went wrong'});
  }
}

const getUsersForSideBar = async(req,res,next)=>{
  try{
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({_id:{$ne:loggedInUserId}, status:'Active'}).select('-password').select('-confirmationCode').select('status');
     res.status(200).json(filteredUsers);
  }catch(err){
    console.log(err)
    res.status(500).json({message:"Something went wrong!"});
  }
}

const getFollowers = async(req,res,next)=>{
  try{
    const user = await User.findById(req.params.id).populate('followers');
    if(!user) return res.status(400).json({message:"user doesn't exist"});
    return res.status(200).json(user?.followers);
  }catch(err){
    return res.status(500).json({message:"something went wrong!"})
  }
}

const getFollowing = async(req,res,next)=>{
  try{
    const user = await User.findById(req.params.id).populate('following');
    if(!user) return res.status(400).json({message:"user doesn't exist"});
    return res.status(200).json(user?.following);
  }catch(err){
    console.log(err)
    return res.status(500).json({message:"something went wrong!"})
  }
}

module.exports = { signup , login , followUnfollowUser , logOutUser , updateUser , updatePassword,getAllUsers,activateAccount,getOneUser,getLoggedInUser,getUsersForSideBar,getFollowers,getFollowing}