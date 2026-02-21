import { Router } from "express";
import upload from "../middlewares/multer.js";
import { delete_local_file } from "../middlewares/deleteLocalFile.js";
import { cloudinary_profileImg_uploader } from "../middlewares/cloudinary.js";
import { handleSignup, handleSignin, handleLogout } from "../controller/user.js";

const router = Router();

router.get('/signup', (req, res) => {
     return res.render("signup.ejs");
});

router.get('/signin', (req, res) => {
     return res.render("signin.ejs");
});

router.post('/signup', 
     upload.single('profilePic'), 
     cloudinary_profileImg_uploader, 
     delete_local_file, 
     handleSignup
);

router.post('/signin', handleSignin);
router.get('/logout', handleLogout);


export default router;