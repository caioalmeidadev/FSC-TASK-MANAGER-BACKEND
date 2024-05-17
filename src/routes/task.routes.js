const express = require('express')
const router = express.Router()

const taskModel = require('../models/task.model')


router.get('/', async (req,res) => {
    try{
        const tasks = await TaskModel.find()
        return res.status(200).send(tasks)
    }catch(error){
        return res.status(500).send(error.message)
    }

})

router.post('/', async (req,res) => {
    try
    {
        
        const newTask = new TaskModel(req.body)
    
        await newTask.save()
    
        return res.status(201).send(newTask)
    }catch(error){
        return res.status(500).send(error.message)
    }
})

router.delete('/:id', async(req,res) => {
    try {
        const taskToDelete = await TaskModel.findById(req.params.id)
        if(!taskToDelete) return res.status(404).send('tarefa não encontrada')
        await TaskModel.findByIdAndDelete(req.params.id)
        return res.status(204).send('deleted!')
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.get('/:id', async(req,res) => {
    try{
        const task = await TaskModel.findById(req.params.id)
        if(!task) return res.status(404).send('task not found')
        return res.status(200).send(task)
    }catch(error){
        return res.status(500).send(error.message)
    }
})

router.patch('/:id',async(req,res) => {
    try {
        const taskId = req.params.id
        const taskData = req.body
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId,taskData)

        return res.status(200).send(updatedTask)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = router