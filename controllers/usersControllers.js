const User = require('../models/userModel')

// login user
const loginUser = async (req, res) => {
    res.json({msg: 'Login Route'})
}

// signUP user
const signupUser = async (req, res) => {
    res.json({msg: 'SIngup Route'})
}

module.exports = {loginUser, signupUser}