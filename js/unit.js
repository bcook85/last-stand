class Unit extends Ball {
  constructor(setup, pos, radius, images) {
    super(pos, radius * setup.unitData.imageScale);
    // Position
    this.dir = Math.random() * Math.PI * 2;
    this.movement = new Vector(0, 0);
    // Stats
    this.playerId = setup.playerId;
    this.alive = true;
    this.health = setup.unitData.health;
    this.health += setup.armorData.buffs.health;
    this.health += setup.weaponData.buffs.health;
    this.hp = this.health;
    this.energy = setup.unitData.energy;
    this.energy += setup.armorData.buffs.energy;
    this.energy += setup.weaponData.buffs.energy;
    this.nrg = this.energy;
    this.hpRegen = 2;
    this.hpRegen += setup.armorData.buffs.hpRegen
    this.hpRegen += setup.weaponData.buffs.hpRegen;
    this.nrgRegen = 1;
    this.nrgRegen += setup.armorData.buffs.nrgRegen
    this.nrgRegen += setup.weaponData.buffs.nrgRegen;
    this.lastRegen = 0;
    this.moveSpeed = setup.unitData.moveSpeed
      + (setup.unitData.moveSpeed * setup.armorData.buffs.moveSpeed)
      + (setup.unitData.moveSpeed * setup.weaponData.buffs.moveSpeed);
    this.defense = setup.armorData.defense;
    this.defense += setup.weaponData.buffs.defense
    // Draw
    this.images = {
      "unit": images.unit
      ,"portrait": images.portrait
      ,"shadow": images.shadow
      ,"downed": images.downed
    };
    this.flipImage = false;
    this.imageScaled = new Vector(
      Math.floor(this.images.unit.width * setup.unitData.imageScale)
      ,Math.floor(this.images.unit.height * setup.unitData.imageScale)
    );
    // Attack
    this.lastAttack = 0;
    this.weaponId = setup.weaponId;
    this.attack = {
      "damage": setup.weaponData.damage
      ,"attackSpeed": setup.weaponData.attackSpeed
      ,"range": setup.weaponData.range * this.radius
      ,"isMelee": setup.weaponData.isMelee
      ,"isMultiHit": setup.weaponData.multiHit
      ,"bulletImageId": setup.weaponData.bulletImageId
      ,"soundId": setup.weaponData.activationSoundId
    };
    // Ability
    this.lastAbility = 0;
    if (setup.abilityData.name === undefined) {
      this.abilityId = undefined;
      this.abilityIconId = undefined;
      this.abilityEffectId = undefined;
      this.ability = undefined;
    } else {
      this.lastAbility = -setup.abilityData.cooldown;
      this.abilityId = setup.abilityId;
      this.abilityIconId = setup.abilityData.iconImageId;
      this.abilityEffectId = setup.abilityData.effectImageId;
      this.ability = {
        "name": setup.abilityData.name
        ,"cooldown": setup.abilityData.cooldown
        ,"cost": setup.abilityData.cost
        ,"target": setup.abilityData.target
        ,"category": setup.abilityData.category
        ,"data": setup.abilityData.data
      };
    }
    // Armor
    this.armorId = setup.armorId;
    this.armor = {};
    // Accessory
    this.accessory = {};
    // AI
    this.aiLastUpdate = 0;
    this.aiUpdateTime = 50;// milliseconds
    this.ai = undefined;
    this.targetId = -1;
    this.path = [];
    this.pathCurrentNode = -1;
    this.pathLastUpdate = 0;
    this.pathUpdateTime = 500;
    this.owner = -1;
  };
  receiveDamage(amount) {
    let wasKilled = false;
    this.hp -= amount * (Math.max((100 - this.defense), 15) * 0.01);
    if (this.hp <= 0) {
      this.alive = false;
      this.hasCollision = false;
      this.hp = 0;
      wasKilled = true;
    } else if (this.hp > this.health) {
      this.hp = this.health;
    }
    return wasKilled;
  };
  gainHP(amount) {
    if (this.alive) {
      this.hp += amount;
      if (this.hp > this.health) {
        this.hp = this.health;
      }
    }
  };
  gainNRG(amount) {
    if (this.alive) {
      this.nrg += amount;
      if (this.nrg > this.energy) {
        this.nrg = this.energy;
      }
    }
  };
  useNRG(amount) {
    let enoughEnergy = true;
    this.nrg -= amount;
    if (this.nrg < 0) {
      enoughEnergy = false;
      this.nrg = 0;
    }
    return enoughEnergy;
  };
  update(grid, allies, enemies) {
    if (this.hp > 0) {
      // Set Movement Speed
      this.vel = this.vel.normalize().add(this.movement).mul(this.moveSpeed);
      // Collision
      Ball.resolveGridCollisions(this, grid);
      Ball.vsBalls(this, allies.concat(enemies));
      Ball.resolveGridCollisions(this, grid);
      // Update Position
      this.pos = this.pos.add(this.vel);
      // Reset Velocity
      this.vel = new Vector(0, 0);
    }

    // Facing
    if (this.dir >= Math.PI * 1.5 || this.dir < Math.PI * 0.5) {
      this.flipImage = false;
    } else {
      this.flipImage = true;
    }
  };
  regen(gameTime) {
    if (gameTime >= this.lastRegen + 1000) {
      this.lastRegen = gameTime;
      this.gainHP(this.hpRegen);
      this.gainNRG(this.nrgRegen);
    }
  };
  drawShadow(ctx, scale, offset) {
    ctx.drawImage(
      this.images.shadow
      ,0,0,this.images.shadow.width,this.images.shadow.height
      ,Math.floor((this.pos.x * scale) - (this.imageScaled.x * 0.5) - offset.x)
      ,Math.floor((this.pos.y * scale) - offset.y)// top of shadow is half height of unit
      ,this.imageScaled.x,this.imageScaled.y
    );
  };
  drawImage(ctx, scale, offset) {
    ctx.save();
    ctx.translate(
      Math.floor((this.pos.x * scale) - offset.x)
      ,Math.floor((this.pos.y * scale) - offset.y)
    );
    // Facing direction
    if (this.flipImage) {
      ctx.scale(-1, 1);
    }
    if (this.alive) {
      ctx.drawImage(
        this.images.unit
        ,0,0,this.images.unit.width,this.images.unit.height
        ,-(this.imageScaled.x * 0.5)
        ,-(this.imageScaled.y * 0.5)
        ,this.imageScaled.x,this.imageScaled.y
      );
    } else if (this.images.downed !== undefined) {
      ctx.drawImage(
        this.images.downed
        ,0,0,this.images.downed.width,this.images.downed.height
        ,-(this.imageScaled.x * 0.5)
        ,-(this.imageScaled.y * 0.5)
        ,this.imageScaled.x,this.imageScaled.y
      );
    }
    ctx.restore();
  };
};