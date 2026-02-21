import fs from "fs";

export const delete_local_file = async (req, res, next) => {
     await fs.rm(req.file.path, { force: true }, (err) => {
          if (err) console.log(err);
          // else console.log('File Deleted!');
     });

     return next();
}