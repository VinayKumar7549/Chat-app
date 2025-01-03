import jwt from 'jsonwebtoken';
import  User  from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {   //the 'next' will pass the control to 'updateProfile' controller(or)function

    try {
        const token = req.cookies.jwt;  // we used req.cookies.jwt we used jwt here bcz in "utils.js" we used req.cookies.jwt

        if(!token){
            return res.status(401).json({message: "Unauthorized- No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decoding the token using the private key and getting the userId and storing it in 'decoded'

        if(!decoded){
            return res.statu(401).json({message:  "Unauthorized- Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");  

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }

}