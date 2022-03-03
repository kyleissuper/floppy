const bird = (() => {
  const state = {
    radius: 30,
    posX: 30 + 40,
    posY: 30 + 200,
    color: "#f00",
    shouldJump: false,
  };

  const publicAPI = {
    state,
    jump,
    nextFrame,
    draw,
    reset,
    didHitBox,
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
      state.posX,
      state.posY,
      state.radius,
      0,
      2 * Math.PI,
    );
    ctx.fill();
  }

  function reset() {
    state.posY = 30 + 300;
  }

  function didHitBox(box) {
    // Collision detection between circle/bird and box
    // Adapted from https://stackoverflow.com/a/21096179
    const distX = Math.abs(state.posX - box.posX - box.width / 2);
    const distY = Math.abs(state.posY - box.posY - box.height / 2);
    if (
      (distX > (box.width / 2 + state.radius))
      || (distY > (box.height / 2 + state.radius))
    ) { return false; }
    if (
      (distX <= (box.width / 2))
      || (distY <= (box.height / 2))
    ) { return true; }
    const dx = distX - box.width / 2;
    const dy = distY - box.height / 2;
    return (dx * dx + dy * dy <= (state.radius * state.radius));
  }
})();

export default bird;
