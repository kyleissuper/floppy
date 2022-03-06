const loop = (() => {
  const state = {
    lastTick: Date.now(),
    lag: 0,
    /* Assume 60 fps */
    frameDuration: 1000 / 60,
  };
  let nextFrame;
  let renderWithLag;

  const publicAPI = {
    start,
  };

  return publicAPI;

  // ****************************************

  function start(gameNextFrame, gameRenderWithLag) {
    nextFrame = gameNextFrame;
    renderWithLag = gameRenderWithLag;
    state.lastTick = Date.now();
    tick();
  }

  function tick() {
    window.requestAnimationFrame(tick);

    const now = Date.now();
    state.lag += now - state.lastTick;
    state.lastTick = now;

    while (state.lag >= state.frameDuration) {
      nextFrame();
      state.lag -= state.frameDuration;
    }
    renderWithLag(state.lag / state.frameDuration);
  }
})();

export default loop;
