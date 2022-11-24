const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign(
        {
            _id,
        },
        process.env.SECRET,
        {
            expiresIn: '1d',
        }
    );
};

const login = async (req, res) => {
    res.status(200).json({
        message: 'User login.',
    });
};

const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.register(email, password);

        const token = createToken(user._id);

        res.status(201).json({
            message: 'User is registered successfully!',
            email,
            token,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

module.exports = {
    login,
    register,
};
