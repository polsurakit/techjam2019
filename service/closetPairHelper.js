function genPoints(n) {
  var points = [];
  for (var i = 0; i < n; i = i + 1) {
      var width = n + 1;
      var starting = n / 2;
      var x = Math.floor(Math.random() * (width) - (starting));
      var y = Math.floor(Math.random() * (width) - (starting));
      points.push({x, y});
  }

  return points;
}
function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function merge(p, i, k, j, index) {
  var result = [];
  var length = 0;

  //position counters
  var c1 = i;
  var c2 = k;

  for (var l = 0; l < i; l = l + 1) {
      //result.push(p[l]);
      result[length++] = p[l];
  }

  while (c1 < k || c2 < j) {
      if (c1 < k && c2 < j) {
          if (p[c1][index] < p[c2][index]) {
              //result.push(p[c1]);
              result[length++] = p[c1];
              c1 = c1 + 1;
          } else {
              //result.push(p[c2]);
              result[length++] = p[c2];
              c2 = c2 + 1;
          }
      } else if (c1 < k) {
          //result.push(p[c1]);
          result[length++] = p[c1];
          c1 = c1 + 1;
      } else if (c2 < j) {
          //result.push(p[c2]);
          result[length++] = p[c2];
          c2 = c2 + 1;
      }
  }

  for (l = j; l < p.length; l = l + 1) {
      //result.push(p[l]);
      result[length++] = p[l];
  }

  return result;
}


dac = function(points) {

  function dacHelper(i, j) {

      if (j - i <= 3) {
          if (j - i === 2) {
              //only two points
              var x = points[i];
              var y = points[j - 1];
              //sort them by y-coord
              if (x[1] > y[1]) {
                  var temp = x;
                  points[i] = y;
                  points[j - 1] = temp;
              }

              //return the points
              return distance(x, y);
          } else {
              //we have three points
              var x = points[i];
              var y = points[i + 1];
              var z = points[j - 1];

              //sort them by y-coord
              if (x[1] > y[1]) {
                  var temp = x;
                  if (y[1] > z[1]) {
                      points[i] = z;
                      points[j - 1] = temp;
                  } else {
                      if (temp[1] > z[1]) {
                          points[i] = y;
                          points[i + 1] = z;
                          points[j - 1] = temp
                      } else {
                          points[i] = y;
                          points[i + 1] = temp;
                      }
                  }
              } else {
                  if (y[1] > z[1]) {
                      var temp = z;
                      points[j - 1] = y;
                      if (x[1] > temp[1]) {
                          points[i + 1] = x;
                          points[i] = temp;
                      } else {
                          points[i + 1] = temp;
                      }
                  }
              }


              //find the closest pair
              //first get distances
              var d12 = distance(x, y);
              var d13 = distance(x, z);
              var d23 = distance(y, z);

              var min = Math.min(d12, d13, d23);

              //return the correct pair of points
              if (min === d12) {
                  return d12;
              } else if (min == d13) {
                  return d13;
              } else {
                  return d23;
              }
          }
      } else {
          // let k be the midpoint of the points we're looking at
          var k = parseInt((i + j) / 2);

          // find closest pair left
          var deltaL = dacHelper(i, k);

          //find closest pair right
          var deltaR = dacHelper(k, j);

          // delta = min(deltaL, deltaR)
          if (deltaL < deltaR) {
              var delta = deltaL;
          } else {
              var delta = deltaR;
          }

          //merge left and right points by y-coord
          points = merge(points, i, k, j, 1);

          //create a vertical strip of points in temporary array
          var tempArray = [];
          var x = points[k - 1][0]
          for (var l = 0, len = points.length; l < len; l = l + 1) {
              if (Math.abs(x - points[l][0]) <= delta) {
                  //tempArray.push(points[l]);
                  tempArray[tempArray.length] = points[l];
              }
          }

          //compare each point in vertical strip (temp array) w/ next
          //seven points.  If distance < delta, then delta = distance
          for (l = 0, len = tempArray.length; l < len; l = l + 1) {
              var x = tempArray[l];
              for (var m = l + 1; m <= l + 7 && m < len; m = m + 1) {
                  var y = tempArray[m];
                  var temp = distance(y, x);
                  if (temp < delta) {
                      delta = temp;
                  }
              }
          }

          return delta;
      }

  }

  points.sort(function(a, b) {
      return a[0] - b[0];
  });

  return dacHelper(0, points.length);

}
function getNearestDistance(arr) {
  return dac(arr);
}

module.exports = {getNearestDistance}