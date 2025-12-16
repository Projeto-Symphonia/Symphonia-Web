import post from "../models/Post.js";
import user from "../models/User.js";

class UserController {
    //get all users '/users'
    static async getUsers(req, res) {
        try {
            const users = await user.find();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json({ message: "getting users failed", error: e });
        }
    }

    //get user by id '/users/:id'
    static async getUserByID(req, res) {
        try {
            const id = req.params.id;
            const especificUser = await user.findById(id).populate({
                path: "posts",
                populate: [
                    { path: "userID", select: "name photo" },
                    { path: "albumID", select: "title photo" },
                ],
            });
            res.status(200).json(especificUser);
        } catch (e) {
            res.status(500).json({
                message: `finding user failed`,
                error: e.message,
            });
        }
    }

    //create user '/users'
    static async createUser(req, res) {
        try {
            const newUser = req.body;
            await user.create(newUser);
            res.status(201).json({
                message: "user created!",
                album: newUser,
            });
        } catch (e) {
            res.status(500).json({
                message: `user registry failed`,
                eror: e.message,
            });
        }
    }

    static async updateUser(req, res) {
        try {
            const userID = req.params.id;
            const oldUser = await user.findById(userID);
            const newUser = await user.findByIdAndUpdate(userID, req.body);
            res.status(200).json({
                message: "USER UPDATED",
                oldUser: oldUser,
                newUser: newUser,
            });
        } catch (e) {
            res.status(500).json({ message: "UPDATING POST FAILED", error: e });
        }
    }
}

export default UserController;
