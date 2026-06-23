const express = require('express')
const {auth,admin} = require('../middleware/auth')

const {createTask,
    getAllTask,
    getByID,
    updateStatus,
    updateTask,
    deleteTask,
    getByStatus,
    getByMonth,
    getAllTaskCount,
    getTotalCompletedTask,
    getTotalInProgressTask
} = require('../controllers/taskControllers')

const router = express.Router()

router.post('/create',auth,admin, createTask)
router.get('/getAllTask', auth,getAllTask)
router.get('/getTaskById/:ID',auth, getByID)
router.patch('/updateStatus/:ID',auth, updateStatus)
router.put('/updateTask/:ID',auth,admin, updateTask)
router.delete('/deleteTask/:ID', auth, admin, deleteTask)

router.get('/getTaskByStatus/search' , getByStatus)
router.get('/getTaskBySelectedMonth/search', getByMonth)

router.get('/getAllTaskCount', getAllTaskCount)
router.get('/getTotalCompletedTask', getTotalCompletedTask)
router.get('/getTotalInprogressTask', getTotalInProgressTask)


module.exports = router