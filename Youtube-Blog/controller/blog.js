import blogModel from "../models/blog.js";

export const handleBlogData = async (req, res) => {
     console.log(req.body);
     console.log(req.user);

     const doc = {
          title: req.body.title,
          content: req.body.contentBody,
          summary: req.body.summary,
          coverImgUrl: req.blogImgUrl,
          imgPublicId: req.blogImg_publicId,
          createdBy: req.user._id
     };

     // a db query
     await blogModel.create(doc);

     return res.redirect("/");
};