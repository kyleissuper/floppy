const obstacleMaker = (() => {
  let obstacles;
  const width = 60;
  const height = 600;
  const xGap = 200;
  const yGap = 230;
  const maxPairs = 5;
  const color = "#f00";

  const publicAPI = {
    reset,
    nextFrame,
    draw,
    getBoxes,
  };

  return publicAPI;

  // ****************************************

  function getBoxes() {
    return obstacles;
  }

  function reset() {
    obstacles = [];
    let lastX;
    addObstaclePair(600);
    while (obstacles.length < maxPairs * 2) {
      lastX = obstacles[obstacles.length - 1].posX;
      addObstaclePair(lastX + width + xGap);
    }
  }

  function nextFrame(physics) {
    for (let i = 0; i < obstacles.length; i += 1) {
      obstacles[i].posX += physics.scrollSpeed;
    }
    while (obstacles[0].posX + width < 0) {
      const lastX = obstacles[obstacles.length - 1].posX;
      addObstaclePair(lastX + width + xGap);
      obstacles.shift();
      obstacles.shift();
    }
  }

  function draw(ctx, lagPercent) {
    for (let i = 0; i < obstacles.length; i += 1) {
      ctx.fillStyle = color;
      ctx.rect(
        obstacles[i].posX,
        obstacles[i].posY,
        width,
        height,
      );
      ctx.fill();
    }
  }

  function addObstaclePair(posX) {
    const posY = -height + Math.random() * (600 - yGap);
    obstacles.push({
      posX,
      posY,
      width,
      height,
    });
    obstacles.push({
      posX,
      posY: posY + height + yGap,
      width,
      height,
    });
  }
})();

export default obstacleMaker;
