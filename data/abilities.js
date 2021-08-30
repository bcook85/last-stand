/******************************************************************************
Ability Data Types
******************************************************************************/

const ABILITY_TARGETS = {
  "self": 0
  ,"bullet": 1
  ,"cone": 2
  ,"pbAOE": 3
  ,"targetedAOE": 4
};

const ABILITY_CATEGORIES = {
  "attack": 0
  ,"heal": 1
  ,"buff": 2
  ,"summon": 3
  ,"teleport": 4
};


/******************************************************************************
Ability Definitions
******************************************************************************/

const PLAYER_ABILITIES = [
  [// 0 for PLAYER_TYPES[0]
    {//0
      "name": "Self heal"
      ,"description": "Testing out abilities and healing, specifically."
      ,"iconImageId": 4
      ,"effectImageId": 0
      ,"cooldown": 1000
      ,"cost": 25
      ,"target": ABILITY_TARGETS.self
      ,"category": ABILITY_CATEGORIES.heal
      ,"data": {
        "amount": 100
      }
    }
  ]
  ,[// 1 for PLAYER_TYPES[1]
    {//0
      "name": "Boneheadz"
      ,"description": "Summon 2 skeletons to fight until death. They're tougher than you, but that's not saying much. MAX 2"
      ,"iconImageId": 5
      ,"effectImageId": 0
      ,"cooldown": 3000
      ,"cost": 35
      ,"target": ABILITY_TARGETS.self
      ,"category": ABILITY_CATEGORIES.summon
      ,"data": {
        "petId": 0
        ,"count": 2
      }
    }
  ]
  ,[// 2 for PLAYER_TYPES[2]
    {//0
      "name": "Teleport"
      ,"description": "Testing out abilities and teleporting, specifically."
      ,"iconImageId": 6
      ,"effectImageId": 0
      ,"cooldown": 3000
      ,"cost": 15
      ,"target": ABILITY_TARGETS.self
      ,"category": ABILITY_CATEGORIES.teleport
      ,"data": {}
    }
  ]
  ,[// 3 for PLAYER_TYPES[3]
    {//0
      "name": "Sick Blast"
      ,"description": "Testing out abilities and PBAOEs, specifically."
      ,"iconImageId": 7
      ,"effectImageId": 0
      ,"cooldown": 5000
      ,"cost": 30
      ,"target": ABILITY_TARGETS.pbAOE
      ,"category": ABILITY_CATEGORIES.attack
      ,"data": {
        "damage": 25
        ,"radius": 3// * unit.radius
      }
    }
  ]
];

const MOB_ABILITIES = [
  {//0, empty ability
  }
];