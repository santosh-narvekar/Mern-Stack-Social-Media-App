const jwt = require('jsonwebtoken');

function createJsonWebToken(userid,res){
 const token = jwt.sign({_id:userid},process.env.SECRET_KEY);

 if(token)
 {
  res.cookie('jwt',token,{
    secure:true,
    httpOnly:true,
    sameSite:'strict',
    maxAge:1 * 24 * 60 * 60 * 1000
  })
 }

 return token;
} 

module.exports={createJsonWebToken}