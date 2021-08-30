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
  getPotentialWidth(text) {
    return (text.length * this.characterSize.x) + text.length - 1;
  };
  createImage(text) {
    let image = document.createElement("canvas");
    image.width = (text.length * this.characterSize.x) + text.length - 1;
    image.height = this.characterSize.y;
    let ctx = image.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    // Text
    for (let i = 0; i < text.length; i++) {
      let char = this.characters[text[i].toUpperCase()];
      if (char !== undefined) {
        let aCharacter = this.fontSheet.images[char];
        ctx.drawImage(
          aCharacter
          ,0,0,this.characterSize.x,this.characterSize.y
          ,(i * this.characterSize.x) + i
          ,0
          ,this.characterSize.x
          ,this.characterSize.y
        );
      }
    }
    return image;
  };
  createMultiLineImage(text, size) {
    let image = document.createElement("canvas");
    image.width = size.x;
    image.height = size.y;
    let ctx = image.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    // Text
    let lastSpace = -1;
    let currentX = 0;
    let maxPerLine = Math.floor(size.x / (this.characterSize.x + text.length));
    let lines = [];
    let line = "";
    while (true) {
      line += text[currentX];
      if (line.length >= maxPerLine) {
        lines.push(this.createImage(line));
        line = "";
      }
      currentX += 1;
      if (currentX >= text.length) {
        lines.push(this.createImage(line));
        break;
      }
    }
    // this is so wrong
  };
};