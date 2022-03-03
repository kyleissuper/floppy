const flappy = (function makeFlappy(){

  let hitBoxes, physics, bird, canvas, ctx, obstacles, score;

  const publicAPI = {
    setup,
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
    canvas.addEventListener("click", click);
    window.addEventListener("keypress", keyPress);
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
  }

  function nextFrame() {
    score.nextFrame();
    bird.nextFrame(physics);
    obstacles.nextFrame(physics);
    for (let i=0; i<hitBoxes.length; i++) {
      if (physics.didBirdHitBox(bird.state, hitBoxes[i])) {
        newGame();
      }
    }
    let obstacleBoxes = obstacles.getBoxes();
    for (let i=0; i<obstacleBoxes.length; i++) {
      if (physics.didBirdHitBox(bird.state, obstacleBoxes[i])) {
        newGame();
      }
    }
  }

  function renderWithLag(lagPercent) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.draw(ctx, lagPercent);
    obstacles.draw(ctx, lagPercent);
    score.draw(ctx, lagPercent);
  }

  function keyPress(evt) {
    if (evt.code === "Space")
      bird.jump();
  }

  function click(evt) {
    bird.jump();
  }
})();

export { flappy };
