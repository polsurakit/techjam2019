const  { isString } =  require('lodash');
const robot = require('./robot');

function distance(var1, var2, metric = undefined) {
  let p1 = var1;
  if( isString(var1)){
    p1 = robot.getPosition(var1);
  }
  console.log('p1', p1);

  let p2 = var2;
  if( isString(var2)){
    p2 = robot.getPosition(var2);
  }
  console.log('p2', p2);

  if (metric === 'manhattan') {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
  } else {
    return Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
      )
  }
}

function getNearestRobots(robots, ref_position) {
  let nearestRobot = undefined, nearestDis = undefined
  robots.forEach(robot => {
    if (nearestDis === undefined) {
      nearestDis = distance(robot.position, ref_position)
      nearestRobot = formatId(robot.robotId)
    } else if (nearestDis >= distance(robot.position, ref_position)) {
      console.log(nearestRobot, nearestDis, formatId(robot.robotId), distance(robot.position, ref_position))
      if (nearestDis !== distance(robot.position, ref_position) || formatId(robot.robotId) < nearestRobot) {
        nearestDis = distance(robot.position, ref_position)
        nearestRobot = formatId(robot.robotId)
      }
    }
    console.log(distance(robot.position, ref_position))
  })
  return !!nearestRobot ? [nearestRobot] : []
}

function formatId(robotId) {
  console.log(robotId)
  console.log(parseInt(robotId.split("#")[1]))
  return parseInt(robotId.split("#")[1])
}

module.exports = {
  distance,
  getNearestRobots
}
