import express from "express";
import { loginUser, registerUser, forgotPasswordUser } from "../controllers/usersController.js";

const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/register', registerUser)
UsersRouter.put('/forgot-password', forgotPasswordUser)


export default UsersRouter