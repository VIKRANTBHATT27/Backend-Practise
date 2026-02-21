import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from "dotenv";

configDotenv();

(async function() {
    
    // Upload an image
     const uploadResult = await cloudinary.uploader.upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();

// const deleteImage = async (publicId) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     console.log("Deletion successful:", result);
//     // Remove the image entry from your database after successful deletion from Cloudinary
//     return result;
//   } catch (error) {
//     console.error("Deletion failed:", error);
//     throw error;
//   }
// };

// Example usage:
// deleteImage('my_app_folder/image_public_id');
// const uploadImage = async (imagePath) => {
//   try {
//     // The 'imagePath' can be a local path, a URL, or a Base64 data URI
//     const result = await cloudinary.uploader.upload(imagePath, {
//       folder: "my_app_folder" // Optional: specify a folder
//     });

//     console.log("Upload successful:", result.secure_url);
//     // Store result.public_id and result.secure_url in your database
//     return result;
//   } catch (error) {
//     console.error("Upload failed:", error);
//     throw error;
//   }
// };

// Example usage:
// uploadImage('./path/to/your/local/image.jpg');
