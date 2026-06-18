const jwt = require('jsonwebtoken')
require('dotenv').config

function auth(req,res,next){
    // console.log(req.headers.authorization)
    let token = req.headers.authorization

    if(!token.startsWith('Bearer')){
        res.status(400).send({msg:"Not Authorized"})
    }

    token = token.split(' ')[1]
    // console.log(token)

    const decode = jwt.decode(token,process.env.SECRETE_KEY)
    // console.log("Decoded**",decode)

    req.user = {
        id:decode.id,
        role:decode.role
    }

    next()
}


function admin(req,res,next){

    if(req.user.role == 'admin'){
        next()
    }
    else{
        res.status(400).send({msg:"Not Authorized"})
    }
}

module.exports = {auth,admin}