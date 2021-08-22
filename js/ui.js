
let startMenu = document.getElementById("StartMenu");

let teamSetupMenu = document.getElementById("TeamSetupMenu");
let playerNameSpan = document.getElementById("PlayerNameSpan");
let playerCanvas = document.getElementById("PlayerCanvas");
let ally1NameSpan = document.getElementById("Ally1NameSpan");
let ally1Canvas = document.getElementById("Ally1Canvas");
let ally2NameSpan = document.getElementById("Ally2NameSpan");
let ally2Canvas = document.getElementById("Ally2Canvas");


let gameSetupMenu = document.getElementById("GameSetupMenu");
let mapSelect = document.getElementById("MapSelect");
let levelSelect = document.getElementById("LevelSelect");

let uiSelections = {
  "playerId": 2
  ,"ally1Id": 0
  ,"ally2Id": 1
  ,"weaponId": 0
  ,"armorId": 0
  ,"abilityId": 0
  ,"mapId": 0
  ,"levelId": 0
};

/******************************************************************************
UI Functions
******************************************************************************/

function startMenuUpdate(RAFTS) {
  // Draw Main Menu
  gameScreen.ctx.drawImage(
    MMBG_IMAGE.images[0]
    ,0
    ,0
    ,MMBG_IMAGE.images[0].width
    ,MMBG_IMAGE.images[0].height
    ,0
    ,0
    ,gameScreen.width
    ,gameScreen.height
  );
}
let startMenuLoop = new Loop(startMenuUpdate);

function buildTeamSetupMenu() {

}

function buildGameSetupMenu() {
  for (let i = 0; i < MAP_TYPES.length; i++) {
    let op = document.createElement("option");
    op.value = i;
    op.text = MAP_TYPES[i].name;
    mapSelect.appendChild(op);
  }
  for (let i = 0; i < LEVEL_TYPES.length; i++) {
    let op = document.createElement("option");
    op.value = i;
    op.text = LEVEL_TYPES[i].name;
    levelSelect.appendChild(op);
  }
}

function updateMapSelect() {
  uiSelections.mapId = mapSelect.value;
}

function buildItemSelect() {

}

function showTeamSetupMenu() {
  startMenu.className = "hide";
  gameSetupMenu.className = "hide";
  teamSetupMenu.className = "teamSetupMenu";
}

function showMainMenu() {
  startMenu.className = "startMenu";
  gameSetupMenu.className = "hide";
  teamSetupMenu.className = "hide";
}

function showGameSetupMenu() {
  startMenu.className = "hide";
  gameSetupMenu.className = "gameSetupMenu";
  teamSetupMenu.className = "hide";
}

function hideMenus() {
  startMenu.className = "hide";
  gameSetupMenu.className = "hide";
  teamSetupMenu.className = "hide";
}

function startGame() {
  hideMenus();
  initMap(uiSelections.mapId);
  initPlayers(
    {// Player
      "id": uiSelections.playerId
      ,"weaponId": uiSelections.weaponId
      ,"armorId": uiSelections.armorId
      ,"abilityId": uiSelections.abilityId
    }
    ,{// Ally 1
      "id": uiSelections.ally1Id
    }
    ,{// Ally 2
      "id": uiSelections.ally2Id
    }
  );
  initLevel(uiSelections.levelId);
  gameLoop.start();
}