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

router.get('/getTaskByStatus/search' ,auth, getByStatus)
router.get('/getTaskBySelectedMonth/search',auth, getByMonth)

router.get('/getAllTaskCount',auth, getAllTaskCount)
router.get('/getTotalCompletedTask',auth, getTotalCompletedTask)
router.get('/getTotalInprogressTask',auth, getTotalInProgressTask)


module.exports = router