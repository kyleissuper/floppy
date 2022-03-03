const physics = (function makePhysics(){

  let defaultFallSpeed = -17;
  let scrollSpeed = -5;
  let fallSpeed = defaultFallSpeed;
  let fallGravity = 1.3;

  const publicAPI = {
    fall,
    jump,
    didBirdHitBox,
    reset,
    currentFallSpeed,
    scrollSpeed
  };

  return publicAPI;

  // ****************************************

  function currentFallSpeed() {
    return fallSpeed
  }

  function fall() {
    fallSpeed += fallGravity;
  }

  function jump() {
    fallSpeed = defaultFallSpeed;
  }

  function didBirdHitBox(birdState, box) {
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
  }

  function reset() {
    fallSpeed = defaultFallSpeed;
  }

})();

export { physics };
