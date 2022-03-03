const scoreBoard = (function scoreMaker() {

  let state = {
    font: "Bold 30px Arial",
    color: "#fff",
    counter: 0,
    max: 0
  };

  const localStorage = window.localStorage;

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
    let max = Math.max(
      localStorage.getItem("maxScore"),
      state.max
    );
    localStorage.setItem("maxScore", max);
    state.max = max;
    state.counter = 0;
  }

})();

export { scoreBoard };
