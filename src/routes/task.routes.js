const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/task.controller')

router.get('/', async (req,res) => {
    return TaskController(req,res).getAll()
})

router.post('/', async (req,res) => {
    return TaskController(req,res).create()
})

router.delete('/:id', async(req,res) => {
    return TaskController(req,res).delete()
})

router.get('/:id', async(req,res) => {
   return TaskController(req,res).getById()
})

router.patch('/:id',async(req,res) => {
   return TaskController(req,res).update()
})

module.exports = router