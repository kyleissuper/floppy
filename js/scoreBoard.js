const scoreBoard = (() => {
  const state = {
    font: "Bold 30px 'Averia Serif Libre'",
    color: "#333333",
    counter: 0,
    maxScore: 0,
  };

  const { localStorage } = window;

  const publicAPI = {
    state,
    reset,
    nextFrame,
    draw,
  };

  return publicAPI;

  // ****************************************

  function reset() {
    const maxScore = Math.max(
      localStorage.getItem("maxScore"),
      state.maxScore,
    );
    localStorage.setItem("maxScore", maxScore);
    state.maxScore = maxScore;
    state.counter = 0;
  }

  function nextFrame() {
    state.counter += 0.015;
    state.maxScore = Math.max(state.counter, state.maxScore);
  }

  function draw(ctx, lagPercent) {
    ctx.font = state.font;
    ctx.fillStyle = state.color;
    ctx.textAlign = "center";
    ctx.fillText(Math.floor(state.counter), 200, 50);
    ctx.fillText(Math.floor(state.maxScore), 200, 100);
  }
})();

export default scoreBoard;
