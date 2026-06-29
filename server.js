const express = require('express')
const cors = require('cors')
const {connectDB} = require('./Config/db')
require('dotenv').config()
const taskRouter = require('./Routes/tasksRoute')
const userRouter = require('./Routes/userRoute')
const assignTaskRouter = require('./Routes/asisgnTaskRoute')
const path = require('path')

const app =express()
const port = process.env.PORT || 5004

app.use(express.json())
app.use(cors())

app.get('/' , (req,res) => {
    res.send("Task Management API Running")
})

app.use('/task' , taskRouter)
app.use('/user' , userRouter)
app.use('/assign', assignTaskRouter)

app.use('/uploads', express.static(path.join(__dirname,"uploads")))
//http://localhost:5000/uploads/

// connectDB()

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
