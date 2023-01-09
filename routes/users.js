const { Router } = require("express")
const  express = require("express")

// import Controllers
const { loginUser, signupUser } = require('../controllers/usersControllers')

const router = express.Router()


//login Routes
router.post('/login', loginUser)

//signup  ROutes
router.post('/signup', signupUser)

module.exports = router