import jwt from "jsonwebtoken";


const userAuth = async(req, res, next) =>{
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message:"not authorized. login again"})
    }
    try{
       const tokenDecode =  jwt.verify(token, process.env.JWT_SECRET);

       if(tokenDecode.id){
        if (!req.body) req.body = {};
        req.body.userId = tokenDecode.id;
        next();

       }else{
        res.json({success: false, message: "middleware error --> "});
       }

    }catch(error){
        res.json({success: false, message: "middleware error --> " + error.message});
    }
}

export default userAuth;