import bcrypt from 'bcrypt'
import adminModel from '../models/admin.model.js';
import jwt from 'jsonwebtoken'
import transporter from '../config/nodemailer.js'

export const addAdminService = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const findAdmin = await adminModel.findOne({ email })

        if (findAdmin) {
            return res.status(400).send({ status: false, msg: 'Email already exist!' });
        }
        const hashPass = await bcrypt.hash(password, 11);
        const newAdmin = await adminModel.create({ name, email, password: hashPass });
        if (newAdmin) {
            return res.status(201).send({ status: true, msg: 'Admin added successfully', data: newAdmin._id });
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const getAdminService = async (req, res) => {
    try {
        const adminData = await adminModel.findById(req.params.id);
        if (adminData) {
            return res.status(200).send({
                status: true,
                adminData
            })
        }
        res.status(404).send({ status: false, msg: 'Admin not found!' });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const loginService = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminDetails = await adminModel.findOne({ email });
        if (!adminDetails) {
            return res.status(400).send({ status: false, msg: 'Invalid email or password' });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, adminDetails.password);

        if (!isPasswordValid) {
            return res.status(400).send({ status: false, msg: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: adminDetails._id }, process.env.SECRET_KEY);
        res.status(200).send({
            status: true,
            msg: 'Login successful',
            token
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const forgetPasswordService = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ status: false, msg: 'Please provide email!' });
        }
        const adminDetails = await adminModel.findOne({ email });
        if (!adminDetails) {
            return res.status(404).send({ status: false, msg: 'User not found!' });
        }

        const verifyToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '5m' });

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Password reset request',
            text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${verifyToken}`
        })

        return res.status(200).send({ status: true, msg: 'Password reset link send successfully' });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const resetPasswordService = async (req, res) => {
    try {
        const { email } = req.user;
        const { password } = req.body;
        const adminDetails = await adminModel.findOne({ email });

        if (!adminDetails) {
            return res.status(404).send({ status: false, msg: 'User not found!' });
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: 'Please provide password!' });
        }

        const hashPassword = await bcrypt.hash(password, 11);
        adminDetails.password = hashPassword;
        await adminDetails.save();

        return res.status(200).send({ status: true, msg: 'Password reset successfully' });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}