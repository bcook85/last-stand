class Camera extends Vector {
  constructor(width, height) {
    super(0, 0);
    this.size = new Vector(width, height);
  };
  center(pos) {
    this.x = pos.x - (this.size.x * 0.5);
    this.y = pos.y - (this.size.y * 0.5);
  };
  isInView(pos, size) {
    if (pos.x + (size.x * 0.5) < this.x) {
      return false;
    }
    if (pos.x - (size.x * 0.5) > this.x + this.size.x) {
      return false;
    }
    if (pos.y + (size.y * 0.5) < this.y) {
      return false;
    }
    if (pos.y - (size.y * 0.5) > this.y + this.size.y) {
      return false;
    }
    return true;
  };
};