import { Router } from "express";
import blogModel from "../models/blog.js";
import upload from "../middlewares/multer.js";
import commentModel from "../models/comment.js";
import { handleBlogData, handleComment } from "../controller/blog.js"
import { delete_local_file } from "../middlewares/deleteLocalFile.js";
import { cloudinary_blogImg_uploader } from "../middlewares/cloudinary.js";


const router = Router();

router.get("/create-new", (req, res) => {
     // if (!req.user) return res.redirect("/sign")

     return res.render("addBlog.ejs", {
          user: req.user
     });
});

router.post('/', 
     upload.single('imageFile'), 
     cloudinary_blogImg_uploader, 
     delete_local_file, 
     handleBlogData
);

router.post('/comment/:blogId', handleComment);

router.get('/:id', async (req, res) => {
     const blog = await blogModel.findById(req.params.id).populate("createdBy");
     const comments = await commentModel.find({ blogId: req.params.id }).populate("createdBy");
     
     return res.render("blog.ejs", {
          user: req.user,
          blog: blog,
          comments: comments
     });
});

export default router;