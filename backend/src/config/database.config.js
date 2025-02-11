import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("There is issue while connecting to database :: ", error);
        process.exit(1);
    }
}

export { dbConnect };