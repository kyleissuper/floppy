const flappy = (function makeFlappy(){

  let hitBoxes, physics, bird, canvas, ctx;

  const publicAPI = {
    setup,
    newGame,
    nextFrame,
    renderWithLag
  };

  return publicAPI;

  // ******************************************

  function setup(physicsEngine, birdObject) {
    physics = physicsEngine;
    bird = birdObject;
    canvas = document.querySelector("#game");
    ctx = canvas.getContext("2d");
    canvas.addEventListener("click", click);
    window.addEventListener("keypress", keyPress);
  }

  function newGame() {
    physics.reset();
    bird.reset();
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
    bird.nextFrame(physics);
    for (let i=0; i<hitBoxes.length; i++) {
      if (physics.didBirdHitBox(bird.state, hitBoxes[i])) {
        newGame();
      }
    }
  }

  function renderWithLag(lagPercent) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.draw(ctx, lagPercent);
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
