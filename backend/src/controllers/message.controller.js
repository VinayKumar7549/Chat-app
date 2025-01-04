import Message from "../models/message.models.js";
import User from "../models/user.model.js";

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
        const { id:userToChatId} = req.prams;
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

