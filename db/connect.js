const mongoose = require('mongoose');
const configs = require('./configs');

const password = 'O0kCZMRmGWO5srSt'
const clusterName = 'to-do-list-cluster'
const localUri = 'mongodb://localhost:27017'
const atlasUri = `mongodb+srv://vitalii:${password}@to-do-list-cluster.wbz66.mongodb.net/${clusterName}?retryWrites=true&w=majority`
mongoose.connect(atlasUri, configs)
    .catch((error) => {
        console.error(error)
        console.error('you are not connected to db')
    })

const db = mongoose.connection

db.once('open', () => {
    console.log(`Connected to DB (db_name: ${configs.dbName})`)
})
 
db.on('error', () => {
    console.error('you have some problem with current connection')
})


module.exports = mongoose