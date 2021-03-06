const robot = require('./robot');
const util = require('./util');
const { size, round } = require('lodash');

const alienPositionInfo = {};
// const alienPositionInfo = {
//   "abcdefghijklmnop": [
//     {
//       distance: 1,
//       posRef: { x:0,y:0},
//     },
//     {
//       distance: 2,
//       posRef: { x:3,y:0},
//     },
//     {
//       distance: 2,
//       posRef: { x:3,y:-3},
//     },
//   ],
// };
const alienPosition = {};

function setPosition(alienId, position) {
  alienPosition[alienId] = position;
  return position;
}

function setPositionInfo(alienId, distance, robotPos) {
  console.log('setPositionInfo');
  if(size(alienPositionInfo[alienId]) == 0){
    alienPositionInfo[alienId] = [];
  }
  const isPush = true;
  for(let i = 0 ; i < alienPositionInfo[alienId].length ; i++){
    if(alienPositionInfo[alienId][i].x == robotPos.x && alienPositionInfo[alienId][i].y == robotPos.y) {
      isPush = false;
      break;
    }
  }
  if(isPush) alienPositionInfo[alienId].push({
    posRef: robotPos,
    distance,
  })
}

function setPositionInfoByRobotId(alienId, robotId, distance) {
  console.log('setPositionInfoByRobotId');
  if(size(alienPositionInfo[alienId]) >= 3 || getPosition(alienId)) {
    console.log('short return');
    return;
  }
  const robotPos = robot.getPosition("robot#"+robotId);
  if(distance == 0){
    console.log(distance);
    setPosition(alienId, robotPos);
    return;
  }
  setPositionInfo(alienId, distance, robotPos);
}

function getPosition(alienId) {
  if (alienPosition[alienId] != undefined) return alienPosition[alienId];
  // find distance
  if (size(alienPositionInfo[alienId]) <= 1) return undefined;
  const info1 = alienPositionInfo[alienId][0];
  const info2 = alienPositionInfo[alienId][1];
  const d = util.distance(info1.posRef, info2.posRef);
  const a = (info1.distance*info1.distance - info2.distance*info2.distance + d*d) / (2*d);
  const b = d-a;
  const h = info1.distance*info1.distance - a*a < 0 ? 0 : Math.sqrt(info1.distance*info1.distance - a*a);
  const x2 = info1.posRef.x + a*(info2.posRef.x - info1.posRef.x) / d;
  const y2 = info1.posRef.y + a*(info2.posRef.y - info1.posRef.y) / d;

  const x3 = x2 + h*(info2.posRef.y - info1.posRef.y)/d;
  const x4 = x2 - h*(info2.posRef.y - info1.posRef.y)/d;

  const y3 = y2 - h*(info2.posRef.x - info1.posRef.x)/d;
  const y4 = y2 + h*(info2.posRef.x - info1.posRef.x)/d;
  console.log('a h', a, h,x3,y3,x4,y4,x2,d);
  if(x3==x4 && y3==y4) {
    alienPosition[alienId] = { position: { x: round(x3), y: round(y3) } };
    return alienPosition[alienId];
  }
  if (size(alienPositionInfo[alienId]) <= 2) return undefined;

  const info3 = alienPositionInfo[alienId][2];
  const d2 = util.distance(info3.posRef, { x: x3, y: y3 });
  if (d2 == info3.distance){
    alienPosition[alienId] = { position: { x: round(x4), y: round(y4) } };
    return alienPosition[alienId];
  }
  alienPosition[alienId] = { position: { x: round(x4), y: round(y4) } };
  return alienPosition[alienId];

}

module.exports = {
  setPosition,
  getPosition,
  setPositionInfoByRobotId,
}