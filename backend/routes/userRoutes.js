import express from "express";
import { loginUser, registerUser } from "../controllers/usersController.js";

const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/register', registerUser)


export default UsersRouter