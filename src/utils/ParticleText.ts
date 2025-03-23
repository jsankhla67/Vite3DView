class Particle {
  effect: Effect;
  x: number;
  y: number;
  color: string;
  originX: number;
  originY: number;
  size: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  force: number;
  angle: number;
  distance: number;
  friction: number;
  ease: number;
  constructor(effect: Effect, x: number, y: number, color: string) {
    this.effect = effect;
    this.x = Math.random() * this.effect.canvasWidth;
    this.y = Math.random() * this.effect.canvasHeight;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.size = this.effect.gap;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.1 + 0.005;
  }
  draw() {
    this.effect.context.fillStyle = this.color;
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx = this.force * Math.cos(this.angle);
      this.vy = this.force * Math.sin(this.angle);
    }
    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}

export class Effect {
  context: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  textX: number;
  textY: number;
  fontSize: number;
  maxWidth: number;
  lineHeight: number;
  particles: Particle[];
  gap: number;
  mouse: {
    radius: number;
    x: number;
    y: number;
  };

  constructor(
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    fontSize: number = 100
  ) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.fontSize = fontSize;
    this.maxWidth = this.canvasWidth * 0.8;
    this.lineHeight = this.fontSize * 0.8;

    //particle text
    this.particles = [];
    this.gap = 2;
    this.mouse = {
      radius: 17000,
      x: 0,
      y: 0,
    };

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  async wrapText(text: string, x: number, y: number) {
    await document.fonts.load(`${this.fontSize}px Anton`);
    //canvas settings
    this.context.fillStyle = "#000000";
    this.context.font = `${this.fontSize}px Anton`;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.lineWidth = 3;

    //break text into lines
    const linesArray = [];
    const words = text.split(" ");
    let lineCounter = 0;
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      if (this.context.measureText(testLine).width > this.maxWidth) {
        line = words[i] + " ";
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    }
    const textHeight = this.lineHeight * lineCounter;
    this.textY = this.canvasHeight / 2 - textHeight / 2;
    linesArray.forEach((line, index) => {
      this.context.fillText(
        line,
        this.textX,
        this.textY + index * this.lineHeight
      );
    });
    this.convertToParticles();
  }

  convertToParticles() {
    this.particles = [];
    const pixels = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    ).data;
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let i = 0; i < this.canvasWidth; i += this.gap) {
      for (let j = 0; j < this.canvasHeight; j += this.gap) {
        const index = (j * this.canvasWidth + i) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red},${green},${blue})`;
          this.particles.push(new Particle(this, i, j, color));
        }
      }
    }
  }
  render() {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
}
