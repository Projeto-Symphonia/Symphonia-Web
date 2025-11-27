import post from "../models/Post.js";

class PostController {
    static async getPosts(req, res) {
        try {
            const posts = await post.find().populate("albumID");
            res.status(200).json(posts);
        } catch (e) {
            res.status(500).json({ message: "getting posts failed", error: e });
        }
    }

    static async createPost(req, res) {
        try {
            const newPost = await post.create(req.body);
            res.status(200).json(newPost);
        } catch (e) {
            res.status(500).json({ message: "creating post failed", error: e });
        }
    }
}

export default PostController;
