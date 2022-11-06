const game = (() => {
  let physics;
  let kitty;
  let obstacles;
  let score;
  let backDrop;
  let sounds;
  let canvas;
  let ctx;
  let boundaries;
  let isPlaying = false;

  const publicAPI = {
    setup,
    showSplash,
    newGame,
    nextFrame,
    render,
  };

  return publicAPI;

  // ******************************************

  function setup(loadPhysics, loadKitty, loadObstacles, loadScore, loadBg, loadSounds) {
    physics = loadPhysics;
    kitty = loadKitty;
    obstacles = loadObstacles;
    score = loadScore;
    backDrop = loadBg;
    sounds = loadSounds;

    canvas = document.querySelector("#game");
    ctx = canvas.getContext("2d");
    rescaleCanvas();

    canvas.addEventListener("touchstart", tap);
    window.addEventListener("keypress", keyPress);

    newGame();
  }

  function showSplash() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    backDrop.draw(ctx, 0);

    const x = -80;
    const y = 280;
    const w = 400;
    const h = 400;
    const toRadians = Math.PI / 180;
    // Translate and rotate ctx around kitty center
    ctx.save();
    ctx.translate(x, y);
    ctx.translate(w / 2, h / 2);
    ctx.rotate(50 * toRadians);
    ctx.drawImage(
      kitty.sprites[3],
      /* Draw kitty at x and y, by width and height */
      -w / 2,
      -h / 2,
      w,
      h,
    );
    ctx.restore();

    ctx.fillStyle = "#333333";
    ctx.textAlign = "center";
    ctx.font = "Bold 30px 'Averia Serif Libre'";
    ctx.fillText("Tap Screen or Spacebar", 200, 250);
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
      if (kitty.didHitBox(boundaries[i])) {
        sounds.end();
        newGame();
        return;
      }
    }

    const obstacleBoxes = obstacles.getBoxes();
    for (let i = 0; i < obstacleBoxes.length; i += 1) {
      if (kitty.didHitBox(obstacleBoxes[i])) {
        sounds.end();
        newGame();
        return;
      }
    }
  }

  function render() {
    if (isPlaying === false) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    backDrop.draw();
    obstacles.draw(ctx);
    kitty.draw(ctx);
    score.draw(ctx);
  }

  function keyPress(evt) {
    if (evt.code === "Space") {
      isPlaying = true;
      sounds.jump();
      kitty.jump();
    }
  }

  function tap() {
    isPlaying = true;
    sounds.jump();
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
