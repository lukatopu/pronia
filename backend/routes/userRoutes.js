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
    getWishlist,
    updateUserProfile,
    logoutUser,
    placeOrder,
    getOrders
} from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/logout', logoutUser);
UsersRouter.post('/register', registerUser)
UsersRouter.put('/forgot-password', forgotPasswordUser)
UsersRouter.put('/reset-password', resetPasswordUser)
UsersRouter.put('/update-profile', authMiddleware, updateUserProfile);


UsersRouter.post('/cart/add', authMiddleware, addToCart)
UsersRouter.delete('/cart/remove', authMiddleware, removeFromCart)
UsersRouter.get('/cart', authMiddleware, getCart)
UsersRouter.put('/cart/update', authMiddleware, updateCartItem);
UsersRouter.delete('/cart/clear', authMiddleware, clearCart);



UsersRouter.post('/wishlist/add', authMiddleware, addToWishlist);
UsersRouter.delete('/wishlist/remove', authMiddleware, removeFromWishlist);
UsersRouter.get('/wishlist', authMiddleware, getWishlist);


UsersRouter.post('/orders/place', authMiddleware, placeOrder);
UsersRouter.get('/orders', authMiddleware, getOrders);

export default UsersRouter