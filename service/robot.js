
const robotPosition = {};

function setPosition(robotId, position) {
  robotPosition["robot#"+robotId] = position;
  return position;
}

function getPosition(robotId) {
  return robotPosition["robot#"+robotId];
}

module.exports = {
  setPosition,
  getPosition,
}