/******************************************************************************
Engine Setup
******************************************************************************/

let gameLoop = new Loop(updateLoop);
let gameScreen = new Screen(
  document.getElementById("screen")
  ,256
  ,144
);

/******************************************************************************
Pre-load
******************************************************************************/

const PLAYER_IMAGES = new SpriteSheet("images/players.png", 8, 8);
const PET_IMAGES = new SpriteSheet("images/pets.png", 8, 8);
const MOB_IMAGES = new SpriteSheet("images/mobs.png", 8, 8);
const BULLET_IMAGES = new SpriteSheet("images/bullets.png", 16, 16);
const TILE_IMAGES = new SpriteSheet("images/tiles.png", 16, 16);
const FX_IMAGES = new SpriteSheet("images/fx.png", 16, 16);
const ICON_IMAGES = new SpriteSheet("images/icons.png", 16, 16);
const MMBG_IMAGE = new SpriteSheet("images/mainmenu.png", 256, 144);

let imageAim = undefined;
let effectMelee = undefined;
let effectStruck = undefined;

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
  if (PLAYER_IMAGES.loaded
    && PET_IMAGES.loaded
    && MOB_IMAGES.loaded
    && BULLET_IMAGES.loaded
    && TILE_IMAGES.loaded
    && MMBG_IMAGE.loaded
    && FX_IMAGES.loaded) {
    console.log("All Assets Loaded");
    preLoadLoop.stop();
    // Effects
    imageAim = FX_IMAGES.images[0];
    effectMelee = FX_IMAGES.images[2];
    effectStruck = FX_IMAGES.images[3];
    // UI
    buildGameSetupMenu();
    showMainMenu();
    // Start Main Menu Loop
    startMenuLoop.start();
  }
}
let preLoadLoop = new Loop(loadLoop);
preLoadLoop.start();

/******************************************************************************
Initialization
******************************************************************************/


/* Temp */
let p1TypeId = 2;
let p1WeaponId = 0;
let p1ArmorId = 0;
let p1AbilityId = 0;
let p2TypeId = 0;
let p2WeaponId = 0;
let p2ArmorId = 0;
let p2AbilityId = 0;
let p3TypeId = 1;
let p3WeaponId = 0;
let p3ArmorId = 0;
let p3AbilityId = 0;
/* END */

const screenCenter = new Vector(
  Math.floor(gameScreen.width * 0.5)
  ,Math.floor(gameScreen.height * 0.5)
);
let cam = new Camera(gameScreen.width, gameScreen.height);
let level = undefined;
let allSpawned = false;
let players = [];
let player_id = 0;
let playerBullets = [];
let pets = [];
let pet_id = 0;
let mobs = [];
let mob_id = 0;
let mobBullets = [];
let map = undefined;
let mapImage = undefined;
let effects = [];

// Wave Control
let mapStart = 0;
const intermissionTime = 5000;
let waveStarted = false;
let wave = 0;

function initPlayers(playerData) {
  players = [];
  for (let i = 0; i < playerData.length; i++) {
    let setupData = {
      "unitData": PLAYER_TYPES[playerData[i].id]
      ,"weaponData": PLAYER_WEAPONS[playerData[i].id][playerData[i].weaponId]
      ,"armorData": PLAYER_ARMORS[playerData[i].id][playerData[i].armorId]
      ,"abilityData": PLAYER_ABILITIES[playerData[i].id][playerData[i].abilityId]
      ,"playerId": playerData[i].id
      ,"weaponId": playerData[i].weaponId
      ,"armorId": playerData[i].armorId
      ,"abilityId": playerData[i].abilityId
    };
    let pos = new Vector(map.players[0] + 0.5, map.players[1] + 0.5);
    let radius = PLAYER_IMAGES.images[(PLAYER_TYPES[playerData[i].id].imageRow * PLAYER_IMAGES.framesX)].width * 0.5 / map.tileSize;
    let images = {
      "unit": PLAYER_IMAGES.images[(PLAYER_TYPES[playerData[i].id].imageRow * PLAYER_IMAGES.framesX)]
      ,"portrait": PLAYER_IMAGES.images[(PLAYER_TYPES[playerData[i].id].imageRow * PLAYER_IMAGES.framesX) + 1]
      ,"shadow": PLAYER_IMAGES.images[(PLAYER_TYPES[playerData[i].id].imageRow * PLAYER_IMAGES.framesX) + 2]
      ,"downed": PLAYER_IMAGES.images[(PLAYER_TYPES[playerData[i].id].imageRow * PLAYER_IMAGES.framesX) + 3]
    };
    if (!spawnPlayer(setupData, pos, radius, images)) {
      preLoadLoop.stop();
      startMenuLoop.stop();
      gameLoop.stop();
      console.log(`Could not place player ${playerData[i]}.`);
      console.log(players);
      console.log(setupData);
      console.log(pos);
      console.log(radius);
      console.log(images);
    }
  }
}

function spawnPlayer(setupData, pos, radius, images) {
  let newPlayer = new Unit(
    setupData
    ,pos
    ,radius
    ,images
  );
  newPlayer.id = "p" + player_id;
  player_id += 1;
  // Placement
  newPlayer.pos = findPlacement(newPlayer.pos, newPlayer.radius * 1.5, 8, players.concat(mobs).concat(pets), map.grid);
  if (newPlayer.pos === undefined) {
    return false;
  } else {
    addObjectToList(newPlayer, players);
    return true;
  }
}

function spawnMobs() {
  allSpawned = true;
  let waveSpawns = level.waveSpawns[level.currentWave];
  for (let i = 0; i < waveSpawns.length; i++) {
    if (!waveSpawns[i].spawned) {
        allSpawned = false;
      if (gameLoop.elapsedTime >= level.waveStartTime + waveSpawns[i].spawnTime + intermissionTime) {
        if (waveSpawns[i].spawnAmount > 0) {
          if (createMob(MOB_TYPES[waveSpawns[i].mobId])) {
            waveSpawns[i].spawnAmount -= 1;
          }
          return;
        } else {
          waveSpawns[i].spawned = true;
          level.mapSpawnLocation = Math.floor(Math.random() * map.spawns.length);
        }
      }
    }
  }
}

function createMob(mobData) {
  let mImages = {
    "unit": MOB_IMAGES.images[(mobData.imageRow * MOB_IMAGES.framesX)]
    ,"portrait": undefined
    ,"shadow": MOB_IMAGES.images[(mobData.imageRow * MOB_IMAGES.framesX) + 1]
    ,"downed": undefined
  };
  let mSetup = {
    "unitData": mobData
    ,"weaponData": MOB_WEAPONS[mobData.weaponId]
    ,"armorData": MOB_ARMORS[mobData.armorId]
    ,"abilityData": MOB_ABILITIES[mobData.abilityId]
  };
  let newMob = new Unit(
    mSetup
    ,new Vector(map.spawns[level.mapSpawnLocation][0] + 0.5, map.spawns[level.mapSpawnLocation][1] + 0.5)
    ,mImages.unit.width * 0.5 / map.tileSize
    ,mImages
  );
  newMob.id = "m" + mob_id;
  mob_id += 1;
  newMob.pos = findPlacement(newMob.pos, newMob.radius * 1.1, 2, players.concat(mobs).concat(pets), map.grid);
  if (newMob.pos === undefined) {
    return false;
  } else {
    addObjectToList(newMob, mobs);
    return true;
  }
}

function summonPet(unit, petId, count) {
  // Remove existing pets
  for (let i = 0; i < pets.length; i++) {
    if (pets[i].alive && pets[i].owner.id == unit.id) {
      pets[i].alive = false;
    }
  }
  for (let i = 0; i < count; i++) {
    let newPet = new Unit(
      {
        "unitData": PET_TYPES[petId]
        ,"weaponData": PET_WEAPONS[PET_TYPES[petId].weaponId]
        ,"armorData": PET_ARMORS[PET_TYPES[petId].armorId]
        ,"abilityData": MOB_ABILITIES[PET_TYPES[petId].abilityId]
        ,"playerId": petId
        ,"weaponId": PET_TYPES[petId].weaponId
        ,"armorId": PET_TYPES[petId].armorId
        ,"abilityId": PET_TYPES[petId].abilityId
      }
      ,new Vector(unit.pos.x, unit.pos.y)
      ,PET_IMAGES.images[(PET_TYPES[petId].imageRow * PET_IMAGES.framesX)].width * 0.5 / map.tileSize
      ,{
        "unit": PET_IMAGES.images[(PET_TYPES[petId].imageRow * PET_IMAGES.framesX)]
        ,"shadow": PET_IMAGES.images[(PET_TYPES[petId].imageRow * PET_IMAGES.framesX) + 1]
      }
    );
    newPet.pos = findPlacement(newPet.pos, newPet.radius * 1.1, 2, players.concat(mobs).concat(pets), map.grid);
    newPet.owner = unit;
    newPet.id = "pet" + pet_id;
    pet_id += 1;
    if (newPet.pos !== undefined) {
      addObjectToList(newPet, pets);
    }
  }
}

function findPlacement(pos, radius, maxDistance, objects, grid) {
  let testBall = new Ball(
    pos
    ,radius
  );
  let ballAngle = Math.random() * Math.PI * 2;
  let ballDistance = testBall.radius * 2;
  while (Ball.collidesGrid(testBall, grid)
    || Ball.collidesBalls(testBall, objects)) {
    testBall.pos = pos.add(Vector.fromAngle(ballAngle).normalize().mul(ballDistance));
    ballAngle += Math.PI * 0.25;
    if (ballAngle >= Math.PI * 2) {
      ballAngle = 0;
      ballDistance += testBall.radius * 2;
      if (ballDistance >= maxDistance) {
        return undefined;
      }
    }
  }
  return testBall.pos;
}

function createBullet(unit, image, damage) {
  let pos = unit.pos.add(Vector.fromAngle(unit.dir).normalize().mul(unit.radius));
  let bullet = new Bullet(
    pos
    ,unit.radius * 0.5
    ,image
    ,damage
    ,unit
  );
  bullet.dir = unit.dir;
  bullet.vel = Vector.fromAngle(unit.dir).normalize().mul(bullet.speed);
  if (unit.attack.isMultiHit) {
    bullet.multiHit = true;
  }
  if (unit.id[0] == "m") {
    addObjectToList(bullet, mobBullets);
  } else {
    addObjectToList(bullet, playerBullets);
  }
}

function addObjectToList(obj, objList) {
  for (let i = 0; i < objList.length; i++) {
    if (!objList[i].alive) {
      objList[i] = obj;
      return;
    }
  }
  objList.push(obj);
}

function createEffect(pos, size, image, duration, dir) {
  let effect = new Effect(pos, 0, image, size);
  effect.duration = duration;
  effect.dir = dir;
  effect.startTime = gameLoop.elapsedTime;
  addObjectToList(effect, effects);
}

function initMap(mapId) {
  map = new Map(MAP_TYPES[mapId]);
  // Build Map Image
  map.buildImage(TILE_IMAGES);
}

function initLevel(levelId) {
  level = new Level(LEVEL_TYPES[levelId]);
  // level.currentWave = 2;
  level.waveStartTime = gameLoop.elapsedTime;
}

/******************************************************************************
Update Functions
******************************************************************************/

function update() {
  // Wave state control
  waveControl();
  // Keyboard & Mouse control
  playerControls();
  // AI Controls
  playerAIControls();
  petAIControls();
  mobAIControls();
  // Bullets
  updateBullets(playerBullets, mobs);
  updateBullets(mobBullets, players.concat(pets));
  // Units
  updateUnits(players.concat(pets), mobs);
  updateUnits(mobs, players.concat(pets));
  // Center camera on player
  cam.center(players[0].pos.mul(map.tileSize));
  // Effects
  updateEffects();
}

function waveControl() {
  // if all players are dead, game end
  if (!areAnyAlive(players)) {
    //stuff
  }
  //if all mobs are spawned and all mobs are dead, next wave
  if (allSpawned && !areAnyAlive(mobs)) {
    if (level.nextWave(gameLoop.elapsedTime)) {
      // game win!, but for now...
      initLevel(0);
    }
    mobs = [];
    mobBullets = [];
    mob_id = 0;
    allSpawned = false;
  } else {
    spawnMobs();
  }
}

function areAnyAlive(objectList) {
  for (let i = 0; i < objectList.length; i++) {
    if (objectList[i].alive) {
      return true;
    }
  }
  return false;
}

function playerControls() {
  players[0].movement = new Vector(0, 0);
  if (players[0].alive) {
    // WASD/Arrow movement
    if (gameKeys.up && !gameKeys.down) {
      players[0].movement = players[0].movement.add(new Vector(0, -1));
    } else if (gameKeys.down && !gameKeys.up) {
      players[0].movement = players[0].movement.add(new Vector(0, 1));
    }
    if (gameKeys.left && !gameKeys.right) {
      players[0].movement = players[0].movement.add(new Vector(-1, 0));
    } else if (gameKeys.right && !gameKeys.left) {
      players[0].movement = players[0].movement.add(new Vector(1, 0));
    }
    // Mouse
    players[0].dir = screenCenter.getNormalizedAngle(new Vector(
      gameScreen.mousePos[0]
      ,gameScreen.mousePos[1]
    ));
    if (gameScreen.mouseButtons[0]) {
      unitAttack(players[0], mobs);
    }
    if (gameScreen.mouseButtons[1]) {
      // use ability
      let mousePos = new Vector(gameScreen.mousePos[0], gameScreen.mousePos[1]).add(cam).div(map.tileSize);
      unitUseAbility(players[0], players, mobs, mousePos);
    }
  }
}

function mobAIControls() {
  for (let i = 0; i < mobs.length; i++) {
    mobAIMasterControl(mobs[i], mobs, players.concat(pets), map.grid);
  }
}

function petAIControls() {
  for (let i = 0; i < pets.length; i++) {
    petAIMasterControl(pets[i], players.concat(pets), mobs, map.grid);
  }
}

function playerAIControls() {
  for (let i = 0; i < players.length; i++) {
    if (players[i].alive) {
      unitRevive(players[i], players);
      if (i >= 1) {
        playerAIMasterControl(players[i], players.concat(pets), mobs, map.grid);
      }
    }
  }
}

function updateUnits(units, enemies) {
  for (let i = 0; i < units.length; i++) {
    if (units[i].alive) {
      units[i].update(map.grid, units, enemies);
      units[i].regen(gameLoop.elapsedTime);
    }
  }
}

function updateBullets(bullets, enemies) {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].alive) {
      bullets[i].update(enemies, map.grid);
    }
  }
}

function updateEffects() {
  for (let i = 0; i < effects.length; i++) {
    if (effects[i].alive) {
      effects[i].update(gameLoop.elapsedTime);
    }
  }
}

function unitAttack(unit, enemies) {
  if (gameLoop.elapsedTime >= unit.lastAttack + unit.attack.attackSpeed) {
    unit.lastAttack = gameLoop.elapsedTime;
    if (unit.attack.isMelee) {
      let fxPos = unit.pos.add(Vector.fromAngle(unit.dir).normalize().mul(unit.radius));
      createEffect(fxPos, unit.imageScaled, effectMelee, 34, unit.dir);
      if (unit.attack.isMultiHit) {
        let targets = findLivingTargetInConeMulti(unit, enemies, unit.attack.range, Math.PI);
        for (let i = 0; i < targets.length; i++) {
          enemies[i].receiveDamage(unit.attack.damage);
        }
      } else {
        let target = findLivingTargetInCone(unit, enemies, unit.attack.range, Math.PI * 0.5);
        if (target > -1) {
          enemies[target].receiveDamage(unit.attack.damage);
        }
      }
      
    } else {
      createBullet(unit, BULLET_IMAGES.images[unit.attack.bulletImageId], unit.attack.damage);
    }
  }
}

function unitUseAbility(unit, allies, enemies, targetLocation) {
  if (unit.ability !== undefined) {
    if (gameLoop.elapsedTime >= unit.lastAbility + unit.ability.cooldown
      && unit.nrg >= unit.ability.cost) {
      unit.lastAbility = gameLoop.elapsedTime;
      unit.useNRG(unit.ability.cost);

      switch(unit.ability.category) {
        case ABILITY_CATEGORIES.attack:
          if (unit.ability.target == ABILITY_TARGETS.bullet) {
            createBullet(unit, BULLET_IMAGES.images[unit.attack.bulletImageId], unit.ability.damage);// NEED TO FIX THIS!
          } else if (unit.ability.target == ABILITY_TARGETS.cone) {
            //stuff
          } else if (unit.ability.target == ABILITY_TARGETS.pbAOE) {
            //stuff
          } else if (unit.ability.target == ABILITY_TARGETS.targetedAOE) {
            //stuff
          }
          break;
        case ABILITY_CATEGORIES.heal:
          if (unit.ability.target == ABILITY_TARGETS.self) {
            unit.gainHP(unit.ability.data.amount);
          } else if (unit.ability.target == ABILITY_TARGETS.pbAOE) {
            //stuff
          } else if (unit.ability.target == ABILITY_TARGETS.targetedAOE) {
            //stuff
          }
          break;
        case ABILITY_CATEGORIES.buff:
          if (unit.ability.target == ABILITY_TARGETS.self) {
            //stuff
          } else if (unit.ability.target == ABILITY_TARGETS.pbAOE) {
            //stuff
          } else if (unit.ability.target == ABILITY_TARGETS.targetedAOE) {
            //stuff
          }
          break;
        case ABILITY_CATEGORIES.summon:
          summonPet(unit, unit.ability.data.petId, unit.ability.data.count);
          break;
        case ABILITY_CATEGORIES.teleport:
          if (!teleport(unit, targetLocation)) {
            unit.gainNRG(unit.ability.cost);
            unit.lastAbility -= unit.ability.cooldown;
          }
          break;
        default:
          //nothing
          break;
      }
    }
  }
}

function teleport(unit, pos) {
  let testBall = new Ball(new Vector(pos.x, pos.y), unit.radius);
  if (!Ball.collidesGrid(testBall, map.grid)
    && !Ball.collidesBalls(testBall, players.concat(mobs))) {
    unit.pos = new Vector(pos.x, pos.y);
    return true;
  }
  return false;
}

function unitRevive(unit, allies) {
  if (unit.nrg >= 50) {
    for (let i = 0; i < allies.length; i++) {
      if (unit.id != allies[i].id && !allies[i].alive) {
        if (unit.pos.getDistance(allies[i].pos) <= unit.radius + allies[i].radius) {
          unit.nrg -= 50;
          allies[i].hp = allies[i].health * 0.5;
          allies[i].alive = true;
          allies[i].hasCollision = true;
          return;
        }
      }
    }
  }
}

/******************************************************************************
Draw Functions
******************************************************************************/

function draw() {
  // Map
  drawMap();
  // Player[0] Aim Indicator
  drawAimIndicator(players[0]);
  // Unit Shadows
  drawUnitShadows(mobs, false);
  drawUnitShadows(pets, false);
  drawUnitShadows(players, true);
  // Unit images
  drawUnits(mobs);
  drawUnits(pets);
  drawUnits(players);
  // Bullets
  drawBullets(playerBullets);
  drawBullets(mobBullets);
  // Effects
  drawEffects();
  // Stats & UI
  drawStats(pets, true);
  drawStats(players);
  drawPlayerPlaques();
  drawPlayer1Actions();
}

function drawMap() {
  // Clear screen
  gameScreen.clearScreen();
  map.draw(gameScreen.ctx, cam, cam.size);
}

function drawUnitShadows(units, drawDead) {
  for (let i = 0; i < units.length; i++) {
    if (cam.isInView(units[i].pos.mul(map.tileSize), units[i].imageScaled)) {
      if ((!drawDead && units[i].alive) || drawDead)
      units[i].drawShadow(gameScreen.ctx, map.tileSize, cam);
    }
  }
}

function drawUnits(units) {
  for (let i = 0; i < units.length; i++) {
    if (cam.isInView(units[i].pos.mul(map.tileSize), units[i].imageScaled)) {
      units[i].drawImage(gameScreen.ctx, map.tileSize, cam);
    }
  }
}

function drawBullets(bullets) {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].alive && cam.isInView(bullets[i].pos.mul(map.tileSize), bullets[i].size)) {
      bullets[i].draw(gameScreen.ctx, map.tileSize, cam);
    }
  }
}

function drawEffects() {
  for (let i = 0; i < effects.length; i++) {
    if (effects[i].alive && cam.isInView(effects[i].pos.mul(map.tileSize), effects[i].size)) {
      effects[i].draw(gameScreen.ctx, map.tileSize, cam);
    }
  }
}

function drawAimIndicator(unit) {
  if (unit.alive) {
    gameScreen.ctx.save();
    gameScreen.ctx.translate(
      Math.floor((unit.pos.x * map.tileSize) - cam.x)
      ,Math.floor((unit.pos.y * map.tileSize) - cam.y)
    );
    gameScreen.ctx.rotate(unit.dir + (Math.PI * 0.25));
    gameScreen.ctx.drawImage(
      imageAim
      ,0,0,imageAim.width,imageAim.height
      ,-(imageAim.width * 0.5)
      ,-(imageAim.height * 0.5)
      ,imageAim.width,imageAim.height
    );
    gameScreen.ctx.restore();
  }
}

function drawPlayerPlaques() {
  let xOffset = 2;
  let yOffset = 2;
  for (let i = 0; i < players.length; i++) {
    // Portrait
    gameScreen.ctx.drawImage(
      players[i].images.portrait
      ,0
      ,0
      ,players[i].images.portrait.width
      ,players[i].images.portrait.height
      ,xOffset
      ,yOffset
      ,players[i].images.portrait.width
      ,players[i].images.portrait.height
    );
    // Health Bar - Background
    gameScreen.ctx.fillStyle = "rgb(0,0,0)";//"rgb(255,0,0)";
    gameScreen.ctx.fillRect(
      xOffset + players[i].images.portrait.width + 2
      ,yOffset
      ,Math.floor(players[i].images.portrait.width * 2)
      ,Math.floor(players[i].images.portrait.height * 0.5)
    );
    // Health Bar - Foreground
    gameScreen.ctx.fillStyle = "rgb(255,0,0)";//"rgb(0,255,0)";
    gameScreen.ctx.fillRect(
      xOffset + players[i].images.portrait.width + 2
      ,yOffset
      ,Math.floor(Math.floor(players[i].images.portrait.width * 2) * (players[i].hp / players[i].health))
      ,Math.floor(players[i].images.portrait.height * 0.5)
    );
    // Energy Bar - Background
    gameScreen.ctx.fillStyle = "rgb(0,0,0)";//"rgb(79,0,81)";
    gameScreen.ctx.fillRect(
      xOffset + players[i].images.portrait.width + 2
      ,yOffset + Math.floor(players[i].images.portrait.width * 0.5)
      ,Math.floor(players[i].images.portrait.width * 2)
      ,Math.floor(players[i].images.portrait.height * 0.5)
    );
    // Energy Bar - Foreground
    gameScreen.ctx.fillStyle = "rgb(0,255,0)";//"rgb(0,111,255)";
    gameScreen.ctx.fillRect(
      xOffset + players[i].images.portrait.width + 2
      ,yOffset + Math.floor(players[i].images.portrait.width * 0.5)
      ,Math.floor(Math.floor(players[i].images.portrait.width * 2) * (players[i].nrg / players[i].energy))
      ,Math.floor(players[i].images.portrait.height * 0.5)
    );
    // For next row
    yOffset += players[i].images.portrait.height + 2;
  }
}

function drawPlayer1Actions() {

}

function drawStats(units, aliveOnly=false) {
  for (let i = 0; i < units.length; i++) {
    if (aliveOnly && !units[i].alive) {
      //nothing
    } else {
      // Health Bar - Background
      gameScreen.ctx.fillStyle = "rgb(0,0,0)";//"rgb(255,0,0)";
      gameScreen.ctx.fillRect(
        Math.floor((units[i].pos.x * map.tileSize) - cam.x - (units[i].imageScaled.x * 0.5))
        ,Math.floor((units[i].pos.y * map.tileSize) - cam.y - units[i].imageScaled.y - 1)
        ,units[i].imageScaled.x
        ,1
      );
      // Health Bar - Foreground
      gameScreen.ctx.fillStyle = "rgb(255,0,0)";//"rgb(0,255,0)";
      gameScreen.ctx.fillRect(
        Math.floor((units[i].pos.x * map.tileSize) - cam.x - (units[i].imageScaled.x * 0.5))
        ,Math.floor((units[i].pos.y * map.tileSize) - cam.y - units[i].imageScaled.y - 1)
        ,Math.floor(units[i].imageScaled.x * (units[i].hp / units[i].health))
        ,1
      );
      // Energy Bar - Background
      gameScreen.ctx.fillStyle = "rgb(0,0,0)";//"rgb(79,0,81)";
      gameScreen.ctx.fillRect(
        Math.floor((units[i].pos.x * map.tileSize) - cam.x - (units[i].imageScaled.x * 0.5))
        ,Math.floor((units[i].pos.y * map.tileSize) - cam.y - units[i].imageScaled.y)
        ,units[i].imageScaled.x
        ,1
      );
      // Energy Bar - Foreground
      gameScreen.ctx.fillStyle = "rgb(0,255,0)";//"rgb(0,111,255)";
      gameScreen.ctx.fillRect(
        Math.floor((units[i].pos.x * map.tileSize) - cam.x - (units[i].imageScaled.x * 0.5))
        ,Math.floor((units[i].pos.y * map.tileSize) - cam.y - units[i].imageScaled.y)
        ,Math.floor(units[i].imageScaled.x * (units[i].nrg / units[i].energy))
        ,1
      );
    }
  }
}

function drawDebug() {
  gameScreen.drawText(
    `${gameLoop.fps}`
    ,gameScreen.width - 1
    ,gameScreen.height - 1
    ,"10px Monospace"
    ,"right"
    ,"rgba(0,255,0,0.5)"
  );
}

/******************************************************************************
Game Loop
******************************************************************************/

function updateLoop(RAFTS) {
	update();
	draw();

  drawDebug();
}

/******************************************************************************
AI Functions, probably needs to go somewhere else but I suck at this
******************************************************************************/

function mobAIMasterControl(unit, allies, enemies, grid) {
  if (unit.alive) {
    if (gameLoop.elapsedTime >= unit.aiLastUpdate + unit.aiUpdateTime) {
      unit.aiLastUpdate = gameLoop.elapsedTime;
      unit.movement = new Vector(0, 0);
      unit.targetId = findClosestLivingTarget(unit.pos, enemies);

      if (unit.ai == 0 || unit.ai == undefined) {
        if (unit.targetId > -1 && enemies[unit.targetId].alive) {
          // Attack
          if (unit.pos.getDistance(enemies[unit.targetId].pos) <= unit.attack.range + enemies[unit.targetId].radius) {
            unit.dir = unit.pos.getNormalizedAngle(enemies[unit.targetId].pos);
            unitAttack(unit, enemies);
          } else {
            // Movement
            navigateToTarget(unit, enemies[unit.targetId], grid);
          }
          // Ability

        }
      }
    }
  }
}
function petAIMasterControl(unit, allies, enemies, grid) {
  if (unit.alive) {
    if (gameLoop.elapsedTime >= unit.aiLastUpdate + unit.aiUpdateTime) {
      unit.aiLastUpdate = gameLoop.elapsedTime;
      unit.movement = new Vector(0, 0);

      if (unit.pos.getDistance(unit.owner.pos) <= 4) {
        unit.targetId = findClosestLivingTarget(unit.pos, enemies);

        if (unit.ai == 0 || unit.ai == undefined) {
          if (unit.targetId > -1 && enemies[unit.targetId].alive) {
            // Attack
            if (unit.pos.getDistance(enemies[unit.targetId].pos) <= unit.attack.range + enemies[unit.targetId].radius) {
              unit.dir = unit.pos.getNormalizedAngle(enemies[unit.targetId].pos);
              unitAttack(unit, enemies);
            } else {
              // Movement
              navigateToTarget(unit, enemies[unit.targetId], grid);
            }
            // Ability

          }
        }
      } else {
        navigateToTarget(unit, unit.owner, grid);
      }
    }
  }
}
function playerAIMasterControl(unit, allies, enemies, grid) {//totally temporary until NN can get trained
  if (unit.alive) {
    if (gameLoop.elapsedTime >= unit.aiLastUpdate + unit.aiUpdateTime) {
      unit.aiLastUpdate = gameLoop.elapsedTime;
      unit.movement = new Vector(0, 0);
      unit.targetId = findClosestLivingTarget(unit.pos, enemies);

      if (unit.ai == 0 || unit.ai == undefined) {
        if (unit.targetId > -1 && enemies[unit.targetId].alive) {
          // Attack
          if (unit.pos.getDistance(enemies[unit.targetId].pos) <= unit.attack.range + enemies[unit.targetId].radius) {
            unit.dir = unit.pos.getNormalizedAngle(enemies[unit.targetId].pos);
            unitAttack(unit, enemies);
          } else {
            // Movement
            navigateToTarget(unit, enemies[unit.targetId], grid);
          }
          // Ability

        }
      }
    }
  }
}

function findClosestLivingTarget(pos, targets, distance=Infinity) {
  let dist = distance;
  let targetId = -1;
  for (let i = 0; i < targets.length; i++) {
    if (targets[i].alive) {
      let d = pos.getDistance(targets[i].pos);
      if (d < dist) {
        dist = d;
        targetId = i;
      }
    }
  }
  return targetId;
}

function findLivingTargetInCone(unit, enemies, distance, arc) {
  let dist = distance;
  let targetId = -1;
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].alive) {
      let d = unit.pos.getDistance(enemies[i].pos);
      if (d <= dist + enemies[i].radius) {
        let a = unit.pos.getNormalizedAngle(enemies[i].pos);
        if (Math.abs(unit.dir - a) <= arc){
          dist = d;
          targetId = i;
        }
      }
    }
  }
  return targetId;
}

function findLivingTargetInConeMulti(unit, enemies, distance, arc) {
  let dist = distance;
  let targets = [];
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].alive) {
      let d = unit.pos.getDistance(enemies[i].pos);
      if (d <= dist + enemies[i].radius) {
        let a = unit.pos.getNormalizedAngle(enemies[i].pos);
        if (Math.abs(unit.dir - a) <= arc){
          targets.push(i);
        }
      }
    }
  }
  return targets;
}

function navigateToTarget(unit, target, grid) {
  // Update path to target
  if (gameLoop.elapsedTime >= unit.pathLastUpdate + unit.pathUpdateTime) {
    unit.pathLastUpdate = gameLoop.elapsedTime;
    unit.path = Astar(
      Math.floor(unit.pos.x)
      ,Math.floor(unit.pos.y)
      ,Math.floor(target.pos.x)
      ,Math.floor(target.pos.y)
      ,grid
    );
    unit.pathCurrentNode = 1;
  }
  if (unit.path.length > 1) {// Have a path to target, get moving
    // if on current node, update node
    let distanceToNode = new Vector(
      unit.path[unit.pathCurrentNode][0] + 0.5
      ,unit.path[unit.pathCurrentNode][1] + 0.5
    ).sub(unit.pos);
    if (Math.abs(distanceToNode.x) < unit.radius
      && Math.abs(distanceToNode.y) < unit.radius) {
      unit.pathCurrentNode += 1;
      if (unit.pathCurrentNode >= unit.path.length) {
        unit.path = [];
        unit.pathCurrentNode = -1;
      }
    }
    if (unit.path.length > 1) {
      // finally, move to middle of current node
      unit.dir = unit.pos.getNormalizedAngle(target.pos);
      if (unit.path[unit.pathCurrentNode][1] + 0.5 < unit.pos.y - unit.radius) {
        unit.movement = unit.movement.add(new Vector(0, -1));
      } else if (unit.path[unit.pathCurrentNode][1] + 0.5 > unit.pos.y + unit.radius) {
        unit.movement = unit.movement.add(new Vector(0, 1));
      }
      if (unit.path[unit.pathCurrentNode][0] + 0.5 < unit.pos.x - unit.radius) {
        unit.movement = unit.movement.add(new Vector(-1, 0));
      } else if (unit.path[unit.pathCurrentNode][0] + 0.5 > unit.pos.x + unit.radius) {
        unit.movement = unit.movement.add(new Vector(1, 0));
      }
    }
  } else {// move at enemy directly
    unit.dir = unit.pos.getNormalizedAngle(target.pos);
    if (target.pos.y + target.radius <= unit.pos.y - (unit.radius * 2)) {
      unit.movement = unit.movement.add(new Vector(0, -1));
    } else if (target.pos.y - target.radius >= unit.pos.y + (unit.radius * 2)) {
      unit.movement = unit.movement.add(new Vector(0, 1));
    }
    if (target.pos.x + target.radius <= unit.pos.x - (unit.radius * 2)) {
      unit.movement = unit.movement.add(new Vector(-1, 0));
    } else if (target.pos.x - target.radius >= unit.pos.x + (unit.radius * 2)) {
      unit.movement = unit.movement.add(new Vector(1, 0));
    }
  }
}