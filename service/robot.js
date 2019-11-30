const robotPosition = {}

function setPosition(robotId, position) {
  robotPosition["robot#"+robotId] = position;
  return position;
}

function getPosition(robotId) {
  return robotPosition["robot#"+robotId];
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
