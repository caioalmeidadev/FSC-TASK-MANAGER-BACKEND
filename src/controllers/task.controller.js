const TaskModel = require('../models/task.model')
const {notFoundError} = require('../errors/mongodb.errors')

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
            if(!taskToDelete) return notFoundError(this.res)
            await TaskModel.findByIdAndDelete(req.params.id)
            return res.status(204).send('deleted!')
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    async getById(){
        try{
            const task = await TaskModel.findById(req.params.id)
            if(!task) return notFoundError(this.res)
            return this.res.status(200).send(task)
        }catch(error){
            return this.res.status(500).send(error.message)
        }
    }

    async update(){
        try {
            const taskId = req.params.id
            const taskData = req.body
            
            const taskToUpdate = await TaskModel.findById(taskId)
            if(!taskToUpdate) return notFoundError(this.res)

            const allowedUpdates = ["isCompleted"]
            const requestUpdates = Object.keys(taskData)

            for(const update of requestUpdates){
                if(allowedUpdates.includes(update)){
                    taskToUpdate[update] = taskData[update]
                }else{
                    return this.res.status(500).send('Um ou mais campos inseridos não são editáveis')
                }
            }

            await taskToUpdate.save()
            return this.res.status(200).send(taskToUpdate)
        } catch (error) {
            return this.res.status(500).send(error.message)
        }
    }

}

module.exports = new TaskController