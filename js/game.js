const game = (() => {
  let physics;
  let kitty;
  let obstacles;
  let score;
  let backDrop;
  let canvas;
  let ctx;
  let boundaries;
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

  function setup(loadPhysics, loadKitty, loadObstacles, loadScore, loadBg) {
    physics = loadPhysics;
    kitty = loadKitty;
    obstacles = loadObstacles;
    score = loadScore;
    backDrop = loadBg;

    canvas = document.querySelector("#game");
    ctx = canvas.getContext("2d");
    rescaleCanvas();

    canvas.addEventListener("touchstart", tap);
    window.addEventListener("keypress", keyPress);

    newGame();
  }

  function showSplash() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    ctx.fillStyle = "#5EAAA8";
    ctx.textAlign = "center";
    ctx.font = "Bold 30px 'Averia Serif Libre'";
    ctx.fillText("Tap Screen or Spacebar", 200, 230);
    ctx.fillText(`Max Score: ${Math.floor(score.state.maxScore)}`, 200, 300);
  }

  function newGame() {
    isPlaying = false;
    physics.reset();
    kitty.reset();
    obstacles.reset();
    score.reset();
    boundaries = [{
      posX: 0,
      posY: canvas.height,
      width: canvas.width,
      height: canvas.height,
    }, {
      posX: 0,
      posY: -(canvas.height),
      width: canvas.width,
      height: canvas.height,
    }];
    showSplash();
  }

  function nextFrame() {
    if (isPlaying === false) return;

    score.nextFrame();
    backDrop.nextFrame();
    kitty.nextFrame(physics);
    obstacles.nextFrame(physics);

    for (let i = 0; i < boundaries.length; i += 1) {
      if (kitty.didHitBox(boundaries[i])) newGame();
    }

    const obstacleBoxes = obstacles.getBoxes();
    for (let i = 0; i < obstacleBoxes.length; i += 1) {
      if (kitty.didHitBox(obstacleBoxes[i])) newGame();
    }
  }

  function renderWithLag(lagPercent) {
    if (isPlaying === false) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    backDrop.draw(ctx, lagPercent);
    obstacles.draw(ctx, lagPercent);
    kitty.draw(ctx, lagPercent);
    score.draw(ctx, lagPercent);
  }

  function keyPress(evt) {
    if (evt.code === "Space") {
      isPlaying = true;
      kitty.jump();
    }
  }

  function tap() {
    isPlaying = true;
    kitty.jump();
  }

  function rescaleCanvas() {
    const base = {
      w: 400,
      h: 600,
    };

    canvas.style.width = `${base.w}px`;
    canvas.style.height = `${base.h}px`;

    const deviceScale = window.devicePixelRatio;
    canvas.width = Math.floor(base.w * deviceScale);
    canvas.height = Math.floor(base.h * deviceScale);
    ctx.scale(deviceScale, deviceScale);
  }
})();

export default game;
