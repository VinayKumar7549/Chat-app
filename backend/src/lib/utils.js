import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    
    //Generating token
    const token = jwt.sign({userId},    //The payload is the data that will be encoded in the token, in this case, the user ID
        process.env.JWT_SECRET,{       //The secret key (or) private key is used to sign the token, it should be kept secret, in this case, it's an environment variable
        expiresIn: '1d'        
    })

    //Sending the token in a httpOnly cookie
    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,  // 1 day in milliseconds
        httpOnly: true,                   // prevents XSS attacks cross-site scripting attacks
        sameSite: "strict",               // prevents CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development" // This is gonna be true if we are in prodution or deployment stage
    })

    return token;
}