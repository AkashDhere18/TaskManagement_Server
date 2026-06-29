const express = require("express")
const {auth,admin} = require('../middleware/auth')

const router = express.Router()

const {assignTask,getAssignTable,getTasksByUsers,getTaskWithUser} = require('../controllers/assignTaskController')

router.post('/assign-task', auth, admin, assignTask)
router.get('/getassignTable', auth, admin, getAssignTable)
router.get('/get-Tasks-By-Users', auth, getTasksByUsers)
router.get('/get-Task-With-User/:TASKID', auth, getTaskWithUser)

module.exports = router