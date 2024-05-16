const express = require('express')

const app = express()

app.get('/',(req,res) =>{
    return res.status(200).send('hello world')
})


app.listen(3333,() => {
    console.log('Servidor ativo')
})