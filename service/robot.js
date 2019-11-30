
const robotPosition = {};

function setPosition(robotId, position) {
  robotPosition[robotId] = position;
  return position;
}

module.exports = {
  setPosition,
}