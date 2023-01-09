const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    }
})


// Statics mathod
userSchema.statics.signup = async function(email, password, fullname, age) {
    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already Exits..')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, fullname, age})

    return user
}

module.exports = mongoose.model('User', userSchema)