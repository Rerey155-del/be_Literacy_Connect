const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

db.connect((err)=> {
    if(err){
        console.log('Error menghubungkan SQL', err)
    } else {
        console.log("Terhubung di MySQL")
    }
})

module.exports = db;