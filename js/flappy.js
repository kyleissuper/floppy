const flappy = (() => {
  let boundaries;
  let physics;
  let bird;
  let canvas;
  let ctx;
  let obstacles;
  let score;
  let backDrop;
  let isPlaying = false;

  const publicAPI = {
    setup,
    showSplash,
    newGame,
    nextFrame,
    renderWithLag,
  };

  return publicAPI;

  // ******************************************

  function setup(physicsEngine, birdObject, obstacleMaker, scoreBoard, backDropMaker) {
    physics = physicsEngine;
    bird = birdObject;
    obstacles = obstacleMaker;
    score = scoreBoard;
    backDrop = backDropMaker;
    canvas = document.querySelector("#game");
    ctx = canvas.getContext("2d");
    rescaleCanvas();
    canvas.addEventListener("touchstart", click);
    window.addEventListener("keypress", keyPress);
    newGame();
  }

  function rescaleCanvas() {
    const base = {
      w: 400,
      h: 600,
    };
    const deviceScale = window.devicePixelRatio;
    canvas.style.width = `${base.w}px`;
    canvas.style.height = `${base.h}px`;
    canvas.width = Math.floor(base.w * deviceScale);
    canvas.height = Math.floor(base.h * deviceScale);
    ctx.scale(deviceScale, deviceScale);
  }

  function newGame() {
    isPlaying = false;
    physics.reset();
    bird.reset();
    obstacles.reset();
    score.reset();
    // Two static boxes to detect out of bounds
    boundaries = [];
    boundaries.push({
      posX: 0,
      posY: canvas.height,
      width: canvas.width,
      height: canvas.height,
    });
    boundaries.push({
      posX: 0,
      posY: -(canvas.height),
      width: canvas.width,
      height: canvas.height,
    });
    showSplash();
  }

  function showSplash() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.font = "Bold 25px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Tap Screen or Spacebar", 200, 200);
    ctx.fillText(`Max Score: ${Math.floor(score.state.max)}`, 200, 270);
  }

  function nextFrame() {
    if (isPlaying === false) {
      return;
    }
    score.nextFrame();
    backDrop.nextFrame();
    bird.nextFrame(physics);
    obstacles.nextFrame(physics);
    for (let i = 0; i < boundaries.length; i += 1) {
      if (bird.didHitBox(boundaries[i])) newGame();
    }
    const obstacleBoxes = obstacles.getBoxes();
    for (let i = 0; i < obstacleBoxes.length; i += 1) {
      if (bird.didHitBox(obstacleBoxes[i])) newGame();
    }
  }

  function renderWithLag(lagPercent) {
    if (isPlaying === false) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backDrop.draw(ctx, lagPercent);
    obstacles.draw(ctx, lagPercent);
    bird.draw(ctx, lagPercent);
    score.draw(ctx, lagPercent);
  }

  function keyPress(evt) {
    if (evt.code === "Space") {
      isPlaying = true;
      bird.jump();
    }
  }

  function click() {
    isPlaying = true;
    bird.jump();
  }
})();

export default flappy;
