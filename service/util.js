function distance(p1, p2) {
  return { distance: Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y)) };
}

module.exports = {
  distance,
}