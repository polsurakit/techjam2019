const robot = require('./robot');
const { size } = require('lodash');

const alienPositionInfo = {};
const alienPosition = {};

function setPosition(alienId, position) {
  alienPosition[alienId] = position;
  return position;
}

function setPositionInfoByRobotId(alienId, robotId, distance) {
  const robotPos = robot.getPosition("robot#"+robotId);

  if (size(alienPositionInfo[alienId]) > 0 ) {
    alienPositionInfo[alienId].push({
      posRef: robotPos,
      distance,
    });
  } else {
    alienPositionInfo[alienId] = [];
    alienPositionInfo[alienId].push({
      posRef: robotPos,
      distance,
    });
  }
}

function getPosition(alientId) {
  if (alienPosition[alienId]) return alienPosition[alienId];
  // find distance
  return { position: {
    x: 1,
    y: 2,
  }}
}

module.exports = {
  setPosition,
  getPosition,
  setPositionByRobotId,
}