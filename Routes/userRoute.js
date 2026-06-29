const express = require('express')
const {auth,admin} = require('../middleware/auth')

const {
    register,
    login,
    getUserInfo,
    getAllUser,
    TotalUsers
} = require('../controllers/userController')

const uploadImage = require('../middleware/multer')
const router = express.Router()

router.post('/register',uploadImage.single('imgPath'), register)
router.post('/login' , login)
router.get('/getUserInfo' ,auth, getUserInfo)
router.get('/getAllUser', getAllUser )
router.get('/totalUser', TotalUsers)



// /register
// /login
// /getUserInfo 


module.exports = router