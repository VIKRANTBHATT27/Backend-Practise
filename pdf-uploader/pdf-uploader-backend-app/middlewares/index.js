import multer from "multer";

const customStorageFunc = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, './storageFiles');
     },
     filename: (req, file, cb) => {
          const fileName = Date.now() + '_' + (req.body?.title.replaceAll(" ", "-")) + '_' + (file.originalname.replaceAll(" ", "-"));
          cb(null, fileName);
     }
});

const upload = multer({ storage: customStorageFunc });

export default upload;