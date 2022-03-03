const bird = (function makeBird() {

  let state = {
    radius: 30,
    posX: 30 + 40,
    posY: 30 + 200,
    color: "#f00",
    shouldJump: false
  };

  const publicAPI = {
    state,
    jump,
    nextFrame,
    draw,
    reset
  };

  return publicAPI;

  // ****************************************

  function jump() {
    state.shouldJump = true;
  }

  function nextFrame(physics) {
    if (state.shouldJump === true) {
      physics.jump();
      state.shouldJump = false;
    } else {
      physics.fall();
    }
    state.posY += physics.currentFallSpeed();
  }

  function draw(ctx, lagPercent) {
    ctx.fillStyle = bird.state.color;
    ctx.beginPath();
    ctx.arc(
      bird.state.posX, bird.state.posY,
      bird.state.radius, 0, 2*Math.PI
    );
    ctx.fill();
  }

  function reset() {
    bird.state.posY = 30 + 200;
  }

})();

export { bird };
