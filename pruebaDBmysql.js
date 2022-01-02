//Fichero de prueba para verificar buen funcionamiento de BD.
//Se importa libreria mysql2
const mysql = require('mysql2')

//mysql://USER:PASS@HOST:PORT/DB_NAME
const connection = mysql.createConnection({
  host: process.env.DB_HOST,//'127.0.0.1',
  user: process.env.DB_USER,//'root',
  password: process.env.DB_PASS, //'1234',
  port: process.env.DB_PORT, //3306,
  database: process.env.DB_NAME, //'saintpatrickbank'
});

/* TEST - Base de datos */
connection.connect((err) => {
  //console.log(err); // si da null, quiere decir que nos hemos conectado bien.
  connection.query('SELECT * FROM cliente', (err, result) => {
    // Uno de los dos debe ser null, 
    console.log(err);
    console.log(result);
    connection.destroy(); // destroy para que salga del proceso.
  })
});

