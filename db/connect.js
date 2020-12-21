const mongoose = require('mongoose');
const configs = require('./configs');

mongoose.connect('mongodb://localhost:27017', configs)
    .catch((error) => {
        console.log('you are not connected to db')
    })

const db = mongoose.connection

db.once('open', () => {
    console.log(`Connected to DB (db_name: ${configs.dbName})`)
})
 
db.on('error', () => {
    console.log('you have some problem with current connection')
})


module.exports = mongoose