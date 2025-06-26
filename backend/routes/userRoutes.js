import express from "express";
import {
    loginUser,
    registerUser,
    forgotPasswordUser,
    resetPasswordUser,
    addToCart,
    removeFromCart,
    getCart,
    updateCartItem,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    getWishlist
} from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/register', registerUser)
UsersRouter.put('/forgot-password', forgotPasswordUser)
UsersRouter.put('/reset-password', resetPasswordUser)


UsersRouter.post('/cart/add', authMiddleware, addToCart)
UsersRouter.delete('/cart/remove', authMiddleware, removeFromCart)
UsersRouter.get('/cart', authMiddleware, getCart)
UsersRouter.put('/cart/update', authMiddleware, updateCartItem);
UsersRouter.delete('/cart/clear', authMiddleware, clearCart);



UsersRouter.post('/wishlist/add', authMiddleware, addToWishlist);
UsersRouter.delete('/wishlist/remove', authMiddleware, removeFromWishlist);
UsersRouter.get('/wishlist', authMiddleware, getWishlist);

export default UsersRouter