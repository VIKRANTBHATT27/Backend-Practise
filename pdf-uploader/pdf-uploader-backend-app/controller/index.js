import pdfModel from "../model/pdfSchema.js";

export const handleBasicGetReq = async (req, res) => {
     return res.status(200).json({ msg: "a get request" });
}

export const handleUploadFileReq = async (req, res) => {

     const title = req.body?.title;
     const fileName = req.file?.originalname;

     try {
          const response = await pdfModel.insertOne({
               title,
               pdf: fileName
          });

          return res.status(200).json({ msg: "file is submitted!", response });
     } catch (error) {
          return res.status(500).json({ err: "INTERNAL SERVER ERROR", error });
     }
}