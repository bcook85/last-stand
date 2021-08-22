class Effect extends Ball {
  constructor(pos, radius, image, size) {
    super(pos, radius);
    this.image = image;
    this.size = new Vector(size.x, size.y);
    this.dir = 0;
    this.startTime = 0;
    this.duration = 0;
    this.alive = true;
  };
  update(gameTime) {
    if (gameTime >= this.startTime + this.duration) {
      this.alive = false;
    }
  };
  draw(ctx, scale, offset) {
    ctx.save();
    ctx.translate(
      Math.floor((this.pos.x * scale) - offset.x)
      ,Math.floor((this.pos.y * scale) - offset.y)
    );
    // Facing direction
    ctx.rotate(this.dir);
    // ctx.rotate(this.dir + (Math.PI * 0.25));
    ctx.drawImage(
      this.image
      ,0,0,this.image.width,this.image.height
      ,-(this.size.x * 0.5)
      ,-(this.size.y * 0.5)
      ,this.size.x,this.size.y
    );
    ctx.restore();
  };
};