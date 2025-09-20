import { error } from "console";
import userModel from "../models/userModel.js";


const adminAuth = async (req, res, next) =>{
    try{
        const userId = req.body.userId;

        if(!userId) { 
            return res.status(401).json({success: false, message:"not authorized"});
        }

        const user = await userModel.findById(userId);

        if(!user){
            return res.status(403).json({success: false, message:"user not found"});
        }


        if(user.role !== "admin"){
            return res.status(403).json({success: false, message:"access denied --> admin only"});
        }

        next();


    }catch(error){
        console.log("error at --> auth admin middleware function --> ", error );
        res.status(500).json({success: false, message:"error at --> auth admin middleware function --> "})
    }
}

export default adminAuth;