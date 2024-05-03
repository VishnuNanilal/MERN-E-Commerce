const mongoose = require('mongoose')

mongoose.connect(process.env.db_key, {})
const connection = mongoose.connection
connection.on('connected', ()=>console.log("Connection to DB established."))
connection.on('error', (err)=>console.log("Connection to DB failed with error: ", err))

module.exports = mongoose