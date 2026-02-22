import multer from "multer";
import path from "path";

const customStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(`./public/uploaded-images/${req.user._id}`));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + (file.originalname.replaceAll(" ", "-"));
    cb(null, file.fieldname + '-' + fileName)
  }
});

const upload = multer({ storage: customStorage });
export default upload;