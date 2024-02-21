const e = require("express");
const { Post } = require("../models/postsModel");
const { Reply } = require("../models/replyModel");
const User = require("../models/usersModel");
const {v2:cloudinary}=require('cloudinary')

const createPosts = async(req,res,next)=>{
  try{
    const {_id} = req.user;
    const {postContent} = req.body;
    let {resource} = req.body;
    const user = await User.findById(_id).select('-password').select('-confirmationCode').select('-status');
    if(!postContent){
     return res.status(400).json({message:"plz fill all the fields"});
    }

    if(postContent.length > 200 || postContent.length < 3){
      return res.status(400).json({message:"postContent length exceeded or too short"});
    }


    if(resource?.startsWith(`data:video/mp4`)){
    let uploadedVideo;
    await cloudinary.uploader.upload_large(resource,{
      resource_type:"video", 
    },(error,result)=>{
      if(error){
        return 
      }
      uploadedVideo = result.secure_url;
    })
    resource = uploadedVideo
  }else{
     const uploadedImg = await cloudinary.uploader.upload(resource);
     resource = uploadedImg.secure_url
   }

    const newPost = await Post.create({
      postedBy:_id,
      postContent,
      resource,
      user:user
     })

    const post = await newPost.save();
    return res.status(201).json({message:"post created successfully",post});
  }catch(err){
    console.log(err)
    return res.status(500).json({message:"something went wrong"});
  }
}

const likeUnlikePost = async(req,res,next)=>{
  try{
   const {_id} = req.user;
    let post = await Post.findById(req.params.id);
    
    if(!post){
      return res.status(400).json({message:"post not found!may have been deleted"});
    }

    if(post?.likes.includes(_id)){
      post?.likes.splice(post?.likes.indexOf(_id),1);
    } else {
      post?.likes.push(_id);
    }

    
    post = await post.save();
    return res.status(200).json(post)
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Something went wrong"})
  }
}

const CommentOnPost = async(req,res,next)=>{
  try{
    const {_id} = req.user;
    
    const post = await Post.findById(req.params.id);
    
    if(!post){
      return res.status(400).json({message:"post not found!may have been deleted"});
    }

    const user = await User.findById(_id);
    
    const { userComment } = req.body;
    const { username } = user;
    const { photo } = user;
    
    if(!userComment){
      return res.status(400).json({message:"plz provide a comment"})
    }

    if(userComment.length > 200){
      return res.status(400).json({message:"post content is too long"})
    }

    const postComment = await Reply.create({
      userId: user?._id,
      postId:post?._id,
      text:userComment,
      username,
      userProfile:photo,
    })

    post?.replies.push({userId:postComment.userId,replyId:postComment._id,postId:post._id});
    await post.save();
    
    return  res.status(201).json({message:"replied successfully",post,postComment})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Something went wrong"});
  }
}

const deletePost = async(req,res,next)=>{
  try{
    const {_id} = req.user;
    const post = await Post.findById(req.params.id);
    
    if(!post){
      return res.status(400).json({message:"post not found!may have been deleted"});
    }
    
    if(_id != post.postedBy){
      return res.status(403).json({message:"You can't delete this Post"})
    }
    
    await cloudinary.uploader.destroy(post.resource.split("/").pop().split('.')[0])
    await post.deleteOne();
    
    return res.status(200).json({message:'post deleted successfully'});
  }catch(err){
    return res.status(500).json({message:'something went wrong'});
  }
}

const updatePost = async(req,res,next)=>{
  try{
    const {_id} = req.user;
    const {postContent} = req.body
    let {resource}=req.body
  
    let post = await Post.findById(req.params.id);
  
    if(!post){
     return res.status(400).json({message:"post not found!may have been deleted"});
    }
    if( resource == "" || postContent == "" || resource==" " || postContent==" "){
      return res.status(400).json({message:"fields cannot be empty"});
    }

    if(!resource && !postContent) {
      return res.status(400).json({message:"please provide fields to update"});
    }

    if(postContent.length > 200){
      return res.status(400).json({message:"post content can be only 200 characters long"})
    }
    if(_id != post.postedBy){
      return res.status(403).json({message:"you can't update this post"});
    }


   if(resource.startsWith(`data:video/mp4`) || resource.includes('/video/upload') ){
    let uploadedVideo;
    await cloudinary.uploader.upload_large(resource,{
      resource_type:"video", 
    },(error,result)=>{
      if(error){
        return 
      }
      uploadedVideo = result.secure_url;
    })
    resource = uploadedVideo
  }else{
     const uploadedResource = await cloudinary.uploader.upload(resource);
     resource =uploadedResource.secure_url
   }

   
     post.postContent=postContent,
     post.resource=resource

     post = await post.save();
    
     return res.status(200).json({message:'post updated successfully',post});
  }catch(err){
    console.log(err)
    return res.status(500).json({message:'something went wrong!'});
  }
}

const getAllPosts = async(req,res,next)=>{
  try{
    const posts = await Post.find().sort({createdAt:-1})
    return res.status(200).json({posts});
  }catch(err){
    console.log(err);
    return res.status(500).json("something went wrong")
  }
}

const getFeedPosts=async(req,res,next) => {
  try{
    const user = await User.findById(req.user._id);
  
    const following = user.following
   
    const posts = await Post.find({postedBy:{$in:following}});

    return res.status(200).json({posts});
  }catch(err){
    return res.status(500).json({message:"something went wrong"});
  }
}



const getPostsForThatUser = async(req,res,next)=>{
  try{
    const posts = await Post.find({postedBy:req.params.id}).sort({createdAt:-1});
    return res.status(200).json({posts});
  } catch(err) {
    return res.status(500).json({message:err});
  }
}

const getOnePost= async(req,res,next)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(400).json({message:'post may have been deleted'});
    }
    return res.status(200).json(post);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'something went wrong!'});
  }
}


const getLikedUsers = async(req,res,next)=>{
  try{
    const post = await Post.findById(req.params.id).populate('likes');
    if(!post) return res.status(400).json({message:"post not found!"});
    return res.status(200).json(post.likes)
  }catch(err){
    return res.status(500).json({message:"something went wrong"})
  }
}


const suggestedPosts = async(req,res,next)=>{
  try{
    const {trendingTopics} = req.params; // twitter:mern:facebook:google
   const regExp = new RegExp(trendingTopics.split(':').join('|'),'i');
    console.log(trendingTopics.split(':'))
    console.log(regExp)
    const posts = await Post.find({postContent:regExp})
    return res.status(200).json(posts)
  }catch(err){
    console.log(err)
    return res.status(500).json({message:" something went wrong!"});
  }
}



const getTrendingTopics = async(req,res,next)=>{
  try{
    const posts = await Post.find({postContent:{$regex:'#'}});   
    const filteredTags=[]
    
    const tags = posts.map(async post=>{
      const toLowerCaseArr=post.postContent.toLowerCase();
      
      const arr = toLowerCaseArr.split(' ').filter(el=>{
        const newEl = el.slice(1,);
        if(el.startsWith('#') && el.length>1 && !newEl.includes('#')){
          filteredTags.push(el)
          return el
        } 
      })

      const setArr = new Set(arr);
      const ArrayTags = [...setArr]
      console.log(ArrayTags)
      await  Post.updateOne({_id:post._id},{hashTags:ArrayTags})
    })

    let trendingHashtags = await Post.aggregate([
      {$unwind:'$hashTags'},
      {$group:{_id:'$hashTags',count:{$sum:1}}},
      {$sort:{count:-1}},
      {$limit:10}
    ])
    return res.status(200).json(trendingHashtags);
  }catch(err){

    return res.status(500).json({message:"something went wrong"});
  }
}

const getThatTrendingTagPosts=async(req,res,next)=>{
  try{
   const {trend} = req.params;
   const caseInsensitiveRegex = new RegExp(trend,'i');
   console.log(caseInsensitiveRegex)
   const posts = await Post.find({hashTags:caseInsensitiveRegex})
   console.log(posts)
   return res.status(200).json(posts)
  }catch(err){
    return res.status(500).json({message:'something went wrong'})
  }
}

module.exports = {createPosts,
  likeUnlikePost,
  getAllPosts,
  CommentOnPost,
  deletePost,
  updatePost,
  getFeedPosts,
  getPostsForThatUser,
  getOnePost,
  suggestedPosts,
  getLikedUsers,
  getTrendingTopics,
  getThatTrendingTagPosts
}