const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    const {email, password } = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.status(200).json({email, fullname, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// signUP user
const signupUser = async (req, res) => {
    const {email, password, fullname, age} = req.body

    try {
        const user = await User.signup(email, password, fullname, age)

        const token = createToken(user._id)

        res.status(200).json({email, fullname, token})
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