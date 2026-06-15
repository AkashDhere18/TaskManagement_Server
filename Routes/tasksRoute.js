const express = require('express')

const {createTask,
    getAllTask,
    getByID,
    updateStatus,
    updateTask,
    deleteTask} = require('../controllers/taskControllers')

const router = express.Router()

router.post('/create', createTask)
router.get('/getAllTask', getAllTask)
router.get('/getTaskById/:ID', getByID)
router.patch('/updateStatus/:ID', updateStatus)
router.put('/updateTask/:ID', updateTask)
router.delete('/deleteTask/:ID', deleteTask)


module.exports = router