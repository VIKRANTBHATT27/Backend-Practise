import cors from "cors";
import express from "express";
import connectDB from "./connection.js";
import { configDotenv } from "dotenv";
import backendRoutes from "./routes/index.js";

configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Restrict CORS to frontend origin
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


connectDB();

//routes 
app.use("/", backendRoutes);

app.listen(PORT, () => console.log(`backend is live on port ${PORT}`));