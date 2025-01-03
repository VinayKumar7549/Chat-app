import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName) {
            return res
                .status(400)
                .json({ message: "Please enter your full name" });
        }

        if (!email) {
            return res
                .status(400)
                .json({ message: "Email is required" });
        }

        if (!password) {
            return res
                .status(400)
                .json({ message: "Password is required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            //generating jwt token
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            return res.status(400).json({ message: "Failed to create new user" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message); // for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "Email is required" });
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is required" });
    }

    try {
        const user = await User.findOne({ email });

        //Check is the eamil exists
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        //If email exists, now check is the password correct
        const isPasswordCOrrest = await bcrypt.compare(password, user.password);
        if (!isPasswordCOrrest) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //generating jwt token
        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log("Error in login controller", error.message); // for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }

};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }) //delete the cookie

        res.status(200).json({ message: "Logged out successfully" })

    } catch (error) {
        console.log("Error in loggout controller", error.message); // for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;          //we can acces the user id from the req object bcz in protectedRoute we passed user into the req

        if (!profilePic) {
            return res.status(400).json({ message: "Please add a profile picture" })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);   //uploads the image to cloudinary bucket

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },  //This is a field that clodinary gives back
            { new: true })  //By default, findOneAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
    } catch (error) {
        console.log("error in update profile controller", error.message); // for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message); // for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
}