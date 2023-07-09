const CHANCE_OF_SHIELDS = 0.5; 

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
        this.numberOfShields = Math.random() < CHANCE_OF_SHIELDS ? 1 : 0;
    }
    draw() {
            ctx.fillStyle = this.letterColor;
            ctx.font = '32px serif';  // You can adjust the size and font as needed
            ctx.fillText(this.letter, this.x, this.y);
            if (this.numberOfShields > 0) {
                let textWidth = ctx.measureText(this.letter).width;
                let textHeight = 32;
                let centreX = this.x + textWidth / 2;
                let centreY = this.y - textHeight / 2;
                let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 20);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                gradient.addColorStop(1, 'rgba(35, 35, 255, 0.4)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centreX, centreY + 3, 30, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    const friction = 0.99;
    class Particle extends Actor {
        constructor(x, y, speedX, speedY, color) {
            super(x, y, speedX, speedY);
            this.color = color || getRandomColor();
            this.radius = Math.random() * 4;
            this.alpha = 0.5;
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