const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
  postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  postContent:{
    type:String,
    maxLength:500,
    required:true
  },
  resource:{
    type:String,
  },
  likes:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User'
  },
  replies:[],
  user:{}
},{
  timestamps:true
})

const Post = mongoose.model('Post',postsSchema);
module.exports={ Post }