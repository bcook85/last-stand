const PLAYER_SPAWN_TILE_ID = 0;
const MOB_SPAWN_TILE_ID = 1;

class Map {
  constructor(mapData=undefined) {
    this.name = "New Map";
    this.tileSize = 16;
    this.width = 16;
    this.height = 16;
    this.tiles = [];
    this.grid = [];
    this.players = [];
    this.spawns = [];
    this.image = undefined;
    if (mapData) {
      this.name = mapData.name;
      this.tileSize = mapData.tileSize;
      this.width = mapData.width;
      this.height = mapData.height;
      this.tiles = mapData.tiles;
      this.grid = mapData.grid;
    }
  }
  isWall(x, y) {
    let fx = Math.floor(x);
    let fy = Math.floor(y);
    if (fx >= 0 && fx < this.width && fy >= 0 && fy < this.height) {
      if (this.grid[fx][fy] == 0) {
        return false;
      }
    }
    return true;
  };
  buildImage(tiles) {
    this.image = document.createElement("canvas");
    this.image.width = this.width * this.tileSize;
    this.image.height = this.height * this.tileSize;
    let ctx = this.image.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        // Player Spawn Point
        if (this.tiles[x][y] == PLAYER_SPAWN_TILE_ID) {
          this.players = [x,y];
        }
        // Mob Spawn Points
        if (this.tiles[x][y] == MOB_SPAWN_TILE_ID) {
          this.spawns.push([x,y]);
        }
        ctx.drawImage(
          tiles.images[this.tiles[x][y]]
          ,0,0
          ,tiles.images[this.tiles[x][y]].width
          ,tiles.images[this.tiles[x][y]].height
          ,x * this.tileSize
          ,y * this.tileSize
          ,this.tileSize
          ,this.tileSize
        );
      }
    }
  };
  draw(ctx, offset, size) {
    ctx.drawImage(
      this.image
      ,Math.floor(offset.x)
      ,Math.floor(offset.y)
      ,size.x
      ,size.y
      ,0,0
      ,size.x
      ,size.y
    );
  };
};