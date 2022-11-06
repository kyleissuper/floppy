const kitty = (() => {
  const state = {
    radius: 30,
    posX: 30 + 60,
    posY: 30 + 200,
    rotation: 0,
    spriteNum: 3,
    animFrame: 60,
    shouldJump: false,
  };

  const sprites = {
    0: loadSprite(0),
    1: loadSprite(1),
    2: loadSprite(2),
    3: loadSprite(3),
  };
  const toRadians = Math.PI / 180;
  const kittyRadius = state.radius * 1.9;

  const publicAPI = {
    state,
    jump,
    nextFrame,
    draw,
    reset,
    didHitBox,
    sprites,
  };

  return publicAPI;

  // ****************************************

  function jump() {
    state.shouldJump = true;
    state.animFrame = 0;
  }

  function nextFrame(physics) {
    if (state.shouldJump === true) {
      physics.jump();
      state.shouldJump = false;
      state.rotation = 0;
    } else {
      physics.fall();
      state.rotation += 3.5;
      state.rotation = Math.min(150, state.rotation);
    }
    setSprite();
    state.posY += physics.getCurrentFallSpeed();
  }

  function setSprite() {
    state.animFrame += 1;
    if (state.animFrame < 5) {
      state.spriteNum = 0;
    } else if (state.animFrame < 13) {
      state.spriteNum = 1;
    } else if (state.animFrame < 17) {
      state.spriteNum = 2;
    } else {
      state.spriteNum = 3;
    }
  }

  function draw(ctx) {
    const x = state.posX - kittyRadius;
    const y = state.posY - kittyRadius;
    const w = kittyRadius * 2;
    const h = kittyRadius * 2;
    // Translate and rotate ctx around kitty center
    ctx.save();
    ctx.translate(x, y);
    ctx.translate(w / 2, h / 2);
    ctx.rotate((state.rotation + 30) * toRadians);
    ctx.drawImage(
      sprites[state.spriteNum],
      /* Draw kitty at x and y, by width and height */
      -w / 2,
      -h / 2,
      w,
      h,
    );
    ctx.restore();
  }

  /*
  function drawCircle(ctx) {
    // Left here for testing purposes
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
  */

  function reset() {
    state.posY = 30 + 200;
  }

  function didHitBox(box) {
    // Collision detection between circle and box
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

  function loadSprite(n) {
    const s = new Image();
    // s.onload = () => {
    //   s.frameWidth = s.width;
    //   s.frameHeight = s.height / 4;
    // };
    s.src = `img/kitty-${n}.svg`;
    return s;
  }
})();

export default kitty;
