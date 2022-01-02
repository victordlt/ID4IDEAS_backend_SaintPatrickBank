var express = require('express');
var router = express.Router();
const usersmodel=require('../Models/users_model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('SaintPatrickBank_Users');
});

// router.post('/saldo', function(req, res, next) {
//   res.send('saldeado');
// });

router.post('/transaccion', async (req, res) => {
  const dataUser =  await usersmodel.transaccion(req.body);
  res.json({
     dataUser
  });
});

router.post('/historialtransaccion', async (req, res) => {
  const dataUser =  await usersmodel.historialtransaccion(req.body);
  res.json({
     dataUser
  });
});


// router.post('/confirmaciontransaccion', function(req, res, next) {
//   res.send('transaccion confirmada');
// });

// router.post('/sesioncerrada', function(req, res, next) {
//   res.send('sesion cerrada');
// });

module.exports = router;
