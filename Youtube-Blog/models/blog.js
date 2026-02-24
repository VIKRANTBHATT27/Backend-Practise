import { Schema, model } from "mongoose";

const blogSchema = new Schema({
     title: {
          type: String,
          required: true
     },
     content: {
          type: String,
          required: true
     },
     summary: {
          type: String,
          required: true
     },
     coverImgUrl: {
          type: String,
          required: true
     },
     imgPublicId: {
          type: String,
          required: true
     },
     createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: true
     }
}, { collection: "blogModel", timestamps: true });

const blogModel = new model("blog", blogSchema);
export default blogModel;