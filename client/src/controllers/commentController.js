import comment from "../models/Comment.js";

class CommentController {
   static async getCommentsbyPostID(req, res) {
      try {
         const postID = req.params.postID;
         const comments = await comment.find({ postID }).populate("postID userID");
         res.status(200).json(comments);
      } catch (e) {
         res.status(500).json({ message: "getting comments failed", error: e });
      }
   }

   static async createComment(req, res) {
      try {
         //pega parametro postID na rota '/comments/criarcomment/:postID'
         const postID = req.params.postID;
         const userID = req.body.userID;
         
         //cria comentário
         const newComment = await comment.create({
            postID,
            userID,
            comment: req.body.comment
         });

         //popula os dados do usuário antes de retornar
         const populatedComment = await newComment.populate("userID");

         res.status(200).json({
            message: "SUCCESSFUL",
            newComment: populatedComment
         });
      } catch (err) {
         res.status(500).json({ message: "creating comment failed", error: err });
      }
   }

   static async deleteComment(req, res) {
      try {
         const commentID = req.params.id;

         await comment.findByIdAndDelete(commentID);
         res.status(200).json({
            message: "Comment deleted",
         });
      } catch (err) {
        res.status(500).json({
            message: "comment couldn't be deleted",
            error: err
        })
      }
   }
}

export default CommentController;
