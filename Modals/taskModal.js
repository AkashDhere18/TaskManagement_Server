const {DataTypes, DATEONLY} = require('sequelize')
const {sequelize} = require('../Config/db')

const Task = sequelize.define("Task", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM("Pending", "Inprogress", "Completed"),
        allowNull:false,
        defaultValue:"Pending"
    },
    startDate:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    endDate:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
},{timestamps:true,tableName:'task'})

module.exports = Task