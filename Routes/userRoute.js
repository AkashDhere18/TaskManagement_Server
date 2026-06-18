const express = require('express')
const {auth,admin} = require('../middleware/auth')

const {
    register,
    login,
    getUserInfo
} = require('../controllers/userController')

const router = express.Router()

router.post('/register', register)
router.get('/login' , login)
router.get('/getUserInfo' ,auth, getUserInfo)



// /register
// /login
// /getUserInfo 


module.exports = router