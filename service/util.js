function distance(p1, p2, metric = undefined) {
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
