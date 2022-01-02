const { executeQuery, executeQueryOne } = require('../helpers')

//Metodo para validar tarjeta y clave
const logueo = (UserPin) => {
    return executeQuery('SELECT nro_tarjeta, saldo, nombre, apellido_paterno FROM tarjeta LEFT OUTER JOIN cliente ON tarjeta.id_cliente = cliente.id_cliente WHERE nro_tarjeta=? AND clave= ?',[UserPin.tarjeta, UserPin.clave]);
  }

//?Exportar funcion getAll, getById, getByEdad y demas.
module.exports = {
    logueo  
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