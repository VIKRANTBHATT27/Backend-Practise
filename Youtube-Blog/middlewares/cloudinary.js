import { v2 as cloudinary } from "cloudinary";

export const cloudinary_profileImg_uploader = async (req, res, next) => {
     try {
          if (!req.file) return next();      //no file is provided, deafult pfp is used

          console.log(req.file);

          // upload to Cloudinary
          const uploadedImg = await cloudinary.uploader.upload(req.file.path, {
               resource_type: "image",
               folder: "blogify_profile_image_folder"
          });

          req.profileImgUrl = uploadedImg.secure_url;
          req.profileImg_publicId = uploadedImg.public_id;

          return next();
          
     } catch (error) {
          console.log("Cloudinary upload failed: ", error);
          return res.status(500).json({ error: "Image upload failed " })
     }
};

export const cloudinary_blogImg_uploader = async (req, res, next) => {
     try {
          console.log(req.file);
          
          if (!req.file) return next();      //no file is provided, deafult pfp is used


          // upload to Cloudinary
          const uploadedImg = await cloudinary.uploader.upload(req.file.path, {
               resource_type: "image",
               folder: "blogify_blog_image_folder"
          });

          req.blogImgUrl = uploadedImg.secure_url;
          req.blogImg_publicId = uploadedImg.public_id;
          
          return next();

     } catch (error) {
          console.log("Cloudinary upload failed: ", error);
          return res.status(500).json({ error: "Image upload failed " })
     }
};