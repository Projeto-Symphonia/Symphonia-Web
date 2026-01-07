import post from "../models/Post.js";
import user from "../models/User.js";
import comment from "../models/Comment.js";

class PostController {
   static async getPosts(req, res) {
      try {
         const posts = await post.find()
            .populate("albumID userID comments")
            .populate({
               path: "musicID",
               populate: { path: "albumID" }
            });
         res.status(200).json(posts);
      } catch (e) {
         res.status(500).json({ message: "getting posts failed", error: e });
      }
   }

   static async createPost(req, res) {
      try {
         //pega parametro userID na rota '/posts/criarpost/:userID'
         const userID = req.params.userID;
         //cria post
         const newPost = await post.create(req.body);

         //pega id do novo post
         const newPostId = newPost._id;

         const especificUser = await user.findByIdAndUpdate(
            userID,
            { $push: { posts: newPostId } },
            { new: true }
         );

         res.status(200).json({
            message: "SUCCESSFUL",
            newPost: newPost,
            user: especificUser,
         });
      } catch (err) {
         res.status(500).json({ message: "creating post failed", error: err });
      }
   }

   static async deletePost(req, res) {
      try {
         const postID = req.params.id;

         await comment.deleteMany({ postID: postID });

         await post.findByIdAndDelete(postID);
         res.status(200).json({
            message: "Post deleted",
         });
      } catch (err) {
        res.status(500).json({
            message: "post couldn't be deleted",
            error: err
        })
      }
   }
}

export default PostController;
