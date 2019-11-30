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
    res.send({ distance: service.util.distance(first_pos, second_pos, metric) })
  } catch (e) {
    res.status(400).send({ error: `Bad Request' ${e}` })
  }
})

router.get('/robot/:robotId/position', function(req, res, next) {
  const robotId = req.params.robotId;
  try {
    const pos = service.robot.getPosition("robot#"+robotId);
    if(pos === undefined) res.status(404).send({ error: `not found`});
    else res.send(pos);
  } catch (e) {
    res.status(400).send({ error: `Bad Request ${e}` })
  }
})

router.put('/robot/:robotId/position', function(req, res, next) {
  const robotId = req.params.robotId
  const position = req.body.position
  service.robot.setPosition(robotId, position)
  res.status(204).end()
})

router.post('/nearest', function(req, res, next) {
  const { ref_position } = req.body
  const robots = service.robot.getAllRobots()
  try {
    const robot_ids = service.util.getNearestRobots(robots, ref_position)
    res.send({ robot_ids })
  } catch (e) {
    res.status(400).send({ error: e })
  }
})

router.get('/closestpair', function(req, res, next) {
  try {
    const robots = service.robot.getAllRobots()
    const robotDistances = robots.map(({ position }) => position)
    if (robotDistances.length <= 1) {
      console.log('fm')
      return res.status(424).end()
    } else {
      const distance = service.closetPairHelper.getNearestDistance(robotDistances)
      res.send({ distance })
    }
  } catch (e) {
    res.status(400).send({ error: e })
  }
})


module.exports = router
