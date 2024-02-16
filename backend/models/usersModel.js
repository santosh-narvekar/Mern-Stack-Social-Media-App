const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true

  },
  photo:{
    type:String,
    default:"",
  },
  posts:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'Post',
    default:[]
  },
  followers:{
     type:[mongoose.Schema.Types.ObjectId],
     ref:'User',
     default:[],
  },
  following:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User',
    default:[]
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    validate:[validator.isEmail,'Please provide a valid email']
  },
  password:{
    type:String,
    required:true,
    minlength:8
  },
  confirmPassword:{
    type:String,
    //required:true,
    //validate:
  },
  bio:{
    type:String
  },
  
  status:{
    type:String,
    enum:["Pending","Active"],
    default:"Pending"
  },
  confirmationCode:{
    type:String,
    unique:true
  },
  passwordChangedAt:{
    type:Date
  }
},{
  timestamps:true
})


const User =  mongoose.model('User',userSchema);
module.exports = User