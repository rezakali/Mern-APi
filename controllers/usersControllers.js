const User = require('../models/userModel')
const mongoose = require('mongoose')

// login user
const loginUser = async (req, res) => {
    res.json({msg: 'Login Route'})
}

// signUP user
const signupUser = async (req, res) => {
    const {email, password, fullname, age} = req.body

    try {
        const user = await User.signup(email, password, fullname, age)

        res.status(200).json({email, fullname, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get all user
const getAllUser = async(req, res) => {
    const user = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(user);
}

module.exports = {loginUser, signupUser, getAllUser}