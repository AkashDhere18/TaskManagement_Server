const AssignTask = require('../Modals/asignTaskModal')
const Task = require('../Modals/taskModal')
const User = require('../Modals/userModal')

 const assignTask = async (req,res) =>{
    const {taskID,userID} = req.body
    try{
        const user = await User.findByPk(userID)
        const task = await Task.findByPk(taskID)

        if(!user || !task){
            res.status(400).send({msg:"User and Task not found",success:false})
        }

        const newEntry = await AssignTask.create({userID:userID, taskID:taskID})
        res.status(200).send({ msg: "Task assign successfully", success: true })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", success:false})
    }
}

const getAssignTable = async (req,res)=>{
    try {
        const assignRecords = await AssignTask.findAll()
        res.status(200).send({ assignRecords: assignRecords, success: true })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", success:false})
    }
}

const getTasksByUsers = async (req,res)=>{
    const userID = req.user.id;
    try {
        const getTasks = await AssignTask.findAll({
            where:{
                userID:userID
            },
            include:[
                {
                    model:User
                },

                {
                    model:Task,
                    attributes:["id","title","startDate","endDate","status"]
                }
            ]
        })

        const result = {
            user:{
                id:getTasks[0].User.id,
                name:getTasks[0].User.name,
                email:getTasks[0].User.email,
            },
            tasks:getTasks.map((task)=>({
                id:task.Task.id,
                title:task.Task.title,
                status:task.Task.status,
                startDate:task.Task.startDate,
                endDate:task.Task.endDate

            }))
        }

        res.status(200).send({success:true,getTasks:result})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", success:false})
    }
}

const  getTaskWithUser = async (req,res) =>  {
    const {TASKID} = req.params
    try{
        const assignedTasks =await AssignTask.findAll({
            where:{
                TASKID:TASKID
            },
            include:[
                {
                    model:User,
                    attributes:["id","name","email"],
                },
                {
                    model:Task
                },
            ],
        })

        const result = {
            task:{
                id:assignedTasks[0].Task.id,
                title:assignedTasks[0].Task.title,
                description:assignedTasks[0].Task.description,
                status:assignedTasks[0].Task.status,
                startDate:assignedTasks[0].Task.startDate,
                endDate:assignedTasks[0].Task.endDate
            },
            users:assignedTasks.map((item)=>({
                id:item.User.id,
                name:item.User.name,
                email:item.User.email
            }))
        }

        res.status(200).send({ details: result, success: true })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({msg:"Server error", succese:false})
    }
}

module.exports = {assignTask,getAssignTable,getTasksByUsers,getTaskWithUser}