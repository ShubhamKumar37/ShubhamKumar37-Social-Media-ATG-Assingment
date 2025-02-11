import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordTokenExpiry: {
        type: Date
    }
}, { timestamps: true });

userSchema.methods.isPasswordCorrect = async function (password) {
    if (!password) return false;

    return await bcrypt.compare(password, this.password);
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
