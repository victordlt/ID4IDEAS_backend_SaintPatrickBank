const mysql = require('mysql2');
//console.log('configuro base de datos');

const pool = mysql.createPool({ 
    host:'127.0.0.1', //process.env.DB_HOST,//,
    user:'root', //process.env.DB_USER,//
    password:'1234', //process.env.DB_PASS, //
    port:3306, //process.env.DB_PORT, //
    database: 'saintpatrickbank'//process.env.DB_NAME, //

});

//Variable global : 
global.db = pool;