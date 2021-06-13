const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'pideflugi.info',
    user:'DBFlugiusr',
    password:'Flugi.64-MySQL',
    database: 'DBSyoos_remote'
})

connection.connect(error => {
    if(error) console.log(error)
    console.log('connected db')
})

module.exports = connection