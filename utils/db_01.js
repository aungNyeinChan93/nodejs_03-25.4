const { MongoClient } = require("mongodb")

let connection;

let uri = "mongodb://localhost:27017/test_03"

const connectDB = (callback) => {
    MongoClient.connect(uri).then(client => {
        connection = client.db();
        console.log('DB connect');

        callback()
    }).catch(err => {
        console.log('Mongodb connection fail');
        callback(err)
    })
}

const getConnection = () => {
    if (connection) {
        return connection
    } else {
        console.error('connection is not success')
    }
}

module.exports = {
    connectDB, getConnection
}