var express = require('express');
var router = express.Router();
const loginmodel=require('../Models/login_model')

/* POST users login. */
router.post('/', async (req, res) => {
  const UserLoged =  await loginmodel.logueo(req.body);
  res.json({
    dataUser:UserLoged
  });
}
);

module.exports = router;
