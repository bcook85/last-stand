class SpriteSheet {
  constructor(file, frameWidth, frameHeight) {
    this.file = file;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.framesX = 0;
    this.framesY = 0;
    this.images = [];
    this.loaded = false;
    // Load image, separate into frames
    let tempImage = new Image();
    tempImage.ic = this;
    tempImage.onload = function() {
      console.log(`Image Loaded: ${file}`);
      this.ic.framesX = Math.floor(this.width / this.ic.frameWidth);
      this.ic.framesY = Math.floor(this.height / this.ic.frameHeight);
      for (let y = 0; y < this.ic.framesY; y++) {
        for (let x = 0; x < this.ic.framesX; x++) {
          let tempCanvas = document.createElement("canvas");
          tempCanvas.width = this.ic.frameWidth;
          tempCanvas.height = this.ic.frameHeight;
          let tempCtx = tempCanvas.getContext("2d");
          tempCtx.imageSmoothingEnabled = false;
          tempCtx.drawImage(
            this
            ,x * this.ic.frameWidth, y * this.ic.frameHeight
            ,this.ic.frameWidth,this.ic.frameHeight
            ,0,0
            ,tempCanvas.width,tempCanvas.height
          );
          this.ic.images.push(tempCanvas);
          // console.log(`\tParsed Image: (${x},${y}).`);
        }
      }
      this.ic.loaded = true;
    };
    tempImage.src = file;
  };
};