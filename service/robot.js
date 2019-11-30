
const robotPosition = {};

function setPosition(robotId, position) {
  robotPosition[robotId] = position;
  return position;
}

function getPosition(robotId) {
  return robotPosition[robotId];
}

module.exports = {
  setPosition,
}