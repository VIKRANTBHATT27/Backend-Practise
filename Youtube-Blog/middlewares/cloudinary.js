import { v2 as cloudinary } from "cloudinary";

const cloudinaryUpload = async (req, res, next) => {
     try {
          if (!req.file) return next();      //no file is provided, deafult pfp is used

          // upload to Cloudinary
          const uploadImg = await cloudinary.uploader.upload(req.file.path, {
               resource_type: "image",
               folder: "blogify_image_folder"
          });

          req.profileImgUrl = uploadImg.secure_url;
          req.profileImg_publicId = uploadImg.public_id;
          next();

     } catch (error) {
          console.log("Cloudinary upload failed: ", error);
          return res.status(500).json({ error: "Image upload failed " })
     }
}

export default cloudinaryUpload;