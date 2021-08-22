class Screen {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.mousePos = [0,0];
    this.mouseButtons = [false, false];
    // Stop default actions
    this.canvas.oncontextmenu = () => { return false; };
    this.canvas.onselectstart = () => { return false; };
    // Automatically re-size game canvas
    window.addEventListener(
      "resize", () => { this.autoFullscreen(); }
      ,false
    );
    window.addEventListener(
      "orientationchange", () => { this.autoFullscreen(); }
      ,false
    );
    this.autoFullscreen();
    // Mouse Controls
    this.canvas.addEventListener(
      "mousemove", (e) => {
        let canvasRect = this.canvas.getBoundingClientRect();
        let scaleX = this.canvas.width / canvasRect.width;
        let scaleY = this.canvas.height / canvasRect.height;
        this.mousePos[0] = Math.min(Math.max(Math.floor((e.clientX - canvasRect.left) * scaleX), 0), this.width);
        this.mousePos[1] = Math.min(Math.max(Math.floor((e.clientY - canvasRect.top) * scaleY), 0), this.height);
      }
      ,false
    );
    this.canvas.addEventListener(
      "mousedown", (e) => {
        e.preventDefault();
        if (e.button === 0) {
          this.mouseButtons[0] = true;
        } else if (e.button === 2) {
          this.mouseButtons[1] = true;
        }
      }
      ,false
    );
    this.canvas.addEventListener(
      "mouseup", (e) => {
        e.preventDefault();
        if (e.button === 0) {
          this.mouseButtons[0] = false;
        } else if (e.button === 2) {
          this.mouseButtons[1] = false;
        }
      }
      ,false
    );
  };
  textStyle(font, alignment, color) {
    this.ctx.font = font;
    this.ctx.textAlign = alignment;
    this.ctx.fillStyle = color;
  };
  drawText(text, x, y, font, alignment, color) {
    this.ctx.font = font;
    this.ctx.textAlign = alignment;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  };
  drawBall(x, y, r, c) {
    this.ctx.fillStyle = c;
    this.ctx.beginPath();
    this.ctx.arc(
      Math.floor(x)
      ,Math.floor(y)
      ,r
      ,0
      ,Math.PI * 2
    );
    this.ctx.fill();
  };
  drawLine(x1, y1, x2, y2, c, w=1) {
    this.ctx.strokeStyle = c;
    this.ctx.lineWidth = w;
    this.ctx.beginPath();
    this.ctx.moveTo(Math.floor(x1), Math.floor(y1));
    this.ctx.lineTo(Math.floor(x2), Math.floor(y2));
    this.ctx.stroke();
  };
  clearScreen(color="rgb(0,0,0)") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  };
  autoFullscreen() {
    let newWidth = Math.floor(this.canvas.parentElement.clientWidth * 0.985);
    let newHeight = Math.floor(window.innerHeight * 0.985);
    let aspectRatio = this.canvas.width / this.canvas.height;
    if (newWidth / newHeight > aspectRatio) {//wide
      newWidth = Math.floor(newHeight * aspectRatio);
      this.canvas.style.height = newHeight + "px";
      this.canvas.style.width = newWidth + "px";
    }
    else {//tall
      newHeight = Math.floor(newWidth / aspectRatio);
      this.canvas.style.width = newWidth + "px";
      this.canvas.style.height = newHeight + "px";
    }
  };
};
