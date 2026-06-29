const User = require('../Modals/userModal')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {auth} = require('../middleware/auth')

const register = async (req,res) => {

    let {name,email,password,contactNo} = req.body

    try {
        if(!req.file){
            return res.status(400).send({success:false, msg:"Please upload image"})
        }

        const existingUser =await User.findOne({where:{email:email}})

        if(existingUser){
           return res.status(401).send({msg:"User already exists" ,succes :false} )
        }

        const salt = await bcryptjs.genSaltSync(8)
        password = await bcryptjs.hashSync(password,salt)

        let imgPath = `/uploads/users/${req.file.filename}`;

        const newUser = await User.create({name,email,password,contactNo,imgPath})
        res.status(201).send({msg:"Registration succesfully" ,succes:true})
    } catch (error) {
        res.status(500).send({msg:"server error", succes: false})
    }
}

const login = async (req,res) => {
    const {email,password} = req.body
    try {
        const existingUser = await User.findOne({where:{email:email}})

        if(!existingUser){
            return res.status(401).send({msg:"User not exist's" ,succes :false} )
        }

        isPassCorrect = await bcryptjs.compare(password,existingUser.password)

        if(!isPassCorrect){
            return res.status(401).send({msg:"Invalid credentials" ,succes :false} )    
        }

        const id = existingUser.id
        const role = existingUser.role

        const token = jwt.sign({id:id,role:role}, process.env.SECRETE_KEY, {expiresIn:"2h"})

        res.status(200).send({msg:"Logged in succesfully" ,succes:true, token:token})

        
    } catch (error) {
        res.status(500).send({msg:"server error", succes: false})
    }
}

const getUserInfo = async (req,res) => {
    try {
        // console.log("******",req.user)

        const loggedUser = await User.findByPk(req.user.id,{
            attributes:{
                exclude:['password','createdAt',"updatedAt"]
            }
        })

        if(loggedUser.imgPath){
            imgPath = 'http://localhost:5003/'+loggedUser.imgPath
        }

        // if(!loggedUser){
        //     return res.status(400).send({msg:"User not found" ,succes :false} )

        // }
        userData = {...loggedUser, imgPath,}

        res.status(200).send({loggedUser:userData,succes:true})
    } catch (error) {
        res.status(500).send({msg:"server error", succes: false})
    }
}

async function getAllUser(req,res){
    try {
        const users =await User.findAll({
            attributes: {
                exclude: ['password']
            }
        })

        res.status(200).send({users:users , succese:true})

    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function TotalUsers(req,res){
    try {
        const usersCount =await User.count()

        res.status(200).send({usersCount:usersCount , succese:true})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

module.exports = {
    register,login,getUserInfo,TotalUsers,getAllUser
}