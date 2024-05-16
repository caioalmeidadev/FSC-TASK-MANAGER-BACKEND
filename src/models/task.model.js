const {Schema,model} = require('mongoose')

const TaksSchema = Schema({
    descripton: {
        type: String,
        require: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

const TaskModel = model('Taks', TaksSchema)

module.exports = TaskModel