var express = require('express')
var router = express.Router()
const service = require('../service')
const { isString, isNil } = require('lodash');
/* GET users listing. */

const robotRegEx = new RegExp("^robot#([1-9][0-9]*)$");
console.log(1,"robot#5".match(robotRegEx));
console.log(2,"robot5".match(robotRegEx));

router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/distance', function(req, res, next) {
  let { first_pos, second_pos, metric } = req.body;
  if(!first_pos || !second_pos) res.status(400).send({error: "bad request: require first_pos and second_pos"});;
  try {
    first_pos = service.util.formatPositionForLegacy(first_pos)
    second_pos = service.util.formatPositionForLegacy(second_pos)
    let isOk = true;
    let p1 = first_pos;
    let p2 = second_pos;
    if(isString(p1) && !p1.match(robotRegEx)) isOk = false;
    if(isString(p2) && !p2.match(robotRegEx)) isOk = false;

    if(isOk) res.send({ distance: service.util.distance(first_pos, second_pos, metric) });
    else res.status(400).send({error: "bad request: not match regex"});
  } catch (e) {
    res.status(424).send({ error: `Insufficient data to compute the result: ${e}` })
  }
})

router.get('/robot/:robotId/position', function(req, res, next) {
  let robotId = req.params.robotId;
  try {
    robotId = parseInt(robotId)
    console.log(robotId)
    if (!robotId || robotId < 1 || robotId > 999999) {
      res.status(400).send({ error: 'Missing required field'})
    }
    const pos = service.robot.getPosition("robot#"+robotId);
    if(pos === undefined) res.status(404).send({ error: `not found`});
    else res.send(pos);
  } catch (e) {
    res.status(400).send({ error: `Bad Request ${e}` })
  }
})

router.put('/robot/:robotId/position', function(req, res, next) {
  let robotId = req.params.robotId
  let position = req.body.position
  try {
    robotId = parseInt(robotId)
    position = service.util.formatPositionForLegacy(position)
    console.log(position)
    if (!robotId || !position || robotId < 1 || robotId > 999999) {
      res.status(400).send({ error: 'Missing required field'})
    }
    service.robot.setPosition("robot#"+robotId, position)
    res.status(204).end()
  } catch (e) {
    res.status(400).send({ error: 'Missing required field'})
  }
})

router.post('/nearest', function(req, res, next) {
  const { ref_position, k } = req.body
  let newk = k;
  if (!ref_position) {
    res.status(400).send({ error: 'Missing required field'})
  }
  if(k!=undefined){
    try {
      newk = parseInt(k);
      if(k < 1) {
        res.status(400).send({ error: 'Missing required field'})
      }
    } catch (e) {
      res.status(400).send({ error: 'Missing required field'})
    }
  }
  const robots = service.robot.getAllRobots()
  try {
    const robot_ids = service.util.getKNearestRobots(robots, ref_position, newk)
    res.send({ robot_ids })
  } catch (e) {
    res.status(400).send({ error: e })
  }
})
router.post('/alien/:objectDna/report', function(req, res, next) {
  const objectDna = req.params.objectDna;
  const distance = req.body.distance;
  const robotId = req.body['robot_id'];
  console.log(objectDna, robotId, distance);
  try {
    if (!objectDna || !distance || !robotId) {
      res.status(400).send({ error: 'Missing required field'})
    }
    service.alien.setPositionInfoByRobotId(objectDna, robotId, distance);
    res.status(200).end()
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e })
  }

});

router.get('/alien/:objectDna/position', function(req, res, next) {
  const objectDna = req.params.objectDna;
  try {
    if (!objectDna) {
      res.status(400).send({ error: 'Missing required field'})
    }
    const result = service.alien.getPosition(objectDna);
    if(result) res.send(result);
    else res.status(424).end();

  } catch (e) {
    console.log(e);
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
    console.log(e);
    res.status(400).send({ error: e })
  }
})


module.exports = router
