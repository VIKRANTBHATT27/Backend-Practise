import blogModel from "../models/blog.js";
import commentModel from "../models/comment.js";

export const handleBlogData = async (req, res) => {
     console.log(req.body);
     console.log(req.user);

     // a db query
     const blogResponse = await blogModel.create({
          title: req.body.title,
          content: req.body.contentBody,
          summary: req.body.summary,
          coverImgUrl: req.blogImgUrl,
          imgPublicId: req.blogImg_publicId,
          createdBy: req.user._id
     });

     console.log(blogResponse._id);

     return res.redirect(`/blog/${blogResponse._id}`);
};

export const handleComment = async (req, res) => {
     const comment = await commentModel.create({
          commentContent: req.body.content,
          blogId: req.params.blogId,
          createdBy: req.user._id,
     });

     return res.redirect(`/blog/${req.params.blogId}`)
}