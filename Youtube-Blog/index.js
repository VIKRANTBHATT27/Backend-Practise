import path from "path";
import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blog.js";
import userRoutes from "./routes/user.js";
import connectMongoDb from "./connection.js";
import { v2 as cloudinary } from 'cloudinary';
import checkForAuthenticationCookie from "./middlewares/authentication.js";


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
app.use(cookieParser());
app.use(express.static("public"));
app.use(checkForAuthenticationCookie("token"));
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/blog', blogRoutes);
app.get("/", (req, res) => {
    // const user = JSON.stringify(req.user);
    return res.render("homepage.ejs", { user: req.user });
});


app.listen(PORT, console.log(`Backend is live on port: ${PORT}`));