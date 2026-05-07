import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../src/middlewares/auth.middleware.js";
import { arcjetMiddleware } from "../src/middlewares/arcjet.middleware.js";

const router = express.Router();

//  REMOVE global middleware
// router.use(arcjetMiddleware);

//  Public routes (NO Arcjet)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//  Protected routes (Arcjet optional + auth required)
router.put("/updated-profile", protectRoute, arcjetMiddleware, updateProfile);

router.get("/check-user", protectRoute, arcjetMiddleware, (req, res) => {
    console.log("User is authenticated", req.user);
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: req.user
    });
});

export default router;