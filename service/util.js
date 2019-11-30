const  { isString } =  require('lodash');
const robot = require('./robot');

function distance(var1, var2, metric = undefined) {
  let p1 = var1;
  if( isString(var1)){
    p1 = robot.getPosition(var1);
    if(!p1) throw Error("no data");
  }
  console.log('p1', p1);

  let p2 = var2;
  if( isString(var2)){
    p2 = robot.getPosition(var2);
    if(!p2) throw Error("no data");
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

function getKNearestRobots(robots, ref_position, k = 1) {
  if (k == 1) return getNearestRobots(robots, ref_position)
  const sortedRobots = robots.sort((a, b) => {
    if (distance(a.position, ref_position) === distance(b.position, ref_position)) {
      return formatId(a.robotId) - formatId(b.robotId)
    } else {
      return distance(a.position, ref_position) - distance(b.position, ref_position)
    }
  })
  return sortedRobots.slice(0, k).map(robot=>formatId(robot.robotId))
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
  getKNearestRobots
}
