class Menu {
  constructor(menuData, bgImage, font) {
    this.pos = new Vector(menuData.pos[0], menuData.pos[1]);
    this.size = new Vector(menuData.size[0], menuData.size[1]);
    this.bgImage = bgImage;
    this.showItemList = false;
    this.font = font;

    // Config
    this.borderSize = 1;
    this.spacing = 2;

    // Objects
    this.buttons = [];
    for (let i = 0; i < menuData.buttons.length; i++) {
      this.buildButton(menuData.buttons[i]);
    }
    this.cards = [];
    for (let i = 0; i < menuData.cards.length; i++) {
      this.buildCard(menuData.cards[i]);
    }
    this.itemSize = new Vector(menuData.item.size[0], menuData.item.size[1]);
    this.itemImageSize = new Vector(menuData.item.imageSize[0], menuData.item.imageSize[1]);
    this.items = [];
    this.scrollPosition = 0;
    this.maxScroll = 0;
    this.minScroll = 0;
    this.scrollAmount = 10;
  };
  // Build
  buildButton(buttonData) {
    // Create Text Image
    let textImage = this.font.createImage(buttonData.text);
    // Button Image
    let buttonImage = document.createElement("canvas");
    buttonImage.width =
      (this.spacing * 2)
      + (this.borderSize * 2)
      + textImage.width;
    buttonImage.height =
      (this.spacing * 2)
      + (this.borderSize * 2)
      + textImage.height;
    let ctx = buttonImage.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      textImage
      ,0,0,textImage.width,textImage.height
      ,this.borderSize + this.spacing
      ,this.borderSize + this.spacing
      ,textImage.width
      ,textImage.height
    );
    let newButton = {
      "pos": new Vector(
        Math.floor(buttonData.pos[0] - (buttonImage.width * 0.5))
        ,Math.floor(buttonData.pos[1] - (buttonImage.height * 0.5))
      )
      ,"size": new Vector(buttonImage.width, buttonImage.height)
      ,"image": buttonImage
      ,"isHover": false
    };
    this.buttons.push(newButton);
  };
  buildCard(cardData) {
    // Card Image
    let cardImage = document.createElement("canvas");
    cardImage.width = cardData.size[0];
    cardImage.height = cardData.size[1];
    let ctx = cardImage.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    let currentY = this.borderSize + this.spacing;
    // Title
    let titleImage = this.font.createImage(cardData.title);
    ctx.drawImage(
      titleImage
      ,0,0,titleImage.width,titleImage.height
      ,Math.floor((cardImage.width * 0.5) - (titleImage.width * 0.5))
      ,currentY
      ,titleImage.width
      ,titleImage.height
    );
    currentY += titleImage.height + this.spacing;
    // Card Image
    ctx.drawImage(
      cardData.image
      ,0,0,cardData.image.width,cardData.image.height
      ,Math.floor((cardImage.width * 0.5) - (cardData.imageSize[0] * 0.5))
      ,currentY
      ,cardData.imageSize[0]
      ,cardData.imageSize[1]
    );
    currentY += cardData.imageSize[1] + this.spacing;
    // Subtitle
    let subtitleImage = this.font.createImage(cardData.subtitle);
    ctx.drawImage(
      subtitleImage
      ,0,0,subtitleImage.width,subtitleImage.height
      ,Math.floor((cardImage.width * 0.5) - (subtitleImage.width * 0.5))
      ,currentY
      ,subtitleImage.width
      ,subtitleImage.height
    );
    let newCard = {
      "pos": new Vector(cardData.pos[0], cardData.pos[1])
      ,"size": new Vector(cardData.size[0], cardData.size[1])
      ,"image": cardImage
      ,"isHover": false
    };
    this.cards.push(newCard);
  };
  buildItems(items) {
    this.items = [];
    this.scrollPosition = this.minScroll;
    for (let i = 0; i < items.length; i++) {
      // Item Image
      let itemImage = document.createElement("canvas");
      itemImage.width = this.itemSize.x;
      itemImage.height = this.itemSize.y;
      let ctx = itemImage.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      // Image
      ctx.drawImage(
        items[i].image
        ,0,0,items[i].image.width,items[i].image.height
        ,0
        ,0
        ,this.itemImageSize.x
        ,this.itemImageSize.y
      );
      // Name
      let nameImage = this.font.createImage(items[i].name);
      ctx.drawImage(
        nameImage
        ,0,0,nameImage.width,nameImage.height
        ,this.itemImageSize.x
        ,0
        ,nameImage.width
        ,nameImage.height
      );
      // Description
      let descriptionImage = this.font.createMultiLineImage(items[i].description, new Vector(
        this.itemSize.x - this.itemImageSize.x
        ,this.itemSize.y - nameImage.height
      ));
      ctx.drawImage(
        descriptionImage
        ,0,0,descriptionImage.width,descriptionImage.height
        ,this.itemImageSize.x
        ,nameImage.height + this.spacing
        ,descriptionImage.width
        ,descriptionImage.height
      );
      this.items.push({
        "image": itemImage
        ,"isHover": false
      });
    }
    this.maxScroll = Math.max(
      (this.items.length * this.itemSize.y) + ((this.items.length + 1) * this.spacing) - this.size.y
      ,0
    );
  };
  // Draw
  drawItems(ctx) {
    // Background
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(
      Math.floor((this.size.x * 0.5) - (this.itemSize.x * 0.5) - this.spacing)
      ,0
      ,this.itemSize.x + (this.spacing * 2)
      ,this.size.y
    );
    // Items
    let y = this.spacing;
    for (let i = 0; i < this.items.length; i++) {
      // BG
      if (this.items[i].isHover) {
        ctx.fillStyle = "rgb(255,0,0)";
      } else {
        ctx.fillStyle = "rgb(50,50,50)";
      }
      ctx.fillRect(
        Math.floor((this.size.x * 0.5) - (this.itemSize.x * 0.5))
        ,y - this.scrollPosition
        ,this.itemSize.x
        ,this.itemSize.y
      );
      // Image
      ctx.drawImage(
        this.items[i].image
        ,0,0,this.items[i].image.width,this.items[i].image.height
        ,Math.floor((this.size.x * 0.5) - (this.itemSize.x * 0.5))
        ,y - this.scrollPosition
        ,this.itemSize.x
        ,this.itemSize.y
      );
      y += this.itemSize.y + this.spacing;
    }
  };
  drawButtons(ctx) {
    for (let i = 0; i < this.buttons.length; i++) {
      // BG
      if (this.buttons[i].isHover) {
        ctx.fillStyle = "rgb(255,0,0)";
      } else {
        ctx.fillStyle = "rgb(50,50,50)";
      }
      ctx.fillRect(
        this.buttons[i].pos.x
        ,this.buttons[i].pos.y
        ,this.buttons[i].size.x
        ,this.buttons[i].size.y
      );
      // Button Image
      ctx.drawImage(
        this.buttons[i].image
        ,0,0,this.buttons[i].image.width,this.buttons[i].image.height
        ,this.buttons[i].pos.x
        ,this.buttons[i].pos.y
        ,this.buttons[i].size.x
        ,this.buttons[i].size.y
      );
    }
  };
  drawCards(ctx) {
    for (let i = 0; i < this.cards.length; i++) {
      // BG
      if (this.cards[i].isHover) {
        ctx.fillStyle = "rgb(255,0,0)";
      } else {
        ctx.fillStyle = "rgb(50,50,50)";
      }
      ctx.fillRect(
        this.cards[i].pos.x
        ,this.cards[i].pos.y
        ,this.cards[i].size.x
        ,this.cards[i].size.y
      );
      // Card Image
      ctx.drawImage(
        this.cards[i].image
        ,0,0,this.cards[i].image.width,this.cards[i].image.height
        ,this.cards[i].pos.x
        ,this.cards[i].pos.y
        ,this.cards[i].size.x
        ,this.cards[i].size.y
      );
    }
  };
  draw(ctx) {
    // Background
    ctx.drawImage(
      this.bgImage
      ,0,0,this.bgImage.width,this.bgImage.height
      ,this.pos.x
      ,this.pos.y
      ,this.size.x
      ,this.size.y
    );
    if (this.showItemList) {
      this.drawItems(ctx);
    } else {
      // Buttons
      this.drawButtons(ctx);
      // Cards
      this.drawCards(ctx);
    }
  };
  // Update
  update(mousePos, scroll) {
    let buttons = [];
    let cards = [];
    let items = [];

    // Items
    if (this.showItemList) {
      this.scrollPosition += scroll * this.scrollAmount;
      this.scrollPosition = Math.min(Math.max(this.minScroll, this.scrollPosition), this.maxScroll);
      for (let i = 0; i < this.items.length; i++) {
        let pos = new Vector(
          (this.size.x * 0.5) - (this.itemSize.x * 0.5)
          ,this.spacing + (i * (this.itemSize.y + this.spacing)) - this.scrollPosition
        );
        if (Menu.isMouseIn(mousePos, pos, this.itemSize)) {
          this.items[i].isHover = true;
          items.push(true);
        } else {
          this.items[i].isHover = false;
          items.push(false);
        }
      }
    } else {
      // Buttons
      for (let i = 0; i < this.buttons.length; i++) {
        if (Menu.isMouseIn(mousePos, this.buttons[i].pos, this.buttons[i].size)) {
          this.buttons[i].isHover = true;
          buttons.push(true);
        } else {
          this.buttons[i].isHover = false;
          buttons.push(false);
        }
      }

      // Cards
      for (let i = 0; i < this.cards.length; i++) {
        if (Menu.isMouseIn(mousePos, this.cards[i].pos, this.cards[i].size)) {
          this.cards[i].isHover = true;
          cards.push(true);
        } else {
          this.cards[i].isHover = false;
          cards.push(false);
        }
      }
    }

    return {
      "buttons": buttons
      ,"cards": cards
      ,"items": items
    }
  };
  static isMouseIn(mousePos, pos, size) {
    if (mousePos[0] >= (pos.x)
    && mousePos[0] < (pos.x + size.x)
    && mousePos[1] >= (pos.y)
    && mousePos[1] < (pos.y + size.y)) {
      return true;
    } else {
      return false;
    }
  };
};