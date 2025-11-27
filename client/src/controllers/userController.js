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
            const especificUser = await user.findById(id).populate("posts");
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
}

export default UserController