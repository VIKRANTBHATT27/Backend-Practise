import { verifyToken } from "../services/authentication.js";
import userModel from "../models/user.js";
import path from "path";
import fs from "fs";

export const handleSignup = async (req, res) => {
     const { firstName, lastName, email, salt, password, role } = req.body;

     const profileImgUrl = req.profileImgUrl;
     const imgPublicId = req.profileImg_publicId;

     try {     
          await userModel.create({
               firstName: firstName.toUpperCase(),
               lastName: lastName.toUpperCase(), 
               email, salt, password, profileImgUrl, imgPublicId, role
          });

          return res.redirect('/');
     } catch (error) {
          console.log("error: ", error);
          return res.redirect('/signin');
     }
}

export const handleSignin = async (req, res) => {
     const { email, password } = req.body;

     try {
          const token = await userModel.matchPasswordAndGenerateToken(email, password);

          res.cookie('token', token);

          const user = verifyToken(token);
          
          return res.redirect("/");
     } catch (error) {
          return res.render("signin.ejs", { 
               error: error.message
          });
     }
}

export const handleLogout = (req, res) => {
     return res.clearCookie("token").redirect('/');
}
