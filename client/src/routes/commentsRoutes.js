import express from "express";
import CommentController from "../controllers/commentController.js";

const commentRouter = express.Router();

//lista todos os comments de um post específico
commentRouter.get("/comments/:postID", CommentController.getCommentsbyPostID);
commentRouter.post("/comments/criarcomment/:postID", CommentController.createComment);
commentRouter.delete("/comments/:id", CommentController.deleteComment);

export default commentRouter;