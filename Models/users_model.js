const { executeQuery, executeQueryOne } = require('../helpers')

//---------------------------Metodo para transaccion
const transaccion = async (datotransaccion) => {
  //conseguir el id de las tarjetas segun nro de tarjeta
  let idtarjetaorigen = await executeQuery('SELECT id_tarjeta FROM tarjeta WHERE nro_tarjeta=?',[datotransaccion.nro_tarjetaorigen]);
  idtarjetaorigen=idtarjetaorigen[0].id_tarjeta;
  
  let idtarjetadestino = await executeQuery('SELECT id_tarjeta FROM tarjeta WHERE nro_tarjeta=?',[datotransaccion.nro_tarjetadestino]);
  idtarjetadestino=idtarjetadestino[0].id_tarjeta;

  //registramos en la tabla historial de transacciones el retiro de la cuenta propia 
  executeQuery('insert into historial_transaccion(operacion, monto, id_tarjeta_propia, id_tarjeta_ajena) values(?, ?, ?, ?)',['retiro',datotransaccion.monto, idtarjetaorigen, idtarjetadestino]);
  
  //registramos en la tabla historial de transacciones el ingreso a la otra cuenta
  executeQuery('insert into historial_transaccion(operacion, monto, id_tarjeta_propia, id_tarjeta_ajena) values(?, ?, ?, ?)',['ingreso',datotransaccion.monto, idtarjetadestino, idtarjetaorigen]);
  
  //actualizamos el monto de la tarjeta Origen y destino
  await executeQuery(
    'CALL actualizacion_saldo_transaccion (?,?,?)',[idtarjetaorigen, idtarjetadestino, datotransaccion.monto]
  );

  return executeQuery('SELECT nro_tarjeta, saldo FROM tarjeta WHERE id_tarjeta=?',[idtarjetaorigen]);
  }

  //--------------------Metodo para visualizar historial transaccion
  const historialtransaccion = async (datoconsulta) => {
  //conseguir el id de las tarjetas segun nro de tarjeta
  let idtarjeta = await executeQuery('SELECT id_tarjeta FROM tarjeta WHERE nro_tarjeta=?',[datoconsulta.nro_tarjeta]);
  idtarjeta=idtarjeta[0].id_tarjeta;

   return executeQuery('SELECT operacion, monto, fecha, nro_tarjeta FROM historial_transaccion LEFT OUTER JOIN tarjeta ON historial_transaccion.id_tarjeta_ajena=tarjeta.id_tarjeta WHERE id_tarjeta_propia=?',[idtarjeta]);
  }  


//?Exportar metodos.
module.exports = {
    transaccion , historialtransaccion 
  }
/*------------------------------------------

function(req, res, next) {
    res.send('SaintPatrickBank_Login');
  }

///-------------------------------------------------
let db = require('../db');

MovieModel = {}



MovieModel.findAll = () => db;
MovieModel.findBY = (id) =>db.find(movie=>movie.id==id);
MovieModel.update = (newMovie) => {
    let movies = db.filter(movie=>movie.id != newMovie.id);
    movies.push(newMovie);
    db = movies;
    return newMovie;
};

MovieModel.delete = (id) =>{
    let movies = db.filter(movie=>movie.id != id);
    db = movies;
    return 'Ok';
}

//module.exports = MovieModel;

*/