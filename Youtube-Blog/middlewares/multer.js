import multer from "multer";


const customStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploaded-images');
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + (file.originalname.replaceAll(" ", "-"));
    cb(null, file.fieldname + '-' + fileName)
  }
})

const upload = multer({ storage: customStorage });
export default upload;