import express from 'express';
import PostController from '../controllers/postController.js';

const postRouter = express.Router();

//lista todos os posts
postRouter.get("/posts", PostController.getPosts);
postRouter.post('/posts', PostController.createPost)



export default postRouter