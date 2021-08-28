
const BUTTON_TEXT_PADDING = 2;
const BORDER_SIZE = 1;

class Font {
  constructor(file, width, height) {
    this.fontSheet = new SpriteSheet(file, width, height);
    this.characterSize = new Vector(width, height);
    this.characters = {
      "A": 0
      ,"B": 1
      ,"C": 2
      ,"D": 3
      ,"E": 4
      ,"F": 5
      ,"G": 6
      ,"H": 7
      ,"I": 8
      ,"J": 9
      ,"K": 10
      ,"L": 11
      ,"M": 12
      ,"N": 13
      ,"O": 14
      ,"P": 15
      ,"Q": 16
      ,"R": 17
      ,"S": 18
      ,"T": 19
      ,"U": 20
      ,"V": 21
      ,"W": 22
      ,"X": 23
      ,"Y": 24
      ,"Z": 25
      ,"0": 26
      ,"1": 27
      ,"2": 28
      ,"3": 29
      ,"4": 30
      ,"5": 31
      ,"6": 32
      ,"7": 33
      ,"8": 34
      ,"9": 35
      ,".": 36
      ,",": 37
      ,"!": 38
      ,"-": 39
      ,":": 40
      ," ": 41
    };
  };
};
// const MENU_FONT = new Font("images/font.png", 5, 5);

class MenuButton {
  constructor(pos, text, font) {
    this.pos = new Vector(pos.x, pos.y);
    this.size = undefined;
    this.isHovered = false;
    this.text = text;
    this.font = font;
    MenuButton.buildImage(this.image, text, font);
    MenuButton.buildImage(this.hoverImage, text, font);
  };
  static buildImage(image, text, font) {
    image = document.createElement("canvas");
    image.width =
      (BUTTON_TEXT_PADDING * 2)
      + (BORDER_SIZE * 2)
      + (text.length * font.characters.A.width);
    image.height =
      (BUTTON_TEXT_PADDING * 2)
      + (BORDER_SIZE * 2)
      + font.characters.A.height;
    let ctx = image.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    // Background Color: Black
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, image.width, image.height);
    // Border
    // Text
    for (let i = 0; i < text.length; i++) {
      let char = font.characters[text[i].toUpperCase()];poo
      let aCharacter = font.fontSheet.images[char];
      ctx.drawImage(
        0,0,font.characterSize.x,font.characterSize.y
        ,BORDER_SIZE + BUTTON_TEXT_PADDING + (i * font.characterSize.x)
        ,BORDER_SIZE + BUTTON_TEXT_PADDING
        ,font.characterSize.x
        ,font.characterSize.y
      );
    }
  };
};

// let btn = new MenuButton(new Vector(0, 0), "test", MENU_FONT);

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
    }
  };
};