class Menu {
  constructor(menuData) {
    this.pos = new Vector(menuData.pos[0], menuData.pos[1]);
    this.size = new Vector(menuData.size[0], menuData.size[1]);
    this.backgroundImageId = menuData.backgroundImageId;
    this.buttons = [];
    this.texts = [];
    this.images = [];
  };
  update(mousePos, mouseButtons) {
    for (let i = 0; i < this.buttons; i++) {
      //bleh
  };
};

class Button {
  constructor(pos, image, hoverImage) {
    this.pos = new Vector(pos.x, pos.y);
    this.imageId = imageId;
    this.hoverImageId = hoverImageId;
    this.isHovered = false;
  };
};

const MENU_TYPES = [
  {
    "name": "Main Menu"
    ,"pos": [0,0]
    ,"size": [256,144]
    ,"backgroundImageId": 0
    ,"buttons": [
      {
        "name": "startGame"
        ,"pos": [128,72]
      }
    ]
  }
];