const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let score = 0;
let letterInterval;
let activeLetters = [];
let scoreElement = document.getElementById('score');

document.getElementById('startEasy').addEventListener('click', function() {startGame('easy');});
document.getElementById('startMedium').addEventListener('click', function() {startGame('medium');});
document.getElementById('startHard').addEventListener('click', function() {startGame('hard');});

window.addEventListener('keypress', function(e) {
    let removeIndex = -1;
    for (let i = 0; i < activeLetters.length; i++) {
        if (e.key === activeLetters[i].letter) {
            score ++;
            scoreElement.textContent = "Score: " + score;
            removeIndex = i;
        }
    }
    if (removeIndex != -1) {
        activeLetters.splice(removeIndex, 1);
    }
})

function startGame(difficulty) {
    clearInterval(letterInterval);
    let settings = setDifficulty(difficulty);
    dialog.style.display = 'none';
    letterInterval = setInterval(() => newLetter(settings, score), settings.letterTime);
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let i = 0; i < activeLetters.length; i++) {
        activeLetters[i].update();
        activeLetters[i].draw();
    }
    requestAnimationFrame(animate);
}

function newLetter(settings, score) {
        console.log('new letter calle');
        const x = (Math.random() * canvas.width * 0.6) + (Math.random() * canvas.width * 0.2);
        const newLetter = new Letter(x, 0, 0, settings.letterFallSpeed, score);
        activeLetters.push(newLetter);
}

