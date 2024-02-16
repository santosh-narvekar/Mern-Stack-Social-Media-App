const { Post } = require("../models/postsModel");
const { Reply } = require("../models/replyModel");

const getAllRepliesForPost = async(req,res,next)=>{
  try{
    const replies = await Reply.find({postId:req.params.id}).sort({createdAt:-1});
    return res.status(201).json(replies);
  }catch(err){
    return res.status(500).json({message:"something went wrong!"})
  }
}


const deletePostComment = async(req,res,next)=>{
  try{
    const { _id } = req.user;
    const commentUserId = _id;
    const commentId =  req.params.id; 
    
    const reply = await Reply.findOne({userId:commentUserId,_id:commentId});
    const postWhichHasComment = await Post.findOne(reply.postId);
    
    if(_id != reply?.userId){
      return res.status(403).json({message:"Unauthorized to delete this comment!"});
    }

    const getElement = (onereply) => onereply.replyId.equals(reply._id)
    await reply.deleteOne();

    postWhichHasComment?.replies.splice(postWhichHasComment.replies.findIndex(getElement),1);
    
    const replies = await Reply.find({postId:postWhichHasComment._id});
    await postWhichHasComment.save()
    return res.status(200).json({postWhichHasComment,commentId,replies,message:"comment deleted successfully"});
  }catch(err){
    return res.status(500).json({message:'something went wrong'})

  }
}

const likePostComment = async(req,res,next)=>{
  try{
    const {_id}=req.user;
    let curReply = await Reply.findOne({_id:req.params.id});

    console.log(curReply)
    if(curReply.likes.includes(_id)){
      curReply?.likes.splice(curReply?.likes.indexOf(_id),1);
    }else{
      curReply?.likes.push(_id);
    }
    curReply = await curReply.save();
    return res.status(200).json(curReply)

  }catch(err){
    console.log(err)
    return res.status(500).json({message:'something went wrong!'});
  }
}
module.exports={getAllRepliesForPost,deletePostComment,likePostComment}