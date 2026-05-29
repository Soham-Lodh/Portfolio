import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    await mongoose.connect(`${process.env.MONGO_URI}/portfolio`);
  } catch (error) {
    console.error("❌ Could not connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
