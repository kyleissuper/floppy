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
    ctx.fillStyle = state.color;
    ctx.beginPath();
    ctx.arc(
      state.posX, state.posY,
      state.radius, 0, 2*Math.PI
    );
    ctx.fill();
  }

  function reset() {
    state.posY = 30 + 300;
  }

})();

export { bird };
