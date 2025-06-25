import express from "express";
import { 
    loginUser, 
    registerUser, 
    forgotPasswordUser, 
    resetPasswordUser,
    addToCart,
    removeFromCart,
    getCart,
    updateCartItem
} from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // You'll need this

const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/register', registerUser)
UsersRouter.put('/forgot-password', forgotPasswordUser)
UsersRouter.put('/reset-password', resetPasswordUser)

// Protected routes (require authentication)
UsersRouter.post('/cart', authMiddleware, addToCart)
UsersRouter.delete('/cart', authMiddleware, removeFromCart)
UsersRouter.get('/cart', authMiddleware, getCart)
// Add this with your other cart routes
UsersRouter.put('/cart/update', authMiddleware, updateCartItem);

export default UsersRouter