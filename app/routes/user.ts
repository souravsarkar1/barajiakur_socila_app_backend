import { loginUser, registerUser } from './../services/authentication/service';
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);


export default userRouter;