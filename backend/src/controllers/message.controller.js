import Message from "../models/message.models.js";
import User from "../models/user.model.js";

import cloudinary from "../lib/cloudinary.js";

//Get all the users except you
export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;   //we can acces the user id from the req object bcz in protectedRoute we passed user into the req
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select('-password');  // $ne: loggedInUserId means exclude the user who is logged in, $ne = not eqaulto loggedInUserId

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in getUserForSidebar: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Get all the messages you chat with a specific user
export const getMessages = async (req,res) => {
    try {
        const { id:userToChatId} = req.params; // we are just getting 'id' from the router "/:id" but we are renaming it as 'userToChatId' for better understanding
        const myId = req.user._id;  

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Send messages
export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params; // we are just getting 'id' from the router "/:id" but we are renaming it as 'reciverId' for better understanding
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        //todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}