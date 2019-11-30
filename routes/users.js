var express = require('express');
var router = express.Router();
const service = require('../service');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/distance', function(req, res, next) {
  const p1 = req.body.first_pos;
  const p2 = req.body.second_pos;
  res.send(service.util.distance(p1,p2));
  // res.send(service.util.distance(req))
} )

module.exports = router;
