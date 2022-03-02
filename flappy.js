const loop = {
  state: {
    lastTick: Date.now(),
    lag: 0,
    /* Assume 60 fps */
    frameDuration: 1000 / 60
  },
  start: (gameNextFrame, gameRenderWithLag) => {
    loop.gameNextFrame = gameNextFrame;
    loop.gameRenderWithLag = gameRenderWithLag;
    loop.state.lastTick = Date.now();
    loop.next();
  },
  next: () => {
    window.requestAnimationFrame(loop.next);

    let state = loop.state;

    let now = Date.now();
    state.lag += now - state.lastTick;
    state.lastTick = now;

    while (state.lag >= state.frameDuration) {
      loop.gameNextFrame();
      state.lag -= state.frameDuration;
    }
    loop.gameRenderWithLag(state.lag / state.frameDuration);
  }
};
const bird = {
  state: {
    radius: 30,
    posX: 30 + 40,
    posY: 30 + 200,
    color: "#f00",
    shouldJump: false
  },
  jump: () => {
    bird.state.shouldJump = true;
  },
  nextFrame: (physics) => {
    let state = bird.state;

    if (state.shouldJump === true) {
      physics.jump();
      state.shouldJump = false;
    } else {
      physics.fall();
    }
    state.posY += physics.fallSpeed;
  },
  draw: (ctx, lagPercent) => {
    ctx.fillStyle = bird.state.color;
    ctx.beginPath();
    ctx.arc(
      bird.state.posX, bird.state.posY,
      bird.state.radius, 0, 2*Math.PI
    );
    ctx.fill();
  },
  init: () => {
    bird.state.posY = 30 + 200;
    return bird;
  }
};
const physics = {
  fallSpeed: -10,
  fallGravity: 0.4,
  fall: () => {
    physics.fallSpeed += physics.fallGravity;
  },
  jump: () => {
    physics.fallSpeed = -10;
  },
  didBirdHitBox: (birdState, box) => {
    // Collision detection between circle/bird and box
    // Adapted from https://stackoverflow.com/a/21096179
    let distX = Math.abs(birdState.posX - box.posX - box.width/2);
    let distY = Math.abs(birdState.posY - box.posY - box.height/2);
    if (
      (distX > (box.width/2 + birdState.radius)) ||
      (distY > (box.height/2 + birdState.radius))
    ) { return false; }
    if (
      (distX <= (box.width/2)) ||
      (distY <= (box.height/2))
    ) { return true; }
    let dx = distX - box.width/2;
    let dy = distY - box.height/2;
    return (dx*dx+dy*dy<=(birdState.radius*birdState.radius));
  },
  init: () => {
    physics.fallSpeed = -10;
    return physics;
  }
};
const game = {
  boxes: [],
  gameNextFrame: () => {
    game.bird.nextFrame(game.physics);
    for (let i=0; i<game.boxes.length; i++) {
      if (game.physics.didBirdHitBox(bird.state, game.boxes[i])) {
        game.end();
      }
    }
  },
  gameRenderWithLag: (lagPercent) => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.bird.draw(game.ctx, lagPercent);
  },
  keyPress: (evt) => {
    if (evt.code === "Space")
      game.bird.jump();
  },
  click: (evt) => {
    game.bird.jump();
  },
  end: () => {
    game.resetElems();
  },
  init: (loop, physics, bird) => {
    game.canvas = document.querySelector("#game");
    game.ctx = game.canvas.getContext("2d");
    window.addEventListener("keypress", game.keyPress);
    game.canvas.addEventListener("click", game.click);
    game.resetElems();
    loop.start(game.gameNextFrame, game.gameRenderWithLag);
  },
  resetElems: () => {
    game.physics = physics.init();
    game.bird = bird.init();
    game.boxes = [];
    game.boxes.push({
      posX: 0,
      posY: game.canvas.height,
      width: game.canvas.width,
      height: game.canvas.height
    });
    game.boxes.push({
      posX: 0,
      posY: -(game.canvas.height),
      width: game.canvas.width,
      height: game.canvas.height
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  game.init(loop, physics, bird);
});
