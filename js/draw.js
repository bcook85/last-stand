/******************************************************************************
Load
******************************************************************************/

function drawLoadScreen() {
  gameScreen.ctx.fillStyle = "rgb(0,0,0)";
  gameScreen.ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);
  gameScreen.drawText(
    "Loading..."
    ,Math.floor(gameScreen.width * 0.5),Math.floor(gameScreen.height * 0.5)
    ,"24px Monospace"
    ,"center"
    ,"rgb(255,0,0)"
  );
}

/******************************************************************************
Start
******************************************************************************/

function drawStartMenu() {
  // Main Menu
  if (currentMenu == 0) {
    mainMenu.draw(gameScreen.ctx);
  }
  // Team Menu
  else if (currentMenu == 1) {
    teamMenu.draw(gameScreen.ctx);
  }
  // Game Menu
  else if (currentMenu == 2) {
    gameMenu.draw(gameScreen.ctx);
  }
}

/******************************************************************************
Game
******************************************************************************/

function drawGame() {
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
    let portrait = PLAYER_PORTRAITS.images[players[i].playerId];
    // Portrait
    gameScreen.ctx.drawImage(
      portrait
      ,0
      ,0
      ,portrait.width
      ,portrait.height
      ,xOffset
      ,yOffset
      ,portrait.width
      ,portrait.height
    );
    // Health Bar - Background
    gameScreen.ctx.fillStyle = "rgb(0,0,0)";//"rgb(255,0,0)";
    gameScreen.ctx.fillRect(
      xOffset + portrait.width + 2
      ,yOffset
      ,Math.floor(portrait.width * 2)
      ,Math.floor(portrait.height * 0.5)
    );
    // Health Bar - Foreground
    gameScreen.ctx.fillStyle = "rgb(255,0,0)";//"rgb(0,255,0)";
    gameScreen.ctx.fillRect(
      xOffset + portrait.width + 2
      ,yOffset
      ,Math.floor(Math.floor(portrait.width * 2) * (players[i].hp / players[i].health))
      ,Math.floor(portrait.height * 0.5)
    );
    // Energy Bar - Background
    gameScreen.ctx.fillStyle = "rgb(0,0,0)";//"rgb(79,0,81)";
    gameScreen.ctx.fillRect(
      xOffset + portrait.width + 2
      ,yOffset + Math.floor(portrait.width * 0.5)
      ,Math.floor(portrait.width * 2)
      ,Math.floor(portrait.height * 0.5)
    );
    // Energy Bar - Foreground
    gameScreen.ctx.fillStyle = "rgb(0,255,0)";//"rgb(0,111,255)";
    gameScreen.ctx.fillRect(
      xOffset + portrait.width + 2
      ,yOffset + Math.floor(portrait.width * 0.5)
      ,Math.floor(Math.floor(portrait.width * 2) * (players[i].nrg / players[i].energy))
      ,Math.floor(portrait.height * 0.5)
    );
    // For next row
    yOffset += portrait.height + 2;
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