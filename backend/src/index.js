import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js"         // For mongoDB connection
import authRoutes from "./routes/auth.route.js"

dotenv.config();             // Function used for activating dotenv
const app = express();      // Creating an instance of express app

const PORT = process.env.PORT;  // To get the port from the .env file

app.use(express.json());   //This is used to extract the json data out of request body and use in different routes like sigup or login etc

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
    connectDB();
});