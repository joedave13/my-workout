const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            error: 'Unauthorized',
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        req.user = await User.findById(_id).select('_id');

        next();
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
        });
    }
};

module.exports = auth;
