const User = require('../models/User');
const mongoose = require('mongoose');

const login = async (req, res) => {
    res.status(200).json({
        message: 'User login.',
    });
};

const register = async (req, res) => {
    res.status(200).json({
        message: 'User register.',
    });
};

module.exports = {
    login,
    register,
};
