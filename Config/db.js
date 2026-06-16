const { Sequelize } = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:'mysql'
    }
)

async function connectDB(){
    console.log("connectDB called");
    try {
        await sequelize.authenticate()
        console.log("Database connected succesfully")

        await sequelize.sync({alter:true})
        console.log("Database sync succesfully")
    } catch (error) {
       console.log("database connection error" , error) 
    }
}

connectDB()
module.exports = {sequelize}
