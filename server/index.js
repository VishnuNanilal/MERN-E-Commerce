const express = require('express')
const app = express()
const PORT = '3001'
require('dotenv').config()
require('./configs/DBconfig')
const userRouter = require('./routers/userRouter')
const sellerRouter = require('./routers/sellerRouter')

app.use(express.json())
app.use('/user', userRouter)
app.use('/seller', sellerRouter)

app.listen(PORT, ()=>console.log(`Connected to port ${PORT}`))