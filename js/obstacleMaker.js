const obstacleMaker = (() => {
  let obstacles;
  let lampImage;
  let stoolImage;
  const width = 70;
  const height = 600;
  const xGap = 190;
  const yGap = 230;
  const maxPairs = 5;
  const color = "#f00";

  loadImages();

  const publicAPI = {
    reset,
    nextFrame,
    draw,
    getBoxes,
  };

  return publicAPI;

  // ****************************************

  function loadImages() {
    lampImage = new Image();
    lampImage.src = "../img/lamp.svg";
    stoolImage = new Image();
    stoolImage.src = "../img/stool.svg";
  }

  function draw(ctx, lagPercent) {
    for (let i = 0; i < obstacles.length; i += 1) {
      // drawBox(ctx, lagPercent, obstacles[i]);
      if (i % 2 === 0) {
        // Lamp
        ctx.drawImage(
          lampImage,
          obstacles[i].posX,
          obstacles[i].posY + 10,
          width,
          height,
        );
      } else {
        // Stool
        ctx.drawImage(
          stoolImage,
          obstacles[i].posX - 10,
          obstacles[i].posY - 5,
          width * 1.3,
          height * 1.3,
        );
      }
    }
  }

  function getBoxes() {
    return obstacles;
  }

  function reset() {
    obstacles = [];
    addObstaclePair(600);
    while (obstacles.length < maxPairs * 2) {
      const lastX = obstacles[obstacles.length - 1].posX;
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

  function drawBox(ctx, lagPercent, box) {
    /* Primarily for testing purposes */
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(
      box.posX,
      box.posY,
      width,
      height,
    );
    ctx.fill();
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
