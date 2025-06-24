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
            return res.status(400).json({ msg: "Email is incorrect!" })
        }

        const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
        const url = `http://localhost:5173/reset-password/${access_token}`
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
        const {password} = req.body;
        const token = req.header('Authorization');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(password + process.env.BCRYPT_PEPPER, 11)

        await Users.findOneAndUpdate({_id: userId}, {
            password: hashedPassword
        })

        console.log(decoded)

        res.status(200).json({msg: "Password successfully changed!"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: err.message})
    }

}