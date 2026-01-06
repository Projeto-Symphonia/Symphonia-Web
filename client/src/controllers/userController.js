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

    //login user '/users/login'
    static async loginUser(req, res) {
        try {
            const { name, password } = req.body;
            const foundUser = await user.findOne({ name });
            
            if (!foundUser) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            
            const passwordMatch = await foundUser.comparePassword(password);
            
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: foundUser._id,
                    name: foundUser.name,
                    photo: foundUser.photo,
                },
            });
        } catch (e) {
            res.status(500).json({
                message: `login failed`,
                error: e.message,
            });
        }
    }

    static async updateUser(req, res) {
        try {
            const userID = req.params.id;
            const { name, photo } = req.body;
            
            // Check if new name already exists
            if (name) {
                const existingUser = await user.findOne({ name, _id: { $ne: userID } });
                if (existingUser) {
                    return res.status(400).json({ message: "Username already taken" });
                }
            }
            
            const updatedUser = await user.findByIdAndUpdate(
                userID,
                { ...(name && { name }), ...(photo && { photo }) },
                { new: true, runValidators: true }
            );
            
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            
            res.status(200).json({
                message: "USER UPDATED",
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    photo: updatedUser.photo,
                },
            });
        } catch (e) {
            res.status(500).json({ message: "UPDATING USER FAILED", error: e.message });
        }
    }
}

export default UserController;

