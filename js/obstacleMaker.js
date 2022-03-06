const obstacleMaker = (() => {
  const width = 70;
  const height = 600;
  const xGap = 200;
  const yGap = 240;
  const maxPairs = 3;
  let obstacles;
  let lampImage;
  let stoolImage;

  loadImages();

  const publicAPI = {
    reset,
    nextFrame,
    draw,
    getBoxes,
  };

  return publicAPI;

  // ****************************************

  function draw(ctx, lagPercent) {
    for (let i = 0; i < obstacles.length; i += 1) {
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
    addObstaclePairAtX(600);
    while (obstacles.length < maxPairs * 2) {
      const lastX = obstacles[obstacles.length - 1].posX;
      addObstaclePairAtX(lastX + width + xGap);
    }
  }

  function nextFrame(physics) {
    for (let i = 0; i < obstacles.length; i += 1) {
      obstacles[i].posX += physics.scrollSpeed;
    }
    while (obstacles[0].posX + width < 0) {
      const lastX = obstacles[obstacles.length - 1].posX;
      addObstaclePairAtX(lastX + width + xGap);
      obstacles.splice(0, 2);
    }
  }

  function drawBox(ctx, lagPercent, box) {
    /* Primarily for testing purposes */
    ctx.fillStyle = "#F00";
    ctx.beginPath();
    ctx.rect(
      box.posX,
      box.posY,
      width,
      height,
    );
    ctx.fill();
  }

  function addObstaclePairAtX(posX) {
    const posY = -height + Math.random() * (height - yGap);
    obstacles.push({
      posX,
      posY,
      width,
      height,
    }, {
      posX,
      posY: posY + height + yGap,
      width,
      height,
    });
  }

  function loadImages() {
    lampImage = new Image();
    lampImage.src = "img/lamp.svg";
    stoolImage = new Image();
    stoolImage.src = "img/stool.svg";
  }
})();

export default obstacleMaker;
