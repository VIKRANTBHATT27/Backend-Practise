import { Router } from "express";
import upload from "../middlewares/multer.js";
import cloudinaryUpload from "../middlewares/cloudinary.js";
import { handleSignup, handleSignin } from "../controller/index.js";

const router = Router();

router.get('/signup', (req, res) => {
     return res.render("signup.ejs");
});

router.get('/signin', (req, res) => {
     return res.render("signin.ejs");
});

router.post('/signup', upload.single('profilePic'), cloudinaryUpload, handleSignup);
router.post('/signin', handleSignin);

export default router;