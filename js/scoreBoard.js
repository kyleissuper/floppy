const scoreBoard = (function scoreMaker() {

  let state = {
    font: "Bold 30px Arial",
    color: "#fff",
    counter: 0,
    max: 0
  };

  const publicAPI = {
    nextFrame,
    draw,
    reset
  };

  return publicAPI;

  // ****************************************

  function nextFrame() {
    state.counter += 0.04;
    state.max = Math.max(state.counter, state.max);
  }

  function draw(ctx, lagPercent) {
    ctx.font = state.font;
    ctx.textAlign = "center";
    ctx.fillText(Math.floor(state.counter), 200, 50);
    ctx.fillText(Math.floor(state.max), 200, 100);
  }

  function reset() {
    state.counter = 0;
  }

})();

export { scoreBoard };
