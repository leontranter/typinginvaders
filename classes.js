class Actor {
    constructor(x, y, speedX, speedY){
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        
    }
    isOffScreen() {
        return this.y >= canvas.height || this.x < 0 || this.x > canvas.width || this.y <= 0;
    }
}

class Letter extends Actor {
    constructor(x, y, speedX, speedY, game) {
        super(x, y, speedX, speedY);
        this.letterColor = getRandomColor();
        this.element = document.createElement('div');
        this.element.style.left = this.x;
        this.element.style.top = this.y;
        this.letter = getRandomLetter(game);
    }
    draw() {
            ctx.fillStyle = this.letterColor;
            ctx.font = '32px serif';  // You can adjust the size and font as needed
            ctx.fillText(this.letter, this.x, this.y);
        }
    }

    const friction = 0.99;
    class Particle extends Actor {
        constructor(x, y, speedX, speedY) {
            super(x, y, speedX, speedY);
            this.color = getRandomColor();
            this.radius = Math.random() * 3;
            this.alpha = 0.8;
        }
        update () {
            this.speedX *= friction;
            this.speedY *= friction;
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.01;
        }
        draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        }
    }