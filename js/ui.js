
let startMenu = document.getElementById("StartMenu");

let teamSetupMenu = document.getElementById("TeamSetupMenu");
let playerNameSpan = document.getElementById("PlayerNameSpan");
let playerCanvas = document.getElementById("PlayerCanvas");
let ally1NameSpan = document.getElementById("Ally1NameSpan");
let ally1Canvas = document.getElementById("Ally1Canvas");
let ally2NameSpan = document.getElementById("Ally2NameSpan");
let ally2Canvas = document.getElementById("Ally2Canvas");

let weaponNameSpan = document.getElementById("WeaponNameSpan");
let weaponCanvas = document.getElementById("WeaponCanvas");
let armorNameSpan = document.getElementById("ArmorNameSpan");
let armorCanvas = document.getElementById("ArmorCanvas");
let abilityNameSpan = document.getElementById("AbilityNameSpan");
let abilityCanvas = document.getElementById("AbilityCanvas");

let gameSetupMenu = document.getElementById("GameSetupMenu");
let mapSelect = document.getElementById("MapSelect");
let levelSelect = document.getElementById("LevelSelect");

let listMenu = document.getElementById("ListMenu");
let listMenuContainer = document.getElementById("ListMenuContainer");

let uiSelections = {
  "playerId": 1
  ,"ally1Id": 0
  ,"ally2Id": 2
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
  // Player
  playerNameSpan.innerHTML = PLAYER_TYPES[uiSelections.playerId].name;
  updateUICanvas(playerCanvas, PLAYER_IMAGES.images[(PLAYER_TYPES[uiSelections.playerId].imageRow * PLAYER_IMAGES.framesX) + 1]);

  // Ally 1
  ally1NameSpan.innerHTML = PLAYER_TYPES[uiSelections.ally1Id].name;
  updateUICanvas(ally1Canvas, PLAYER_IMAGES.images[(PLAYER_TYPES[uiSelections.ally1Id].imageRow * PLAYER_IMAGES.framesX) + 1]);

  // Ally 2
  ally2NameSpan.innerHTML = PLAYER_TYPES[uiSelections.ally2Id].name;
  updateUICanvas(ally2Canvas, PLAYER_IMAGES.images[(PLAYER_TYPES[uiSelections.ally2Id].imageRow * PLAYER_IMAGES.framesX) + 1]);

  // Weapon
  weaponNameSpan.innerHTML = PLAYER_WEAPONS[uiSelections.playerId][uiSelections.weaponId].name;
  // updateUICanvas(weaponCanvas, WEAPON_IMAGES.images[]);

  // Armor
  armorNameSpan.innerHTML = PLAYER_ARMORS[uiSelections.playerId][uiSelections.armorId].name;
  // updateUICanvas(weaponCanvas, WEAPON_IMAGES.images[]);

  // Ability
  abilityNameSpan.innerHTML = PLAYER_ABILITIES[uiSelections.playerId][uiSelections.abilityId].name;
  // updateUICanvas(weaponCanvas, WEAPON_IMAGES.images[]);
}

function updateUICanvas(canvas, image) {
  let ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    image
    ,0
    ,0
    ,image.width
    ,image.height
    ,0
    ,0
    ,canvas.width
    ,canvas.height
  );
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

function updateLevelSelect() {
  uiSelections.levelId = levelSelect.value;
}

function showTeamSetupMenu() {
  buildTeamSetupMenu();
  startMenu.className = "hide";
  gameSetupMenu.className = "hide";
  teamSetupMenu.className = "teamSetupMenu";
  listMenu.className = "hide";
}

function showMainMenu() {
  startMenu.className = "startMenu";
  gameSetupMenu.className = "hide";
  teamSetupMenu.className = "hide";
  listMenu.className = "hide";
}

function showGameSetupMenu() {
  startMenu.className = "hide";
  gameSetupMenu.className = "gameSetupMenu";
  teamSetupMenu.className = "hide";
  listMenu.className = "hide";
}

function hideMenus() {
  startMenu.className = "hide";
  gameSetupMenu.className = "hide";
  teamSetupMenu.className = "hide";
  listMenu.className = "hide";
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




/******************************************************************************
Build Functions
******************************************************************************/

function buildPlayerSelect() {
  listMenuContainer.innerHTML = "";
  for (let i = 0; i < PLAYER_TYPES.length; i++) {

    let container = document.createElement("div");
    container.setAttribute("data-id", i);
    container.className = "flexContainer listMenuItem";
    container.onclick = function() {
      uiSelections.playerId = parseInt(this.getAttribute("data-id"));
      showTeamSetupMenu();
    };

    let canvas = document.createElement("canvas");
    canvas.className = "listMenuCanvas";
    updateUICanvas(
      canvas
      ,PLAYER_IMAGES.images[(PLAYER_TYPES[i].imageRow * PLAYER_IMAGES.framesX) + 1]
    );
    let leftDiv = document.createElement("div");
    leftDiv.className = "flexColumn listMenuItemCell";
    leftDiv.appendChild(canvas);

    let rightDiv = document.createElement("div");
    rightDiv.className = "flexColumn listMenuItemCell";
    let nameSpan = document.createElement("span");
    nameSpan.className = "listMenuSpan";
    nameSpan.innerHTML = PLAYER_TYPES[i].name;
    let descriptionSpan = document.createElement("span");
    descriptionSpan.className = "listMenuSpan";
    descriptionSpan.innerHTML = PLAYER_TYPES[i].description;
    rightDiv.appendChild(nameSpan);
    rightDiv.appendChild(descriptionSpan);

    container.appendChild(leftDiv);
    container.appendChild(rightDiv);

    listMenuContainer.appendChild(container);
  }
  teamSetupMenu.className = "hide";
  listMenu.className = "listMenu";
}

function buildAlly1Select() {
  listMenuContainer.innerHTML = "";
  for (let i = 0; i < PLAYER_TYPES.length; i++) {

    let container = document.createElement("div");
    container.setAttribute("data-id", i);
    container.className = "flexContainer listMenuItem";
    container.onclick = function() {
      uiSelections.ally1Id = parseInt(this.getAttribute("data-id"));
      showTeamSetupMenu();
    };

    let canvas = document.createElement("canvas");
    canvas.className = "listMenuCanvas";
    updateUICanvas(
      canvas
      ,PLAYER_IMAGES.images[(PLAYER_TYPES[i].imageRow * PLAYER_IMAGES.framesX) + 1]
    );
    let leftDiv = document.createElement("div");
    leftDiv.className = "flexColumn listMenuItemCell";
    leftDiv.appendChild(canvas);

    let rightDiv = document.createElement("div");
    rightDiv.className = "flexColumn listMenuItemCell";
    let nameSpan = document.createElement("span");
    nameSpan.className = "listMenuSpan";
    nameSpan.innerHTML = PLAYER_TYPES[i].name;
    let descriptionSpan = document.createElement("span");
    descriptionSpan.className = "listMenuSpan";
    descriptionSpan.innerHTML = PLAYER_TYPES[i].description;
    rightDiv.appendChild(nameSpan);
    rightDiv.appendChild(descriptionSpan);

    container.appendChild(leftDiv);
    container.appendChild(rightDiv);

    listMenuContainer.appendChild(container);
  }
  teamSetupMenu.className = "hide";
  listMenu.className = "listMenu";
}

function buildAlly2Select() {
  listMenuContainer.innerHTML = "";
  for (let i = 0; i < PLAYER_TYPES.length; i++) {

    let container = document.createElement("div");
    container.setAttribute("data-id", i);
    container.className = "flexContainer listMenuItem";
    container.onclick = function() {
      uiSelections.ally2Id = parseInt(this.getAttribute("data-id"));
      showTeamSetupMenu();
    };

    let canvas = document.createElement("canvas");
    canvas.className = "listMenuCanvas";
    updateUICanvas(
      canvas
      ,PLAYER_IMAGES.images[(PLAYER_TYPES[i].imageRow * PLAYER_IMAGES.framesX) + 1]
    );
    let leftDiv = document.createElement("div");
    leftDiv.className = "flexColumn listMenuItemCell";
    leftDiv.appendChild(canvas);

    let rightDiv = document.createElement("div");
    rightDiv.className = "flexColumn listMenuItemCell";
    let nameSpan = document.createElement("span");
    nameSpan.className = "listMenuSpan";
    nameSpan.innerHTML = PLAYER_TYPES[i].name;
    let descriptionSpan = document.createElement("span");
    descriptionSpan.className = "listMenuSpan";
    descriptionSpan.innerHTML = PLAYER_TYPES[i].description;
    rightDiv.appendChild(nameSpan);
    rightDiv.appendChild(descriptionSpan);

    container.appendChild(leftDiv);
    container.appendChild(rightDiv);

    listMenuContainer.appendChild(container);
  }
  teamSetupMenu.className = "hide";
  listMenu.className = "listMenu";
}

function buildArmorSelect() {
  listMenuContainer.innerHTML = "";
  for (let i = 0; i < PLAYER_ARMORS[uiSelections.playerId].length; i++) {

    let container = document.createElement("div");
    container.setAttribute("data-id", i);
    container.className = "flexContainer listMenuItem";
    container.onclick = function() {
      uiSelections.armorId = parseInt(this.getAttribute("data-id"));
      showTeamSetupMenu();
    };

    let canvas = document.createElement("canvas");
    canvas.className = "listMenuCanvas";
    // updateUICanvas(
    //   canvas
    //   ,WEAPON_IMAGES.images[(PLAYER_TYPES[i].imageRow * WEAPON_IMAGES.framesX) + 1]
    // );
    let leftDiv = document.createElement("div");
    leftDiv.className = "flexColumn listMenuItemCell";
    leftDiv.appendChild(canvas);

    let rightDiv = document.createElement("div");
    rightDiv.className = "flexColumn listMenuItemCell";
    let nameSpan = document.createElement("span");
    nameSpan.className = "listMenuSpan";
    nameSpan.innerHTML = PLAYER_ARMORS[uiSelections.playerId][i].name;
    let descriptionSpan = document.createElement("span");
    descriptionSpan.className = "listMenuSpan";
    descriptionSpan.innerHTML = PLAYER_ARMORS[uiSelections.playerId][i].description;
    rightDiv.appendChild(nameSpan);
    rightDiv.appendChild(descriptionSpan);

    container.appendChild(leftDiv);
    container.appendChild(rightDiv);

    listMenuContainer.appendChild(container);
  }
  teamSetupMenu.className = "hide";
  listMenu.className = "listMenu";
}

function buildAbilitySelect() {
  listMenuContainer.innerHTML = "";
  for (let i = 0; i < PLAYER_ABILITIES[uiSelections.playerId].length; i++) {

    let container = document.createElement("div");
    container.setAttribute("data-id", i);
    container.className = "flexContainer listMenuItem";
    container.onclick = function() {
      uiSelections.abilityId = parseInt(this.getAttribute("data-id"));
      showTeamSetupMenu();
    };

    let canvas = document.createElement("canvas");
    canvas.className = "listMenuCanvas";
    // updateUICanvas(
    //   canvas
    //   ,WEAPON_IMAGES.images[(PLAYER_TYPES[i].imageRow * WEAPON_IMAGES.framesX) + 1]
    // );
    let leftDiv = document.createElement("div");
    leftDiv.className = "flexColumn listMenuItemCell";
    leftDiv.appendChild(canvas);

    let rightDiv = document.createElement("div");
    rightDiv.className = "flexColumn listMenuItemCell";
    let nameSpan = document.createElement("span");
    nameSpan.className = "listMenuSpan";
    nameSpan.innerHTML = PLAYER_ABILITIES[uiSelections.playerId][i].name;
    let descriptionSpan = document.createElement("span");
    descriptionSpan.className = "listMenuSpan";
    descriptionSpan.innerHTML = PLAYER_ABILITIES[uiSelections.playerId][i].description;
    rightDiv.appendChild(nameSpan);
    rightDiv.appendChild(descriptionSpan);

    container.appendChild(leftDiv);
    container.appendChild(rightDiv);

    listMenuContainer.appendChild(container);
  }
  teamSetupMenu.className = "hide";
  listMenu.className = "listMenu";
}

function buildWeaponSelect() {
  listMenuContainer.innerHTML = "";
  for (let i = 0; i < PLAYER_WEAPONS[uiSelections.playerId].length; i++) {

    let container = document.createElement("div");
    container.setAttribute("data-id", i);
    container.className = "flexContainer listMenuItem";
    container.onclick = function() {
      uiSelections.weaponId = parseInt(this.getAttribute("data-id"));
      showTeamSetupMenu();
    };

    let canvas = document.createElement("canvas");
    canvas.className = "listMenuCanvas";
    // updateUICanvas(
    //   canvas
    //   ,WEAPON_IMAGES.images[(PLAYER_TYPES[i].imageRow * WEAPON_IMAGES.framesX) + 1]
    // );
    let leftDiv = document.createElement("div");
    leftDiv.className = "flexColumn listMenuItemCell";
    leftDiv.appendChild(canvas);

    let rightDiv = document.createElement("div");
    rightDiv.className = "flexColumn listMenuItemCell";
    let nameSpan = document.createElement("span");
    nameSpan.className = "listMenuSpan";
    nameSpan.innerHTML = PLAYER_WEAPONS[uiSelections.playerId][i].name;
    let descriptionSpan = document.createElement("span");
    descriptionSpan.className = "listMenuSpan";
    descriptionSpan.innerHTML = PLAYER_WEAPONS[uiSelections.playerId][i].description;
    rightDiv.appendChild(nameSpan);
    rightDiv.appendChild(descriptionSpan);

    container.appendChild(leftDiv);
    container.appendChild(rightDiv);

    listMenuContainer.appendChild(container);
  }
  teamSetupMenu.className = "hide";
  listMenu.className = "listMenu";
}