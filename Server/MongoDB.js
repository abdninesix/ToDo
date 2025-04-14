import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err, "Failed to connect to MongoDB. Check internet.");
  }
};

export default connectDB;