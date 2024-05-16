const {Schema,model} = require('mongoose')

const TaskSchema = new Schema({
    descripton: {
        type: String,
        require: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

const TaskModel = model('Task', TaskSchema)

module.exports = TaskModel