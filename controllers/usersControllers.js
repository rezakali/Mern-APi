const User = require('../models/userModel')
const mongoose = require('mongoose')

// login user
const loginUser = async (req, res) => {
    res.json({msg: 'Login Route'})
}

// signUP user
const signupUser = async (req, res) => {
    res.json({msg: 'SIngup Route'})
}

// get all user
const getAllUser = async(req, res) => {
    const user = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(user);
}

module.exports = {loginUser, signupUser, getAllUser}