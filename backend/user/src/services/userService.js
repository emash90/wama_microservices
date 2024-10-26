const User = require('../models/userModel')
const bcrypt = require('bcrypt'); 
const SALT_ROUNDS = 10;


const getAllUsers = async() => {
    return await User.find()
}

const getUserById = async(_id) => {
    return await User.findById(_id)
}

const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    
    const newUser = new User({
        ...userData,
        password: hashedPassword
    });

    return await newUser.save();
};

const findOne = async (email) => {
    return await User.findOne({ email });
};

// Compare passwords during login
const checkPassword = async (inputPassword, savedPassword) => {
    return await bcrypt.compare(inputPassword, savedPassword);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    findOne,
    checkPassword
}