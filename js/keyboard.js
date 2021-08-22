var gameKeys = {
  "up": false
  ,"down": false
  ,"left": false
  ,"right": false
  ,"use": false
  ,"pauseReleased": false
};

window.onkeydown = function(event) {
  // HideTouchControls();
  // Movement
  if (event.keyCode == 65 || event.keyCode == 37) {//a, left
    gameKeys.left = true;
  }
  if (event.keyCode == 87 || event.keyCode == 38) {//w, up
    gameKeys.up = true;
  }
  if (event.keyCode == 68 || event.keyCode == 39) {//d, right
    gameKeys.right = true;
  }
  if (event.keyCode == 83 || event.keyCode == 40) {//s, down
    gameKeys.down = true;
  }
  // Use
  if (event.keyCode == 69 || event.keyCode == 13) {//e, enter
    gameKeys.use = true;
  }
};

window.onkeyup = function(event) {
  // HideTouchControls();
  // Movement
  if (event.keyCode == 65 || event.keyCode == 37) {//a, left
    gameKeys.left = false;
  }
  if (event.keyCode == 87 || event.keyCode == 38) {//w, up
    gameKeys.up = false;
  }
  if (event.keyCode == 68 || event.keyCode == 39) {//d, right
    gameKeys.right = false;
  }
  if (event.keyCode == 83 || event.keyCode == 40) {//s, down
    gameKeys.down = false;
  }
  // Use
  if (event.keyCode == 69 || event.keyCode == 13) {//e, enter
    gameKeys.use = false;
  }
  // Pause/Menu
  if (event.keyCode == 27) {//ESC
    gameKeys.pauseReleased = true;
  }
};