import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);   //Get all the users except you
router.get("/:id", protectRoute, getMessages);            //Get all the messages you chat with a specific user

router.post("/send/:id", protectRoute, sendMessage);

export default router;