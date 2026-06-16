const {sequelize} = require('../Config/db')
const Task = require('../Modals/taskModal')


async function createTask(req,res){
    const {title,description,startDate,endDate} = req.body
    try {
        if(!title || !description || !startDate || !endDate){
            return res.status(400).send({msg:"All feilds are required",succese:false})
        } 
        if(new Date(endDate) < new Date(startDate)){
            return res.status(400).send({msg:"endDate should be greater than startDate", succese:false})
        }
        
        const newTask  = await Task.create({title,description,startDate,endDate})
        console.log(newTask)
        res.status(200).send({msg:"task created succesfully",succese:true})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function getAllTask(req,res){
    try {
        const tasks =await Task.findAll()
        res.status(200).send({tasks:tasks , succese:true})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function getByID(req,res){

    const ID = req.params.ID 

    try {
        const task = await Task.findByPk(ID)
        if(!task){
            res.status(400).send({msg:"Task not found", succese:false})
        }
        res.status(200).send({task:task, succese:true})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function updateStatus(req,res){
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function updateTask(req,res){
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function deleteTask(req,res){
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}





module.exports = {
    createTask,
    getAllTask,
    getByID,
    updateStatus,
    updateTask,
    deleteTask    
}

