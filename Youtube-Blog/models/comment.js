import { Schema, model } from "mongoose";

const commentSchema = new Schema({
     commentContent: {
          type: String,
          required: true
     },
     blogId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "blog"
     },
     createdBy: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "user"
     }
}, { collection: "commentModel", timestamps: true });

const commentModel = model("comment", commentSchema);
export default commentModel;