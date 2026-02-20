import userModel from "../models/user.js";

export const handleSignup = async (req, res) => {
     console.log(req.body);
     console.log(req.file);
     const { fullName, email, salt, password, role } = req.body;

     const profileImgUrl = req.profileImgUrl;
     const public_id = req.profileImg_publicId;

     const response = await userModel.create({
          fullName, email, salt, password, profileImgUrl, public_id, role
     });

     return res.redirect('/');
}

export const handleSignin = async (req, res) => {
     const { email, password } = req.body;
     
     const user = await userModel.matchPassword(email, password);

     console.log("User: ", user);

     return res.redirect('/');
}