import jwt from 'jsonwebtoken';
import Users from '../models/users.js';
import bcrypt from 'bcryptjs';
import mailSender from '../utils/mailSender.js';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ err: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password + process.env.BCRYPT_PEPPER, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ err: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 });

        res.status(200).json({ data: user });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ msg: 'Logged out successfully' });
};


export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const emailExists = await Users.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ err: 'Email is already in use' });
        }


        const hashedPassword = await bcrypt.hash(password + process.env.BCRYPT_PEPPER, 11);

        const newUser = new Users({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 });

        res.status(201).json({ data: newUser });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ err: messages[0] });
        }
        res.status(500).json({ err: err.message });
    }
};

export const forgotPasswordUser = async (req, res) => {
    try {
        const { email } = req.body;


        let user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ msg: 'Email is not signed up' });
        }


        const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
        const url = `/reset-password/${access_token}`
        console.log(process.env.JWT_SECRET_KEY)

        console.log('EMAIL:', process.env.MAIL_SENDER_EMAIL);
        console.log('PASS:', process.env.MAIL_SENDER_PASS);

        await mailSender(process.env.MAIL_SENDER_EMAIL, email, url)

        res.status(200).json({ msg: "Check your email for further instructions" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}


export const resetPasswordUser = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.header('Authorization');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(password + process.env.BCRYPT_PEPPER, 11)

        await Users.findOneAndUpdate({ _id: userId }, {
            password: hashedPassword
        })

        console.log(decoded)

        res.status(200).json({ msg: "Password successfully changed!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message })
    }

}




export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ err: 'User not found' });
        }

        const existingItemIndex = user.cart.findIndex(
            item => item.productId.toString() === productId
        );

        if (existingItemIndex >= 0) {
            user.cart[existingItemIndex].quantity += quantity || 1;
        } else {
            user.cart.push({
                productId,
                quantity: quantity || 1
            });
        }

        await user.save();
        res.status(200).json({ data: user.cart });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ err: 'User not found' });
        }


        user.cart = user.cart.filter(
            item => item.productId.toString() !== productId
        );

        await user.save();
        res.status(200).json({ data: user.cart });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Users.findById(userId).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ err: 'User not found' });
        }

        res.status(200).json({ data: user.cart });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};



export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ err: 'User not found' });
        }

        const itemIndex = user.cart.findIndex(
            item => item.productId.toString() === productId
        );

        if (itemIndex >= 0) {
            user.cart[itemIndex].quantity = quantity;
            await user.save();
            res.status(200).json({ data: user.cart });
        } else {
            res.status(404).json({ err: 'Item not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ err: 'User not found' });

        user.cart = [];
        await user.save();

        res.status(200).json({ msg: 'Cart cleared successfully' });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};




export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ err: 'User not found' });

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        const populatedUser = await Users.findById(userId).populate('wishlist');
        res.status(200).json({ data: populatedUser.wishlist });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ err: 'User not found' });

        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        await user.save();

        const populatedUser = await Users.findById(userId).populate('wishlist');
        res.status(200).json({ data: populatedUser.wishlist });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Users.findById(userId).populate('wishlist');
        if (!user) return res.status(404).json({ err: 'User not found' });

        res.status(200).json({ data: user.wishlist });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};




export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, email, currentPassword, newPassword } = req.body;

        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ err: 'User not found' });

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;

        if (currentPassword && newPassword) {
            const isValid = await bcrypt.compare(currentPassword + process.env.BCRYPT_PEPPER, user.password);
            if (!isValid) {
                return res.status(401).json({ err: 'Current password is incorrect' });
            }
            const hashed = await bcrypt.hash(newPassword + process.env.BCRYPT_PEPPER, 11);
            user.password = hashed;
        }

        await user.save();
        res.status(200).json({ data: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};




export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).populate('cart.productId');

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ err: 'Cart is empty or user not found' });
    }

    const subtotal = user.cart.reduce((total, item) => {
      const price = typeof item.productId.price === 'string'
        ? parseFloat(item.productId.price)
        : item.productId.price;
      return total + price * item.quantity;
    }, 0);
    
    const shipping = user.cart.length === 0 ? 0 : 5.99;
    const totalAmount = subtotal + shipping;
    const totalItems = user.cart.reduce((sum, item) => sum + item.quantity, 0);

    const order = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      status: 'Processing',
      total: `$${totalAmount.toFixed(2)} for ${totalItems} items`
    };

    user.orders = [order, ...user.orders]; // prepend order
    user.cart = []; // clear cart after order

    await user.save();
    res.status(200).json({ msg: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};


export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }

    res.status(200).json({ data: user.orders });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};



export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select('firstName lastName email');
    if (!user) return res.status(404).json({ err: 'User not found' });

    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
