const NEXT_BUTTON_X = 160;
const BACK_BUTTON_X = 96;
const MENU_BUTTONS_Y = 130;

const TEAM_CARD_WIDTH = 64;
const TEAM_CARD_HEIGHT = 36;
const TEAM_CARD_X = 30;
const TEAM_CARD_Y_1 = 44;
const TEAM_CARD_Y_2 = 84;
const TEAM_CARD_SPACE = 4;

const GAME_CARD_WIDTH = 64;
const GAME_CARD_HEIGHT = 36;
const GAME_CARD_X = 56;
const GAME_CARD_Y = 64;
const GAME_CARD_SPACE = 16;

const MENU_TYPES = [
  {
    "name": "Main Menu"
    ,"pos": [0,0]
    ,"size": [256,144]
    ,"backgroundImageId": 0
    ,"buttons": [
      {
        "pos": [128,96]
        ,"text": "Start Game"
      }
      ,{
        "pos": [128,109]
        ,"text": "Load Game"
      }
    ]
    ,"cards": []
    ,"item": {
      "size": [0,0]
      ,"imageSize": [0,0]
    }
  }
  ,{
    "name": "Team Menu"
    ,"pos": [0,0]
    ,"size": [256,144]
    ,"backgroundImageId": 1
    ,"buttons": [
      {// Back
        "pos": [BACK_BUTTON_X, MENU_BUTTONS_Y]
        ,"text": "Back"
      }
      ,{// Next
        "pos": [NEXT_BUTTON_X, MENU_BUTTONS_Y]
        ,"text": "Next"
      }
    ]
    ,"cards": [
      {
        "name": "Player 1 Select"
        ,"title": "Player"
        ,"pos": [
          TEAM_CARD_X + ((TEAM_CARD_SPACE + TEAM_CARD_WIDTH) * 0)
          ,TEAM_CARD_Y_1
        ]
        ,"size": [TEAM_CARD_WIDTH, TEAM_CARD_HEIGHT]
        ,"imageSize": [16, 16]
      }
      ,{
        "name": "Ally 1 Select"
        ,"title": "Ally 1"
        ,"pos": [
          TEAM_CARD_X + ((TEAM_CARD_SPACE + TEAM_CARD_WIDTH) * 1)
          ,TEAM_CARD_Y_1
        ]
        ,"size": [TEAM_CARD_WIDTH, TEAM_CARD_HEIGHT]
        ,"imageSize": [16, 16]
      }
      ,{
        "name": "Ally 2 Select"
        ,"title": "Ally 2"
        ,"pos": [
          TEAM_CARD_X + ((TEAM_CARD_SPACE + TEAM_CARD_WIDTH) * 2)
          ,TEAM_CARD_Y_1
        ]
        ,"size": [TEAM_CARD_WIDTH, TEAM_CARD_HEIGHT]
        ,"imageSize": [16, 16]
      }
      ,{
        "name": "Weapon Select"
        ,"title": "Weapon"
        ,"pos": [
          TEAM_CARD_X + ((TEAM_CARD_SPACE + TEAM_CARD_WIDTH) * 0)
          ,TEAM_CARD_Y_2
        ]
        ,"size": [TEAM_CARD_WIDTH, TEAM_CARD_HEIGHT]
        ,"imageSize": [16, 16]
      }
      ,{
        "name": "Armor Select"
        ,"title": "Armor"
        ,"pos": [
          TEAM_CARD_X + ((TEAM_CARD_SPACE + TEAM_CARD_WIDTH) * 1)
          ,TEAM_CARD_Y_2
        ]
        ,"size": [TEAM_CARD_WIDTH, TEAM_CARD_HEIGHT]
        ,"imageSize": [16, 16]
      }
      ,{
        "name": "Ability Select"
        ,"title": "Ability"
        ,"pos": [
          TEAM_CARD_X + ((TEAM_CARD_SPACE + TEAM_CARD_WIDTH) * 2)
          ,TEAM_CARD_Y_2
        ]
        ,"size": [TEAM_CARD_WIDTH, TEAM_CARD_HEIGHT]
        ,"imageSize": [16, 16]
      }
    ]
    ,"item": {
      "size": [192, 64]
      ,"imageSize": [64, 64]
    }
  }
  ,{
    "name": "Game Menu"
    ,"pos": [0,0]
    ,"size": [256,144]
    ,"backgroundImageId": 2
    ,"buttons": [
      {// Back
        "pos": [BACK_BUTTON_X, MENU_BUTTONS_Y]
        ,"text": "Back"
      }
      ,{// Next
        "pos": [NEXT_BUTTON_X, MENU_BUTTONS_Y]
        ,"text": "Start"
      }
    ]
    ,"cards": [
      {
        "name": "Map Select"
        ,"title": "Map"
        ,"subtitle": ""
        ,"pos": [
          GAME_CARD_X + ((GAME_CARD_SPACE + GAME_CARD_WIDTH) * 0)
          ,GAME_CARD_Y
        ]
        ,"size": [GAME_CARD_WIDTH, GAME_CARD_HEIGHT]
        ,"imageSize": [16, 16]
      }
      ,{
        "name": "Difficulty Select"
        ,"title": "Difficulty"
        ,"subtitle": ""
        ,"pos": [
          GAME_CARD_X + ((GAME_CARD_SPACE + GAME_CARD_WIDTH) * 1)
          ,GAME_CARD_Y
        ]
        ,"size": [GAME_CARD_WIDTH, GAME_CARD_HEIGHT]
        ,"imageSize": [16, 16]
      }
    ]
    ,"item": {
      "size": [192, 64]
      ,"imageSize": [64, 64]
    }
  }
];