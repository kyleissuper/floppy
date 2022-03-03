const flappy = (function makeFlappy(){

  let hitBoxes, physics, bird, canvas, ctx, obstacles, score;
  let isPlaying = false;

  const publicAPI = {
    setup,
    showSplash,
    newGame,
    nextFrame,
    renderWithLag
  };

  return publicAPI;

  // ******************************************
  
  function setup(physicsEngine, birdObject, obstacleMaker, scoreBoard) {
    physics = physicsEngine;
    bird = birdObject;
    obstacles = obstacleMaker;
    score = scoreBoard;
    canvas = document.querySelector("#game");
    ctx = canvas.getContext("2d");
    canvas.addEventListener("touchstart", click);
    window.addEventListener("keypress", keyPress);
    newGame();
  }

  function newGame() {
    physics.reset();
    bird.reset();
    obstacles.reset();
    score.reset();
    // Two static boxes to detect out of bounds
    hitBoxes = [];
    hitBoxes.push({
      posX: 0,
      posY: canvas.height,
      width: canvas.width,
      height: canvas.height
    });
    hitBoxes.push({
      posX: 0,
      posY: -(canvas.height),
      width: canvas.width,
      height: canvas.height
    });
    showSplash();
  }

  function showSplash() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "Bold 25px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Tap Screen or Spacebar", 200, 200);
    ctx.fillText("Max Score: " + Math.floor(score.state.max), 200, 270);
  }

  function nextFrame() {
    if (isPlaying === false) {
      return;
    }
    score.nextFrame();
    bird.nextFrame(physics);
    obstacles.nextFrame(physics);
    for (let i=0; i<hitBoxes.length; i++) {
      if (physics.didBirdHitBox(bird.state, hitBoxes[i])) {
        end();
      }
    }
    let obstacleBoxes = obstacles.getBoxes();
    for (let i=0; i<obstacleBoxes.length; i++) {
      if (physics.didBirdHitBox(bird.state, obstacleBoxes[i])) {
        end();
      }
    }
  }

  function renderWithLag(lagPercent) {
    if (isPlaying === false) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.draw(ctx, lagPercent);
    obstacles.draw(ctx, lagPercent);
    score.draw(ctx, lagPercent);
  }

  function keyPress(evt) {
    if (evt.code === "Space") {
      isPlaying = true;
      bird.jump();
    }
  }

  function click(evt) {
    isPlaying = true;
    bird.jump();
  }

  function end() {
    isPlaying = false;
    newGame();
  }

})();

export { flappy };
