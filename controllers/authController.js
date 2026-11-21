const authService = require("../services/authService");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async (req,res,next)=>{
    try{
        const {name,email,password} = req.body??{};5
        const user = await authService.createUser({
            name,
            email,
            password
        });
        return res.status(201).json({
            message: "Account created successfully",
            user
        });

    }
    catch(error){
        next(error);
    }
}
exports.login = async (req,res,next)=>{
    try{
    const {email,password} = req.body ??{};
    if(email===null || password===null){
        return res.status(400).json({message:"details are missing"});
    }
    const user=await authService.findUserByEmail(email);
    if(user===null){
        return res.status(401).json({message:"user not found"});
    }
    const isMAtch=await bcrypt.compare(password,user.password_hash);
    if(!isMAtch){
        return res.status(401).json({message:"pass is wrong"});
    }
    const token=jwt.sign(
        {sub:String(user.id),
         role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h",
            algorithm: "HS256"
        }
    );
    return res.status(200).json({
    message: "Login successful",
    user: {
        id: user.id,
        name: user.name,
        email: user.email
    },
    token
});

    }
    catch(error){
        next(error);
    }
}
exports.me = async (req,res,next)=>{
    try{
    const result= await authService.findUserById(req.userId);
    if(!result){
        return res.status(404).json({message:"user not found"});
    }
    return res.status(200).json({user:result});
}
catch(error){
    next(error);
}
}

