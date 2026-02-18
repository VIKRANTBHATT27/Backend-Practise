import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
     title: String,
     pdf: String,
}, { collection: "Pdf Model", timestamps: true });

const pdfModel = mongoose.model("pdf", pdfSchema);
export default pdfModel;