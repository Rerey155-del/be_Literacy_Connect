const mysql = require('mysql2');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'literacy_connect'
})

db.connect((err)=> {
    if(err){
        console.log('Error menghubungkan SQL', err)
    } else {
        console.log("Terhubung di MySQL")
    }
})

module.exports = db;