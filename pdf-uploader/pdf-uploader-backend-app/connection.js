import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

// mongoose connection --------------------------------------------------------------------
const mongoUri = process.env.mongoUri;

const connectDB = async() => {
     try {
          await mongoose.connect(mongoUri, { dbName: "pdf_upload_yt_tutorial" });
          console.log("DB connected!!");
     } catch (error) {
          console.log("Database not connected!!", error);

     }
}

export default connectDB;