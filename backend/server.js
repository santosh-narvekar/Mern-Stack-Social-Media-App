const mongoose = require('mongoose')
const express = require('express');
const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postsRoutes.js');
const replyRoutes = require('./routes/replyRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const cookieparser=require('cookie-parser')
const {app,server,io}=require('./socket/socket.js')
const {v2:cloudinary} = require('cloudinary')
const cors = require('cors')
const path = require('path');
//const __dirname = path.resolve();

const dotenv = require('dotenv');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
//dotenv.config()
mongoose.connect(process.env.DATABASE_CONNECTION,{
  useNewUrlParser:true}).
  then((conn)=>{
    console.log('connected to db');
  }).catch((err)=>{
    console.log(err);
})

//const app = express();
const port = 3000;

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));


cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET_KEY,
}); 

app.use(express.json({limit:'300mb'}));
app.use(express.urlencoded({limit:'300mb',extended:true}))
app.use(express.text({limit:'300mb'}));
app.use(cookieparser())

app.use('',userRoutes);
app.use('',postRoutes);
app.use('',replyRoutes);
app.use('',messageRoutes);

app.use(express.static(path.join(__dirname,'/frontend/dist'))); // serves html ,css js files
app.get('*',(req,res,)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(port,()=>{
 console.log(`App running on port ${port}...`);
});


