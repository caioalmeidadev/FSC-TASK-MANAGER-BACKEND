const express = require('express')
const dotenv = require('dotenv')

const connectToDatabase = require('./src/database/magoose.database')

const taskRouter = require('./src/routes/task.routes')

dotenv.config()

const app = express()
app.use(express.json())

connectToDatabase()

app.use('/tasks',taskRouter)


app.listen(3333,() => {
    console.log('Servidor ativo')
})