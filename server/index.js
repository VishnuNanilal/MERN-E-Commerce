const express = require('express')
const app = express()
const PORT = '3001'
require('dotenv').config()
const mongoose = require('./configs/DBconfig')

const userRouter = require('./routers/users')

app.use('/user', userRouter)

app.listen(PORT, ()=>console.log(`Connected to port ${PORT}`))