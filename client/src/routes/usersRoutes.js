import express from "express";
import UserController from "../controllers/userController.js";

const userRouter = express.Router();

//get users
userRouter.get("/users", UserController.getUsers)

//get user by id
userRouter.get("/users/:id", UserController.getUserByID)

//create user
userRouter.post("/users", UserController.createUser)

//
userRouter.put("/users/:id", UserController.updateUser)


export default userRouter;
