const backDrop = (() => {
  const width = 2760;
  const height = 600;
  const image = new Image();
  image.src = "../img/background.svg";
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

  function draw(ctx, lagPercent) {
    ctx.drawImage(
      image,
      -scroll,
      0,
      width,
      height,
    );
    ctx.drawImage(
      image,
      width - scroll,
      0,
      width,
      height,
    );
  }
})();

export default backDrop;
