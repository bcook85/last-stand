const PLAYER_WEAPONS = [
  [// 0 for PLAYER_TYPES[0]
    { // 0
      "name": "Sword of Hitting Things"
      ,"imageId": 0
      ,"description": "And stuff! A solid choice for brave heroes. Very brave."
      ,"damage": 25
      ,"attackSpeed": 500
      ,"range": 2.0//2 * radius
      ,"isMelee": true
      ,"multiHit": false
      ,"bulletImageId": undefined
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
      "name": "Staff of Blasty"
      ,"imageId": 1
      ,"description": "It shoots things with magic stuff. 4/5 dentists recommended."
      ,"damage": 5
      ,"attackSpeed": 250
      ,"range": 12.0//6 * radius
      ,"isMelee": false
      ,"multiHit": false
      ,"bulletImageId": 0
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
      "name": "Ridonkulated Chain Bow"
      ,"imageId": 2
      ,"description": "Death by 1,000 papercuts. CAUTION: Aim away from face."
      ,"damage": 2.5
      ,"attackSpeed": 50
      ,"range": 12.0//6 * radius
      ,"isMelee": false
      ,"multiHit": false
      ,"bulletImageId": 1
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
];

const MOB_WEAPONS = [
  { // 0
    "name": "Light Melee"
    ,"imageId": undefined
    ,"description": ""
    ,"damage": 5
    ,"attackSpeed": 750
    ,"range": 2.0//6 * radius
    ,"isMelee": true
    ,"multiHit": false
    ,"bulletImageId": undefined
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
    "name": "Medium Melee"
    ,"imageId": undefined
    ,"description": ""
    ,"damage": 15
    ,"attackSpeed": 1000
    ,"range": 2.0//6 * radius
    ,"isMelee": true
    ,"multiHit": false
    ,"bulletImageId": undefined
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
    "name": "Heavy Melee"
    ,"imageId": undefined
    ,"description": ""
    ,"damage": 20
    ,"attackSpeed": 1500
    ,"range": 2.0//6 * radius
    ,"isMelee": true
    ,"multiHit": false
    ,"bulletImageId": undefined
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
    "name": "Boss Melee"
    ,"imageId": undefined
    ,"description": ""
    ,"damage": 20
    ,"attackSpeed": 1000
    ,"range": 2.5//6 * radius
    ,"isMelee": true
    ,"multiHit": true
    ,"bulletImageId": undefined
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
    "name": "Light Ranged"
    ,"imageId": undefined
    ,"description": ""
    ,"damage": 5
    ,"attackSpeed": 750
    ,"range": 12.0//6 * radius
    ,"isMelee": false
    ,"multiHit": false
    ,"bulletImageId": 1
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
    "name": "Medium Ranged"
    ,"imageId": undefined
    ,"description": ""
    ,"damage": 15
    ,"attackSpeed": 1000
    ,"range": 4.0//6 * radius
    ,"isMelee": false
    ,"multiHit": false
    ,"bulletImageId": 1
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
  ,{ // 6
    "name": "Heavy Ranged"
    ,"imageId": undefined
    ,"description": ""
    ,"damage": 20
    ,"attackSpeed": 1500
    ,"range": 4.0//6 * radius
    ,"isMelee": false
    ,"multiHit": false
    ,"bulletImageId": 1
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
  ,{ // 7
    "name": "Boss Ranged"
    ,"imageId": undefined
    ,"description": ""
    ,"damage": 20
    ,"attackSpeed": 1000
    ,"range": 5.0//6 * radius
    ,"isMelee": false
    ,"multiHit": true
    ,"bulletImageId": 1
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