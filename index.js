const express = require('express')
const dotenv = require('dotenv')

const connectToDatabase = require('./src/database/magoose.database')
const TaskModel = require('./src/models/task.model')

dotenv.config()

const app = express()
app.use(express.json())

connectToDatabase()

app.get('/tasks', async (req,res) => {
    try{
        const tasks = await TaskModel.find()
        return res.status(200).send(tasks)
    }catch(error){
        return res.status(500).send(error.message)
    }

})

app.post('/tasks', async (req,res) => {
    try
    {
        
        const newTask = new TaskModel(req.body)
    
        await newTask.save()
    
        return res.status(201).send(newTask)
    }catch(error){
        return res.status(500).send(error.message)
    }
})

app.delete('/task/:id', async(req,res) => {
    try {
        const taskToDelete = await TaskModel.findById(req.params.id)
        if(!taskToDelete) return res.status(404).send('tarefa não encontrada')
        await TaskModel.findByIdAndDelete(req.params.id)
        return res.status(204).send('deleted!')
    } catch (error) {
        return res.status(500).send(error.message)
    }
})


app.listen(3333,() => {
    console.log('Servidor ativo')
})