/******************************************************************************
Engine Setup
******************************************************************************/

let gameLoop = new Loop(updateLoop);
let gameTime = 0;
let gameScreen = new Screen(
  document.getElementById("screen")
  ,256
  ,144
);

/******************************************************************************
Initialization
******************************************************************************/

const GAME_STATES = {
  "load": 0
  ,"start": 1
  ,"play": 2
};
let gameState = GAME_STATES.load;

// Images
const PLAYER_IMAGES = new SpriteSheet("images/players.png", 8, 8);
const PLAYER_PORTRAITS = new SpriteSheet("images/player_portraits.png", 8, 8);
const PET_IMAGES = new SpriteSheet("images/pets.png", 8, 8);
const MOB_IMAGES = new SpriteSheet("images/mobs.png", 8, 8);
const BULLET_IMAGES = new SpriteSheet("images/bullets.png", 16, 16);
const TILE_IMAGES = new SpriteSheet("images/tiles.png", 16, 16);
const FX_IMAGES = new SpriteSheet("images/fx.png", 16, 16);
const ICON_IMAGES = new SpriteSheet("images/icons.png", 16, 16);
const MMBG_IMAGE = new SpriteSheet("images/mainmenu.png", 256, 144);
const MENU_IMAGES = new SpriteSheet("images/menu_backgrounds.png", 256, 144);
const GAME_FONT = new Font("images/font.png", 5, 5);
let imageAim = undefined;
let effectMelee = undefined;
let effectStruck = undefined;

// Audio
const DEFAULT_AUDIO_CHANNELS = 16;
const MELEE_ACTIVATION_SOUNDS = new SoundContainer();
MELEE_ACTIVATION_SOUNDS.load("sounds/attack_melee_0.wav", DEFAULT_AUDIO_CHANNELS, 0.5);
MELEE_ACTIVATION_SOUNDS.load("sounds/attack_melee_1.wav", DEFAULT_AUDIO_CHANNELS, 0.5);
const RANGED_ACTIVATION_SOUNDS = new SoundContainer();
RANGED_ACTIVATION_SOUNDS.load("sounds/attack_ranged_0.wav", DEFAULT_AUDIO_CHANNELS, 0.5);
RANGED_ACTIVATION_SOUNDS.load("sounds/attack_ranged_1.wav", DEFAULT_AUDIO_CHANNELS, 0.25);
RANGED_ACTIVATION_SOUNDS.load("sounds/attack_ranged_2.wav", DEFAULT_AUDIO_CHANNELS, 0.15);
const STRUCK_SOUNDS = new SoundContainer();

// Menus
let mainMenu = undefined;
let teamMenu = undefined;
let gameMenu = undefined;
let pauseMenu = undefined;
let endMenu = undefined;
const MENU_STATES = {
  "main": 0
  ,"team": 1
  ,"game": 2
};
let currentMenu = MENU_STATES.main;
let currentSubMenu = 0;
let uiSelections = {
  "playerId": 1
  ,"ally1Id": 0
  ,"ally2Id": 2
  ,"weaponId": 0
  ,"armorId": 0
  ,"abilityId": 0
  ,"mapId": 1
  ,"levelId": 0
};
let teamMenuCardImages = [];
let teamMenuCardSubtitle = [];

// Game
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

/******************************************************************************
Game Loop
******************************************************************************/

function updateLoop(RAFTS) {
  switch(gameState) {
    case GAME_STATES.load:
      // Update
      if (loadCheck()) {
        afterLoad();
        buildMainMenu();
        gameState = GAME_STATES.start;
      }
      // Draw
      drawLoadScreen();
      break;
    case GAME_STATES.start:
      // Update
      updateStartMenu();
      // Draw
      drawStartMenu();
      break;
    case GAME_STATES.play:
      // Update
      gameTime += 1;
      updateGame();
      // Draw
      drawGame();
      break;
    default:
      //stuff
      break;
  }
  drawDebug();
}
gameLoop.start();