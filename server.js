const express = require('express')
const cors = require('cors')
const {connectDB} = require('./Config/db')
require('dotenv').config()
const taskRouter = require('./Routes/tasksRoute')

const app =express()
const port = process.env.PORT || 5004

app.use(express.json())
app.use(cors())

app.get('/' , (req,res) => {
    res.send("Task Management API Running")
})

app.use('/task' , taskRouter)

// connectDB()

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
