const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.statics.register = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled!');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email must be valid email address!');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough!');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email is already registered!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
        email,
        password: hashPassword,
    });

    return user;
};

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled!');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Email is incorrect!');
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
        throw Error('Password is incorrect!');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);
