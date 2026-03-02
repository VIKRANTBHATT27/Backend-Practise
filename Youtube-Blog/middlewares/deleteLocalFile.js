import fs from "fs";

export const delete_local_file = async (req, res, next) => {
     if (!req.file) return next();

     await fs.rm(req.file.path, { force: true }, (err) => {      //deleteing image file
          if (err) console.log(err);
     });

     return next();
}