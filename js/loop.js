const loop = (() => {
  let nextFrame;
  let renderWithLag;
  const state = {
    lastTick: Date.now(),
    lag: 0,
    /* Assume 60 fps */
    frameDuration: 1000 / 60,
  };

  const publicAPI = {
    start,
  };

  return publicAPI;

  // ****************************************

  function start(gameNextFrame, gameRenderWithLag) {
    nextFrame = gameNextFrame;
    renderWithLag = gameRenderWithLag;
    state.lastTick = Date.now();
    next();
  }

  function next() {
    window.requestAnimationFrame(next);

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
