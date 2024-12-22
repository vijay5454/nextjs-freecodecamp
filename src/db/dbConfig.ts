import mongoose from "mongoose";

export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully!");
    });
    connection.on("error", () => {
      console.log("Failed to connect with DB");
      process.exit();
    });
  } catch (error) {
    console.log(`Something went wrong with error ${error}`);
  }
}
