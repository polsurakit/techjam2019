const robotPosition = {}

function setPosition(robotId, position) {
  robotPosition[robotId] = position;
  return position;
}

function getPosition(robotId) {
  // console.log(robot
  return robotPosition[robotId];
}

function getAllRobots() {
  const keys = Object.keys(robotPosition)
  return keys.map(key => ({ robotId: key, position: robotPosition[key] }))
}

module.exports = {
  setPosition,
  getPosition,
  getAllRobots
}
