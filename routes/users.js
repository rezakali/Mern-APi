const { Router } = require("express")
const  express = require("express")

// import Controllers
const { loginUser, signupUser, getAllUser } = require('../controllers/usersControllers')

const router = express.Router()


//login Routes
router.post('/login', loginUser)

//signup  ROutes
router.post('/signup', signupUser)


// get all users
router.get('/', getAllUser)

module.exports = router