const mysql= require('mysql');

var connection= mysql.createConnection({
    host: 'localhost',
    database:'nssbd',
    user:'root',
    password:'Hk@2552004'
});

module.exports= connection;