const bird = (() => {
  const state = {
    radius: 30,
    posX: 30 + 60,
    posY: 30 + 200,
    rotate: 0,
    spriteNum: 3,
    shouldJump: false,
    jumpState: 60,
  };

  const sprite = loadSprite();
  const scale = window.devicePixelRatio * 4;
  const kittyRadius = state.radius * 1.7;

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

  function loadSprite() {
    const s = new Image();
    s.onload = () => {
      s.frameWidth = s.width;
      s.frameHeight = s.height / 4;
    };
    s.src = "img/kitty.svg";
    return s;
  }

  function jump() {
    state.shouldJump = true;
    state.jumpState = 0;
  }

  function nextFrame(physics) {
    if (state.shouldJump === true) {
      physics.jump();
      state.shouldJump = false;
      state.rotate = 0;
    } else {
      physics.fall();
      state.rotate += 3.5;
      state.rotate = Math.min(150, state.rotate);
    }
    animate();
    state.posY += physics.currentFallSpeed();
  }

  function animate() {
    state.jumpState += 1;
    if (state.jumpState < 5) {
      state.spriteNum = 0;
    } else if (state.jumpState < 13) {
      state.spriteNum = 1;
    } else if (state.jumpState < 17) {
      state.spriteNum = 2;
    } else {
      state.spriteNum = 3;
    }
  }

  function draw(ctx, lagPercent) {
    // drawCircle(ctx, lagPercent);
    ctx.save();
    const x = state.posX - kittyRadius;
    const y = state.posY - kittyRadius;
    const w = kittyRadius * 2;
    const h = kittyRadius * 2;
    const TO_RADIANS = Math.PI / 180;
    ctx.translate(x, y);
    ctx.translate(w / 2, h / 2);
    ctx.rotate((state.rotate + 30) * TO_RADIANS);
    ctx.drawImage(
      sprite,
      0, // clip from x
      state.spriteNum * sprite.frameHeight * scale, // clip from y
      sprite.width * scale, // clip by width
      sprite.frameHeight * scale, // clip by height
      -w / 2, // x
      -h / 2, // y
      w, // width
      h, // height
    );
    ctx.restore();
  }

  function drawCircle(ctx, lagPercent) {
    /* Primarily for testing purposes */
    ctx.fillStyle = "#F00";
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
