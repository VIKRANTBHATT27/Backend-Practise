import express from "express";
import upload from "../middlewares/index.js";
import { handleBasicGetReq, handleUploadFileReq } from "../controller/index.js";

const router = express.Router();

router.get('/', handleBasicGetReq);
router.post('/uploadFiles', upload.single('file'), handleUploadFileReq);

export default router;