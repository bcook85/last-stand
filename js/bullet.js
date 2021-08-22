class Bullet extends Ball {
  constructor(pos, radius, image, damage, owner) {
    super(pos, radius);
    this.alive = true;
    this.multiHit = false;
    this.dir = 0;
    this.image = image;
    this.size = new Vector(this.image.width, this.image.height);
    this.speed = 0.15;
    this.damage = damage;
    this.owner = owner;
  };
  update(targets, grid) {
    // Grid check
    if (Ball.collidesGrid(this, grid)) {
      this.alive = false;
    }
    // Update Position
    this.pos = this.pos.add(this.vel);
    // Hit Check
    for (let i = 0; i < targets.length; i++) {
      if (targets[i].alive && this.pos.getDistance(targets[i].pos) < this.radius + targets[i].radius) {
        targets[i].receiveDamage(this.damage);
        if (!this.multiHit) {
          this.alive = false;
          return;
        }
      }
    }
  };
  draw(ctx, scale, offset) {
    ctx.save();
    ctx.translate(
      Math.floor((this.pos.x * scale) - offset.x)
      ,Math.floor((this.pos.y * scale) - offset.y)
    );
    // Facing direction
    ctx.rotate(this.dir + (Math.PI * 0.25));
    ctx.drawImage(
      this.image
      ,0,0,this.image.width,this.image.height
      ,-(this.size.x * 0.5)
      ,-(this.size.y * 0.5)
      ,this.size.x,this.size.y
    );
    ctx.restore();
  };
}