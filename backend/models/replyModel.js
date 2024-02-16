const mongoose = require('mongoose');

const replySchema =  mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      },
      postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true  
      },
      text:{
        type:String,
        required:true
      },
      userProfile:{
        type:String,
        default:""
      },
      username:{
        type:String,
        required:true
      },
      likes:[]
},{
  timestamps:true
})

const Reply = mongoose.model('Reply',replySchema);
module.exports={Reply}