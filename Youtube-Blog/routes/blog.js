import { Router } from "express";
import upload from "../middlewares/multer.js";
import { handleBlogData } from "../controller/blog.js"
import { delete_local_file } from "../middlewares/deleteLocalFile.js";
import { cloudinary_blogImg_uploader } from "../middlewares/cloudinary.js";

const router = Router();

router.get("/create-new", (req, res) => {
     // if (!req.user) return res.redirect("/sign")

     return res.render("blog.ejs", {
          user: req.user
     });
})

router.post('/', 
     upload.single('imageFile'), 
     cloudinary_blogImg_uploader, 
     delete_local_file, 
     handleBlogData
);

export default router;