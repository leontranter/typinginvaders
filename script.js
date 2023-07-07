const NUM_STARS = 25;
const EXPLOSION_SOUNDS = ['Explosion+1.mp3', 'Explosion+2.mp3', 'Explosion+3.mp3','Explosion+4.mp3','Explosion+5.mp3','Explosion+6.mp3','Explosion+7.mp3','Explosion+8.mp3','Explosion+9.mp3','Explosion+10.mp3'];
let canvas, ctx, score, letterInterval, activeLetters, particles, gameRunning, scoreElement, explosionSoundObjects, soundEnabled;
let gameStartTime = Date.now();
setup();

function startGame(difficulty) {
    clearInterval(letterInterval);
    let settings = setDifficulty(difficulty);
    dialog.style.display = 'none';
    letterInterval = setInterval(() => newLetter(settings, score), settings.letterTime);
    if (!gameRunning) {
        gameRunning = true;
        animate();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let i = 0; i < activeLetters.length; i++) {
        activeLetters[i].update();
        if (activeLetters[i].y >= canvas.height) {
            console.log("Elapsed time is " + (Date.now() - gameStartTime) / 1000); 
            endGame();
            return;
        }
        activeLetters[i].draw();
    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        if (particles[i].alpha <= 0 || particles[i].x <= 0 || particles[i].x >= canvas.width || particles[i].y <= 0 || particles[i].y >= canvas.height) {
            particles.splice(i, 1);
            break;
        }
        particles[i].draw();
    }
    if (gameRunning)
        {requestAnimationFrame(animate);}
}

function endGame() {
    gameRunning = false;
    activeLetters = [];
    particles = [];
    scoreElement.textContent = "Final Score: " + score;
    dialog.style.display = 'block';
}

function newLetter(settings, score) {
        const x = (Math.random() * canvas.width * 0.6) + (Math.random() * canvas.width * 0.2);
        const newLetter = new Letter(x, 0, 0, settings.letterFallSpeed, score);
        activeLetters.push(newLetter);
}

function addStars() {
    for (let i = 0; i <= NUM_STARS; i++) {
        document.body.appendChild(createStar());
    }
}

function playExplosion() {
    if (!soundEnabled) {
        return;}
    let randomIndex = Math.floor(Math.random() * explosionSoundObjects.length);
    let explosionSound = explosionSoundObjects[randomIndex];
    explosionSound.play().catch(error => console.error('Failed to play sound:', error));
}

function setupEventListeners() {
    document.getElementById('startEasy').addEventListener('click', function() {startGame('easy');});
    document.getElementById('startMedium').addEventListener('click', function() {startGame('medium');});
    document.getElementById('startHard').addEventListener('click', function() {startGame('hard');});
    document.getElementById('soundCheckbox').addEventListener('change', function() {soundEnabled = this.ariaChecked;});
    window.addEventListener('keypress', handleKeyPress);
}

function setup() {
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    score = 0;
    letterInterval = null;
    activeLetters = [];
    particles = [];
    gameRunning = false;
    scoreElement = document.getElementById('score');
    explosionSoundObjects = EXPLOSION_SOUNDS.map(sound => new Audio('sounds/' + sound));

    setupEventListeners();
    addStars();
    setTimeout(addStars, 1500);
}

function handleKeyPress(e) {
    let removeIndex = -1;
    for (let i = 0; i < activeLetters.length; i++) {
        if (e.key === activeLetters[i].letter) {
            playExplosion();
            score ++;
            scoreElement.textContent = "Score: " + score;
            removeIndex = i;
            numParticles = Math.random() * 10 + 4;
             for (let j = 1; j < numParticles + 1; j++) {
                 particles.push(new Particle(activeLetters[i].x, activeLetters[i].y, (Math.random() * 4) -2, (Math.random() * 4) -2));
             }
             break;
        }
    }
    if (removeIndex != -1) {
        activeLetters.splice(removeIndex, 1);
    }
}