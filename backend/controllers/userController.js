import userModel from "../models/userModel.js";


export const getUserData = async(req, res) => {
    try{
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success: false, message:"user not found"});
        }

        res.json({
            success: true,
            userData:{
                name: user.name,
                isAccountVarified : user.isAccountVarified,
                role: user.role,
                email: user.email
            }
        });
    }catch(error){
        res.json({success: false, message: error.message});
    }
}