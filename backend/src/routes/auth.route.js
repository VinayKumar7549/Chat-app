import express from 'express';
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js"
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth); // we are gonna be calling this function when we refresh the page,then we will check is the user is authenticated or not, depending on this will render the dashboard or the login page

export default router;