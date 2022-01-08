//const dayjs = require('dayjs')
//const jwt = require('jsonwebtoken')

//const usuarioModel = require('../models/usuario.model');

//*Creamos carpeta helpers.js
//* Cortamos el codigo que lo teniamos en cliente model.js, este codigo nos ayuda a la refactorizacion
//*exportar modulo
//*luego importarlo en cliente.model.js

//metodo para la mayoria
//values = [] es un parametro opcional, quiere decir que si no le paso ese parametro sera un array vacio []
const executeQuery = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result)
    });
  });

}

// metodo especial para el Id, que devuelve solo Un Elemento
const executeQueryOne = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) return resolve(null);
      resolve(result[0]); //  devuelve el 1er elemento
    });
  });
}


/*
// Creacion de funcion para TOKEN

const createToken = (usuario) => {
  //Codificacion
  const obj = {
    //clave usuario_id: valor: el usuario.id del parametro
    //dayjs devuelve un objeto
    //unix convierte en un numero
    usuario_id: usuario.id,
    fecha_expiracion: dayjs().add(1, 'week').unix() // fecha actual + 5 minutos (5,day)
  }

  //TODO: mover datos al fichero de entorno

  //return jwt.sign(obj, 'en un lugar de la mancha')
  return jwt.sign(obj, process.env.SECRET_KEY)

  //1er param: objeto que vamos a codificar
  //2do: clave secreta que luego sera para decodificar. Ojo cualquiera lo puede descodificar

}
*/
//Este objeto se importara cuando hagamos require
module.exports = {
  executeQuery, executeQueryOne, //createToken
}








//Ayuda para refactorizar

// verificamos lo que se repite para ir reduciendo el codigo
//Los metodos creados antes de refactorizar en cliente.model.js devuelven una promesa, entonces creamos una promesa (Devolvera 3 parametros un db query,  )
//Las tres metrodos creados llaman a db query y todas ejecutan una sentencia sql ( el 1er parametro: string, 2do : array, 3er parametro( funcion anomina con error y resultado))
//El array del db query tb es variable, a veces no hay, entonces lo pasamos tb como parametro ( array de valores : values = [])
//Lo que cambia es el sql, entonce lo pasamos por parametro
//Los valores variables, se pararan como parametro.
// Verificar que se repite el error y el rechazo, entonces esto se mantendra igual.
