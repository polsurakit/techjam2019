
const robotPosition = {};

function setPosition(robotId, position) {
  robotPosition["robot#"+robotId] = position;
  return position;
}

function getPosition(robotId) {
  // console.log(robot
  return robotPosition[robotId];
}

module.exports = {
  setPosition,
  getPosition,
}