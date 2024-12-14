import mongoose from "mongoose";

export const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB);
    if (connection) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("failed to connect to mongodb");
  }
};
