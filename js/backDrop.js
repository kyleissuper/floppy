const backDrop = (() => {
  const width = 2760;
  const canvas = document.querySelector("#game");
  let scroll = 0;

  const publicAPI = {
    nextFrame,
    draw,
  };

  return publicAPI;

  // ****************************************

  function nextFrame() {
    scroll += 2;
    scroll %= width;
  }

  function draw() {
    canvas.style.backgroundPositionX = `${-scroll}px`;
  }
})();

export default backDrop;
