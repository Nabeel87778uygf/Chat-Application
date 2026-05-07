import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        maxlength: 2000
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
},
    { timestamps: true }
)


const Message = mongoose.model("Message", MessageSchema);
export default Message;