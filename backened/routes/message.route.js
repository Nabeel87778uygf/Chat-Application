import express from "express";

const router = express.Router();

router.get("/send", (req, res) => {
    res.send("Send message endPoint");
})

router.get("/receive", (req, res) => {
    res.send("Receive message endPoint");
})

export default router;