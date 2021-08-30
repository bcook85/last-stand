const PLAYER_WEAPONS = [
  [// 0 for PLAYER_TYPES[0]
    { // 0
      "name": "H.T."
      ,"iconImageId": 0
      ,"description": "Sword of Hitting Things: And stuff! A solid choice for brave heroes. Very brave."
      ,"damage": 25
      ,"attackSpeed": 750
      ,"range": 2.0//2 * radius
      ,"isMelee": true
      ,"multiHit": false
      ,"bulletImageId": undefined
      ,"activationSoundId": 0
      ,"buffs": {
        "health": 0
        ,"hpRegen": 0.0
        ,"energy": 0
        ,"nrgRegen": 1.0
        ,"defense": 0
        ,"damage": 0.0
        ,"attackSpeed": 0.0
        ,"moveSpeed": 0.0
      }
    }
  ]
  ,[// 1 for PLAYER_TYPES[1]
    { // 0
      "name": "Globs"
      ,"iconImageId": 1
      ,"description": "Staff of Globs: It shoots things with magic stuff. 4/5 dentists recommended."
      ,"damage": 5
      ,"attackSpeed": 500
      ,"range": 12.0//6 * radius
      ,"isMelee": false
      ,"multiHit": false
      ,"bulletImageId": 0
      ,"activationSoundId": 0
      ,"buffs": {
        "health": 0
        ,"hpRegen": 0.0
        ,"energy": 0
        ,"nrgRegen": 1.5
        ,"defense": 0
        ,"damage": 0.0
        ,"attackSpeed": 0.0
        ,"moveSpeed": 0.0
      }
    }
  ]
  ,[// 2 for PLAYER_TYPES[2]
    { // 0
      "name": "Ridonkulated"
      ,"iconImageId": 2
      ,"description": "The Ridonkulated Chain Bow: Death by 1,000 papercuts. CAUTION: Aim away from face."
      ,"damage": 2.5
      ,"attackSpeed": 50
      ,"range": 12.0//6 * radius
      ,"isMelee": false
      ,"multiHit": false
      ,"bulletImageId": 1
      ,"activationSoundId": 1
      ,"buffs": {
        "health": 0
        ,"hpRegen": 0.0
        ,"energy": 0
        ,"nrgRegen": 0.5
        ,"defense": 0
        ,"damage": 0.0
        ,"attackSpeed": 0.0
        ,"moveSpeed": 0.0
      }
    }
  ]
  ,[// 3 for PLAYER_TYPES[3]
    { // 0
      "name": "Special Sauce"
      ,"iconImageId": 3
      ,"description": "Syrigne of Special Sauce: Just don't get stuck with it. Like really don't."
      ,"damage": 14
      ,"attackSpeed": 250
      ,"range": 2.0//6 * radius
      ,"isMelee": true
      ,"multiHit": false
      ,"bulletImageId": 0
      ,"activationSoundId": 1
      ,"buffs": {
        "health": 0
        ,"hpRegen": 1.0
        ,"energy": 0
        ,"nrgRegen": 1.0
        ,"defense": 0
        ,"damage": 0.0
        ,"attackSpeed": 0.0
        ,"moveSpeed": 0.0
      }
    }
  ]
];

const PET_WEAPONS = [
  { // 0
    "name": "Medium Melee"
    ,"iconImageId": undefined
    ,"description": ""
    ,"damage": 15
    ,"attackSpeed": 750
    ,"range": 2.0//6 * radius
    ,"isMelee": true
    ,"multiHit": false
    ,"bulletImageId": undefined
    ,"activationSoundId": 0
    ,"buffs": {
      "health": 0
      ,"hpRegen": 0.0
      ,"energy": 0
      ,"nrgRegen": 0.0
      ,"defense": 0
      ,"damage": 0.0
      ,"attackSpeed": 0.0
      ,"moveSpeed": 0.0
    }
  }
]

const MOB_WEAPONS = [
  { // 0
    "name": "Goblin Punch"
    ,"iconImageId": undefined
    ,"description": ""
    ,"damage": 5
    ,"attackSpeed": 750
    ,"range": 2.0//6 * radius
    ,"isMelee": true
    ,"multiHit": false
    ,"bulletImageId": undefined
    ,"activationSoundId": 1
    ,"buffs": {
      "health": 0
      ,"hpRegen": 0.0
      ,"energy": 0
      ,"nrgRegen": 0.0
      ,"defense": 0
      ,"damage": 0.0
      ,"attackSpeed": 0.0
      ,"moveSpeed": 0.0
    }
  }
  ,{ // 1
    "name": "Cyclops Swipe"
    ,"iconImageId": undefined
    ,"description": ""
    ,"damage": 15
    ,"attackSpeed": 1000
    ,"range": 2.0//6 * radius
    ,"isMelee": true
    ,"multiHit": false
    ,"bulletImageId": undefined
    ,"activationSoundId": 0
    ,"buffs": {
      "health": 0
      ,"hpRegen": 0.0
      ,"energy": 0
      ,"nrgRegen": 0.0
      ,"defense": 0
      ,"damage": 0.0
      ,"attackSpeed": 0.0
      ,"moveSpeed": 0.0
    }
  }
  ,{ // 2
    "name": "Ninja Bow"
    ,"iconImageId": undefined
    ,"description": ""
    ,"damage": 5
    ,"attackSpeed": 750
    ,"range": 12.0//6 * radius
    ,"isMelee": false
    ,"multiHit": false
    ,"bulletImageId": 1
    ,"activationSoundId": 1
    ,"buffs": {
      "health": 0
      ,"hpRegen": 0.0
      ,"energy": 0
      ,"nrgRegen": 0.0
      ,"defense": 0
      ,"damage": 0.0
      ,"attackSpeed": 0.0
      ,"moveSpeed": 0.0
    }
  }
  ,{ // 3
    "name": "Slime Spit"
    ,"iconImageId": undefined
    ,"description": ""
    ,"damage": 15
    ,"attackSpeed": 1000
    ,"range": 12.0//6 * radius
    ,"isMelee": false
    ,"multiHit": false
    ,"bulletImageId": 2
    ,"activationSoundId": 0
    ,"buffs": {
      "health": 0
      ,"hpRegen": 0.0
      ,"energy": 0
      ,"nrgRegen": 0.0
      ,"defense": 0
      ,"damage": 0.0
      ,"attackSpeed": 0.0
      ,"moveSpeed": 0.0
    }
  }
  ,{ // 4
    "name": "Laser Shot"
    ,"iconImageId": undefined
    ,"description": ""
    ,"damage": 2
    ,"attackSpeed": 200
    ,"range": 10.0//6 * radius
    ,"isMelee": false
    ,"multiHit": false
    ,"bulletImageId": 3
    ,"activationSoundId": 2
    ,"buffs": {
      "health": 0
      ,"hpRegen": 0.0
      ,"energy": 0
      ,"nrgRegen": 0.0
      ,"defense": 0
      ,"damage": 0.0
      ,"attackSpeed": 0.0
      ,"moveSpeed": 0.0
    }
  }
  ,{ // 5
    "name": "Banana Kick"
    ,"iconImageId": undefined
    ,"description": ""
    ,"damage": 25
    ,"attackSpeed": 750
    ,"range": 2.0//6 * radius
    ,"isMelee": true
    ,"multiHit": false
    ,"bulletImageId": undefined
    ,"activationSoundId": 1
    ,"buffs": {
      "health": 0
      ,"hpRegen": 0.0
      ,"energy": 0
      ,"nrgRegen": 0.0
      ,"defense": 0
      ,"damage": 0.0
      ,"attackSpeed": 0.0
      ,"moveSpeed": 0.0
    }
  }
];