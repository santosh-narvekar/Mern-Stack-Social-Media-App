const Conversation = require("../models/conversation.model");
const Message =require("../models/message.model"); 
const { getReceiverSocketId, io } = require("../socket/socket");
const {v2:cloudinary} = require('cloudinary');
const sendMessage = async(req,res)=>{
  try{
    const {message} = req.body;
    let {messageImg} = req.body; 
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

    if(message=="" && messageImg==""){
      return res.status(400).json({message:"please provide your message"});
    }

    let conversation = await Conversation.findOne({
      participants:{$all:[senderId,receiverId]}
    });

    if(!conversation){
      conversation  = await Conversation.create({
        participants:[senderId,receiverId]
      })
    }
    
    if(messageImg){
      const uploadedMessageImg = await cloudinary.uploader.upload(messageImg);
      messageImg = uploadedMessageImg.secure_url
    }
    
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
        messageImg:messageImg || '' 
      })

    if(newMessage){
      conversation.messages.push(newMessage._id);
     }    
      


     // SOCKET IO FUNCTIONALITY
     //await conversation.save();
     //await newMessage.save()

     // this below code will run in parallel
     await  conversation.save()
     await newMessage.save();

     const receiverSocketId = getReceiverSocketId(receiverId);
     if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
     }
     return res.status(201).json(newMessage);
  }catch(err){
    console.log(err)
    return res.status(500).json({message:"Something went wrong!"});
  }
}

const getMessages = async(req,res)=>{
  try{
   const {id:userToChatId} = req.params;
   const senderId = req.user._id;
   if(!userToChatId){
    return res.status(400).json("no id provided")
   };
   const conversation = await Conversation.findOne({
    participants:{$all:[senderId,userToChatId]}
   }).populate("messages");

   if(!conversation) return res.status(200).json([]);
   const messages = conversation.messages;
  
   // to take all the messages for that message if passed in conversation
   res.status(200).json(messages);
  }catch(err){
    return res.status(500).json({message:"something went wrong!"})
  }
}

module.exports={sendMessage,getMessages}