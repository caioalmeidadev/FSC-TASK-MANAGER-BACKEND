const mongoose = require('mongoose')

const connectToDatabase = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsc-taks-manager.6di2ckd.mongodb.net/?retryWrites=true&w=majority&appName=fsc-taks-manager`)
}

module.exports = connectToDatabase