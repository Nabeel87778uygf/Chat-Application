import Message from "../models/Message.js";
import User from "../models/user.js";
import cloudinary from "../src/lib/cloudinary.js"


export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        //get specfic users
        // const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        const filteredUsers = await User.find().select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getAllContacts controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;


        //me and you
        //i send you the message (me -> you)
        //you send me the message (you -> me)
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 })

        return res.status(200).json(messages);
    } catch (error) {
        console.log("error in getMessagesByUserId controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadedResponse.secure_url;
        }

        //creating message in database
        const message = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await message.save();

        //send message in real-time if user is online -socket.io
        return res.status(201).json(message);

    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}