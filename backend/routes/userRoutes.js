import express from "express";
import { loginUser, registerUser, forgotPasswordUser, resetPasswordUser } from "../controllers/usersController.js";

const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/register', registerUser)
UsersRouter.put('/forgot-password', forgotPasswordUser)
UsersRouter.put('/reset-password', resetPasswordUser)


export default UsersRouter