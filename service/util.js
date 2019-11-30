const  { isString } =  require('lodash');
const service = require('.');

function distance(var1, var2, metric = undefeined) {
  let p1 = var1;
  if( isString(var1)){
    p1 = service.robot.getPosition(var1);
  }

  let p2 = var2;
  if( isString(var2)){
    p2 = service.robot.getPosition(var2);
  }

  if (metric === 'manhattan') {
    return { distance: Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y) }
  } else {
    return {
      distance: Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
      )
    }
  }
}

module.exports = {
  distance
}
