const jwt = require('jsonwebtoken');

const protectedRoute = async(req,res,next)=>{
  try{
    // grab cookie
    const token = req.cookies.jwt;

    if(!token){
      return res.status(403).json("You are not logged in");
    }
    
    const user =  jwt.verify(token,process.env.SECRET_KEY);    
    if(!user){
      return res.status(403).json("Unauthorized!");
    }
    req.user = user;
    next();  
  }catch(err){
    return res.status(400).json(err)
  }
}

module.exports={protectedRoute}