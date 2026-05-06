import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from '../src/middlewares/auth.middleware.js'
import { arcjetMiddleware } from "../src/middlewares/arcjet.middleware.js"

const router = express.Router();


// Auth routes
// router.get("/test", arcjetMiddleware, (req, res) => {
//     res.status(200).json({ message: "This is a test route" });
// });

router.use(arcjetMiddleware);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/updated-profile", protectRoute, updateProfile);

router.get("/check-user", protectRoute, (req, res) => {
    console.log("User is authenticated", req.user);
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: req.user
    });
})

export default router;
