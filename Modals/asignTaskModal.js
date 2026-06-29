const {DataTypes} = require('sequelize')
const {sequelize} = require('../Config/db')

const Task = require('./taskModal')
const User = require('./userModal')

const AssignTask = sequelize.define(
    "AssignTask" ,
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        taskID:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"task",
                key:"id",
            }
        },
        userID:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"user",
                key:"id",
            }
        },
    },
    {
        tableName:"asign_task",
        timestamps:true,
    }
)

// One user can have many assigned tasks
User.hasMany(AssignTask, {foreignKey:"userID"})
AssignTask.belongsTo(User, {foreignKey:"userID"})

// One task can be assigned to many users
Task.hasMany(AssignTask, {foreignKey:"taskID"})
AssignTask.belongsTo(Task, {foreignKey:"taskID"})

module.exports = AssignTask