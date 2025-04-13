import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js"         // For mongoDB connection
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {app, server} from "./lib/socket.js"

dotenv.config();             // Function used for activating dotenv

const PORT = process.env.PORT;  // To get the port from the .env file

app.use(express.json());   //This is used to extract the json data out of request body and use in different routes like sigup or login etc
app.use(cookieParser());   //This is used to parse the cookies
app.use(cors({              // This is used to enable cors in the application
    origin: "http://localhost:5173",
    credentials: true
}));           

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
    connectDB();
});