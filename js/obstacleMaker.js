const obstacleMaker = (function obstacleMaker() {

  let obstacles;
  const width = 60;
  const height = 600;
  const xGap = 220;
  const yGap = 270;
  const maxPairs = 5;
  const color = "#f00";

  const publicAPI = {
    setup,
    nextFrame,
    draw,
    getBoxes
  };

  return publicAPI;

  // ****************************************

  function getBoxes() {
    return obstacles;
  }

  function setup() {
    // Create N obstacles
    obstacles = [];
    let lastX;
    addObstaclePair(600, yGap);
    while (obstacles.length < 5*2) {
      lastX = obstacles[obstacles.length-1].posX;
      addObstaclePair(lastX + width + xGap, yGap);
    }
  }

  function nextFrame(physics) {
    // Loop through obstacles
    // Move using physics.scrollSpeed
    // Pop if out of bounds, then add new
    for (let i=0; i<obstacles.length; i++) {
      obstacles[i].posX += physics.scrollSpeed;
    }
    while (obstacles[0].posX + width < 0) {
      let lastX = obstacles[obstacles.length-1].posX;
      addObstaclePair(lastX + width + xGap, yGap);
      obstacles.shift();
      obstacles.shift();
    }
  }
  
  function draw(ctx, lagPercent) {
    for (let i=0; i<obstacles.length; i++) {
      ctx.fillStyle = color;
      ctx.rect(
        obstacles[i].posX,
        obstacles[i].posY,
        width,
        height
      );
      ctx.fill();
    }
  }

  function addObstaclePair(posX, yGap) {
    let posY = -height + Math.random() * (600 - yGap);
    obstacles.push({
      posX: posX,
      posY: posY,
      width: width,
      height: height
    });
    obstacles.push({
      posX: posX,
      posY: posY + height + yGap,
      width: width,
      height: height
    });
  }

})();

export { obstacleMaker };
