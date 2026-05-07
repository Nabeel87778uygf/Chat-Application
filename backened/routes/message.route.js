import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../src/middlewares/auth.middleware.js";
import { arcjetMiddleware } from "../src/middlewares/arcjet.middleware.js";

const router = express.Router();

//instead of writing to every route to check if user is protected or not
router.use(protectRoute);

router.get("/contacts", getAllContacts);

router.get("/chats", getChatPartners);

router.get("/:id", getMessagesByUserId);

router.post("/send/:id", arcjetMiddleware, sendMessage);

export default router;