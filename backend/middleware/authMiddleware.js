import jwt from 'jsonwebtoken';
import Users from '../models/users.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ err: 'Not authorized, no token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const user = await Users.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ err: 'Not authorized, user not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Authentication error:', err.message);
        return res.status(401).json({ err: 'Not authorized, token failed' });
    }
};

export default authMiddleware;