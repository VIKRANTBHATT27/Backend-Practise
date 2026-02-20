import path from "path";
import express from "express";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/user.js";
import connectMongoDb from "./connection.js";
import { v2 as cloudinary } from 'cloudinary';

configDotenv();
connectMongoDb();

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
     return res.render("homepage.ejs");
});

app.use('/user', userRoutes);

app.listen(PORT, console.log(`Backend is live on port: ${PORT}`));