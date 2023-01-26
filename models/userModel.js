const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number, 
        required: true,
    }
})


// Statics mathod
userSchema.statics.signup = async function(email, password, fullname, age) {
    if(!email || !password || !fullname){
        throw Error('All fields required')
    }

    if(!validator.isEmail(email)){
        throw Error('Please provide a valid Email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Please enter a strong password')
    }

    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already Exits..')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, fullname, age})

    return user
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password ){
        throw Error('All fields required')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)