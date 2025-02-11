import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
}, { timestamps: true });

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);