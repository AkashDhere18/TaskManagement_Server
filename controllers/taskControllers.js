const {sequelize} = require('../Config/db')
const Task = require('../Modals/taskModal')
const { Op, fn, col } = require('sequelize');


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
    const ID = req.params.ID
    const status = req.body.status
    try {
        const statusArray = ["Pending", "Inprogress", "Completed"]

        if(!statusArray.includes(status)){
            res.status(400).send({msg:"Data not found",succese:false})
        }

        let taskToUpdateStatus = await Task.findByPk(ID);

        if(!taskToUpdateStatus){
            res.status(400).send({msg:"Task not found",succese:false})
            
        }

        await taskToUpdateStatus.update({status:status})
        res.status(200).send({msg:"Task updated succesfully",succese:true})

        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function updateTask(req,res){
    const ID = req.params.ID

    try {
        const taskForUpdate = await Task.findByPk(ID)

        if(!taskForUpdate){
            res.status(400).send({msg:"Task not found",succese:false})
        }

        await taskForUpdate.update({
            title:req.body.title || taskForUpdate.title,
            description:req.body.description || taskForUpdate.description,
            startDate:req.body.startDate || taskForUpdate.startDate,
            endDate:req.body.endDate || taskForUpdate.endDate
        })

        res.status(200).send({msg:"Task updated succesfully",succese:true})


    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function deleteTask(req,res){

    const ID = req.params.ID

    try {

        const taskForDelete = await Task.findByPk(ID)

        if(!taskForDelete){
            res.status(400).send({msg:"Task not found",succese:false})
        }

        await taskForDelete.destroy()

        res.status(200).send({msg:"Task deleted succesfully",succese:true})


        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function getByStatus(req,res){
    try {
        const status = req.query.status

        const bystatus = await Task.findAll({where:{status:status}})

        if(bystatus.length == 0){
            return res.status(400).send({msg:"Tasks Not found",succese:false})
        }

        res.status(200).send({succese:true,bystatus:bystatus})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

async function getByMonth(req,res){
    try {
        const month = Number(req.query.month)
      
        const byMonth = await Task.findAll({
            where: sequelize.where(
                fn('MONTH' , col('startDate')) , month
            )
    })

    if(byMonth.length == 0){
        return res.status(400).send({msg:"Tasks Not found",succese:false})
    }

    res.status(200).send({succese:true,byMonth:byMonth})

    
        
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
    deleteTask,
    getByStatus,
    getByMonth    
}

