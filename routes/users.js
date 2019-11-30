var express = require('express')
var router = express.Router()
const service = require('../service')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/distance', function(req, res, next) {
  const { first_pos, second_pos, metric } = req.body
  try {
    res.send(service.util.distance(first_pos, second_pos, metric))
  } catch (e) {
    res.status(400).send({ error: 'Bad Request' })
  }
})

module.exports = router
