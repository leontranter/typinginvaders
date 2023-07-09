const NUM_STARS = 25;
const EXPLOSION_SOUNDS = ['Explosion+1.mp3', 'Explosion+2.mp3', 'Explosion+3.mp3','Explosion+4.mp3','Explosion+5.mp3','Explosion+6.mp3','Explosion+7.mp3','Explosion+8.mp3','Explosion+9.mp3','Explosion+10.mp3'];
const SHIELD_SOUNDS = ['Shield1.mp3', 'Shield2.mp3'];
let canvas, ctx, score, letterInterval, activeLetters, particles, gameRunning, scoreElement, explosionSoundObjects, soundEnabled;
let game = {
    startTime: null,
    score: 0,
    gameRunning: false};
setup();

function startGame(difficulty) {
    game.startTime = Date.now();
    clearInterval(letterInterval);
    let settings = setDifficulty(difficulty);
    dialog.style.display = 'none';
    letterInterval = setInterval(() => newLetter(settings, game), settings.letterTime);
    if (!game.gameRunning) {
        game.gameRunning = true;
        animate();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let i = 0; i < activeLetters.length; i++) {
        activeLetters[i].update();
        if (activeLetters[i].isOffScreen()) {
            console.log("Elapsed time is " + (Date.now() - game.startTime) / 1000); 
            endGame();
            return;
        }
        activeLetters[i].draw();
    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        if (particles[i].alpha <= 0 || particles[i].isOffScreen()) {
            particles.splice(i, 1);
            break;
        }
        particles[i].draw();
    }
    if (game.gameRunning)
        {requestAnimationFrame(animate);}
}

function endGame() {
    game.gameRunning = false;
    activeLetters = [];
    particles = [];
    scoreElement.textContent = "Final Score: " + game.score;
    dialog.style.display = 'block';
}

function newLetter(settings, game) {
        const x = (Math.random() * canvas.width * 0.6) + (Math.random() * canvas.width * 0.2);
        const newLetter = new Letter(x, 1, 0, settings.letterFallSpeed, game);
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

function playShieldBreak() {
    if (!soundEnabled) {
        return;}
    let randomIndex = Math.floor(Math.random() * shieldSoundObjects.length);
    let shieldSound = shieldSoundObjects[randomIndex];
    shieldSound.play().catch(error => console.error('Failed to play sound:', error));
}

function setupEventListeners() {
    document.getElementById('startEasy').addEventListener('click', function() {startGame('easy');});
    document.getElementById('startMedium').addEventListener('click', function() {startGame('medium');});
    document.getElementById('startHard').addEventListener('click', function() {startGame('hard');});
    document.getElementById('soundCheckbox').addEventListener('change', function() {soundEnabled = this.Checked; console.log('sound enabled: ' + soundEnabled);});
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
    shieldSoundObjects = SHIELD_SOUNDS.map(sound => new Audio('sounds/' + sound));
    soundEnabled = document.getElementById('soundCheckbox').checked;

    setupEventListeners();
    addStars();
    setTimeout(addStars, 1500);
}

function handleKeyPress(e) {
    let removeIndex = -1;
    for (let i = 0; i < activeLetters.length; i++) {
        if (e.key === activeLetters[i].letter) {
            if (activeLetters[i].numberOfShields > 0) {
                activeLetters[i].numberOfShields--;
                playShieldBreak();
                break;
            }
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