/******************************************************************************
Engine Setup
******************************************************************************/

let gameLoop = new Loop(updateLoop);
let gameScreen = undefined;

let mapSelect = document.getElementById("MapSelect");

const SCALE = 1;
let map = undefined;
let cam = [0,0];
let cursor = new Vector(0, 0);
let selectedTile = 0;

/******************************************************************************
Pre-load
******************************************************************************/

let tileImages = new SpriteSheet("images/tiles.png", 16, 16);

function loadLoop(RAFTS) {
  // Draw loading message
  gameScreen.ctx.fillStyle = "rgb(0,0,0)";
  gameScreen.ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);
  gameScreen.drawText(
    "Loading..."
    ,Math.floor(gameScreen.width * 0.5),Math.floor(gameScreen.height * 0.5)
    ,"36px Monospace"
    ,"center"
    ,"rgb(255,0,0)"
  );
  // Asset check
  if (tileImages.loaded) {
    console.log("All assets loaded. Starting game...")
    preLoadLoop.stop();
    populateTileMenu();
    gameLoop.start();
  }
}
let preLoadLoop = new Loop(loadLoop);

/******************************************************************************
Init
******************************************************************************/

function loadMap(mapId) {
  map = new Map(MAP_TYPES[mapId]);
  if (map.tiles.length == 0 || map.grid.length == 0) {
    for (let x = 0; x < map.width; x++) {
      let tCol = [];
      let gCol = [];
      for (let y = 0; y < map.height; y++) {
        tCol.push(2);
        gCol.push(0);
      }
      map.tiles.push(tCol);
      map.grid.push(gCol);
    }
  }
  document.getElementById("StartDiv").className = "hide";
  document.getElementById("EditorDiv").className = "";
  gameScreen = new Screen(
    document.getElementById("screen")
    ,map.width * map.tileSize * SCALE
    ,map.height * map.tileSize * SCALE
  );
  preLoadLoop.start();
}

function populateMapSelect() {
  for (let i = 0; i < MAP_TYPES.length; i++) {
    let op = document.createElement("option");
    op.innerHTML = MAP_TYPES[i].name;
    op.value = i;
    mapSelect.appendChild(op);
  }
}
populateMapSelect();

function populateTileMenu() {
  let tileSelectMenu = document.getElementById("TileSelectDiv");
  for (let i = 0; i < tileImages.images.length; i++) {
    let cnvs = document.createElement("canvas");
    cnvs = tileImages.images[i];
    cnvs.setAttribute("tileId", i);
    cnvs.onclick = setTile;
    tileSelectMenu.appendChild(tileImages.images[i]);
  }
}

function saveMaps() {
  let mapJSON = "const MAP_TYPES = " + JSON.stringify(MAP_TYPES) + ";";
  let file = new Blob([mapJSON], {type: 'text/javascript'});
  let a = document.createElement("a");
  let url = URL.createObjectURL(file);
  a.href = url;
  a.download = "maps.js";
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

/******************************************************************************
Update
******************************************************************************/

function setTile() {
  selectedTile = parseInt(this.getAttribute("tileId"));
}

function update() {
  setCursor();
  if (gameScreen.mouseButtons[0]) {
    map.tiles[cursor.x][cursor.y] = selectedTile;
  } else if (gameScreen.mouseButtons[1]) {
    if (map.grid[cursor.x][cursor.y] == 0) {
      map.grid[cursor.x][cursor.y] = 1;
    } else {
      map.grid[cursor.x][cursor.y] = 0;
    }
    gameScreen.mouseButtons[1] = false;
  }
}

function setCursor() {
  cursor.x = Math.min(Math.max(Math.floor(gameScreen.mousePos[0] / (map.tileSize * SCALE)), 0), map.width - 1);
  cursor.y = Math.min(Math.max(Math.floor(gameScreen.mousePos[1] / (map.tileSize * SCALE)), 0), map.height - 1);  
}

/******************************************************************************
Draw
******************************************************************************/

function draw() {
  drawMap();
  drawCursor();
  drawGrid();
}

function drawMap() {
  // Clear screen
  gameScreen.clearScreen();
  // Draw Tiles
  for (let x = 0; x < map.width; x++) {
    for (let y = 0; y < map.height; y++) {
      gameScreen.ctx.drawImage(
        tileImages.images[map.tiles[x][y]]
        ,0,0
        ,tileImages.images[map.tiles[x][y]].width
        ,tileImages.images[map.tiles[x][y]].height
        ,map.tileSize * SCALE * x
        ,map.tileSize * SCALE * y
        ,map.tileSize * SCALE
        ,map.tileSize * SCALE
      );
    }
  }
}

function drawGrid() {
  // Draw Grid
  for (let x = 0; x < map.width; x++) {
    for (let y = 0; y < map.height; y++) {
      if (map.grid[x][y] == 1) {
        gameScreen.drawBall(
          (map.tileSize * SCALE * x) + (map.tileSize * SCALE * 0.5)
          ,(map.tileSize * SCALE * y) + (map.tileSize * SCALE * 0.5)
          ,2
          ,"rgb(255,0,0)"
        );
      }
    }
  }
}

function drawCursor() {
  gameScreen.ctx.drawImage(
    tileImages.images[selectedTile]
    ,0,0
    ,tileImages.images[selectedTile].width
    ,tileImages.images[selectedTile].height
    ,map.tileSize * SCALE * cursor.x
    ,map.tileSize * SCALE * cursor.y
    ,map.tileSize * SCALE
    ,map.tileSize * SCALE
  );
  gameScreen.ctx.beginPath();
  gameScreen.ctx.lineWidth = 1;
  gameScreen.ctx.strokeStyle = "rgb(0,255,0)";
  gameScreen.ctx.rect(
    cursor.x * map.tileSize * SCALE
    ,cursor.y * map.tileSize * SCALE
    ,map.tileSize * SCALE
    ,map.tileSize * SCALE
  );
  gameScreen.ctx.stroke();
}

/******************************************************************************
Game Loop
******************************************************************************/

function updateLoop(RAFTS) {
  update();
  draw();

  // drawDebug();
}