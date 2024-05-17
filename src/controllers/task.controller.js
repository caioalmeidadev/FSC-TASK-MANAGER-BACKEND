const TaskModel = require('../models/task.model')

class TaskController{
    constructor(req,res){
        this.req
        this.res
    }

    async getAll() {
        try{
            const tasks = await TaskModel.find()
            return this.res.status(200).send(tasks)
        }catch(error){
            return this.res.status(500).send(error.message)
        }
    }

    async create(){
        try
        {
            
            const newTask = new TaskModel(req.body)
        
            await newTask.save()
        
            return this.res.status(201).send(newTask)
        }catch(error){
            return this.res.status(500).send(error.message)
        }
    }


    async delete(){
        try {
            const taskToDelete = await TaskModel.findById(req.params.id)
            if(!taskToDelete) return res.status(404).send('tarefa não encontrada')
            await TaskModel.findByIdAndDelete(req.params.id)
            return res.status(204).send('deleted!')
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    async getById(){
        try{
            const task = await TaskModel.findById(req.params.id)
            if(!task) return this.res.status(404).send('task not found')
            return this.res.status(200).send(task)
        }catch(error){
            return this.res.status(500).send(error.message)
        }
    }

    async update(){
        try {
            const taskId = req.params.id
            const taskData = req.body
            const updatedTask = await TaskModel.findByIdAndUpdate(taskId,taskData)
    
            return this.res.status(200).send(updatedTask)
        } catch (error) {
            return this.res.status(500).send(error.message)
        }
    }

}

module.exports = new TaskController