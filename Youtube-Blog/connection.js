import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const mongoUri = process.env.MONGO_URI;

// connection to mongo atlas --------------------------------------------------
const connectMongoDb = async () => {
     try {
          await mongoose.connect(mongoUri, { dbName: "Blogify" })
          console.log("Database connected!!");
     } catch (error) {
          console.log("Database is not connected!", error);
     }
}

export default connectMongoDb;