import express from "express";
import userControllers from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", userControllers.signUp);

userRouter.post("/login", userControllers.login);

userRouter.post("/logout", userControllers.logout);

export default userRouter;