class Font {
  constructor(fontData) {
    this.fontSheet = new SpriteSheet(fontData.imageFile, fontData.size[0], fontData.size[1]);
    this.characterSize = new Vector(fontData.size[0], fontData.size[1]);
    this.spaceSize = fontData.spaceSize;
    this.characters = fontData.characters;
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
          ,(i * this.characterSize.x) + (i * this.spaceSize)
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
    let line = 0;
    let maxPerLine = Math.floor(size.x / (this.characterSize.x + this.spaceSize));
    let position = 0;
    let done = false;
    while (!done) {
      let lineText = "";
      // Read maxPerLine worth of characters
      for (let i = 0; i < maxPerLine; i++) {
        if (i + position >= text.length) {
          done = true;
          break;
        } else {
          lineText += text[i + position];
        }
      }
      if (!done) {
        // Back up to a whitespace character
        for (let i = lineText.length - 1; i >= 0; i--) {
          if (!lineText[i].match(/[a-zA-Z0-9']/)) {
            break;
          } else {
            lineText = lineText.slice(0, -1);
            position -= 1;
          }
        }
      }
      // Create lineText image
      let lineImage = this.createImage(lineText);
      ctx.drawImage(
        lineImage
        ,0,0,lineImage.width,lineImage.height
        ,0
        ,Math.floor((line * lineImage.height) + line)
        ,lineImage.width
        ,lineImage.height
      );
      position += maxPerLine;
      line += 1;
    }
    return image;
  };
};