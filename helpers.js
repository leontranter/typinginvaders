let letterSet0 = ['f','j'];
let letterSet1 = letterSet0.concat(['k','d']);
let letterSet2 = letterSet1.concat(['g','h','a','s','l',';']);
let letterSet3 = letterSet2.concat(['t','y','v','n']);
let letterSet4 = letterSet3.concat(['u','b','r','n']);
let letterSet5 = letterSet4.concat(['q','w','u','i','o','p','e']);
let letterSet6 = letterSet5.concat(['z','x','c','m']);
let letterSet7 = letterSet6.concat([',','.','/','[',']'])
let scoreBarriers = [16, 30, 42, 70, 90, 120];


function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
  
    // Ensure the color isn't too dark (which would appear as black on a black background)
    if (r + g + b > 570) {
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        return getRandomColor();
    }
  }

  function getRandomLetter(game) {
    let setChocie;
    console.log(game.score);
    if (game.score < scoreBarriers[0]) {
        setChoice = letterSet0;
    }
    else if (game.score < scoreBarriers[1]) {
        setChoice = letterSet1;
    }
    else if (game.score < scoreBarriers[2]) {
        setChoice = letterSet2;
    }
    else if (game.score < scoreBarriers[3]) {
        setChoice = letterSet3;
    }
    else if (game.score < scoreBarriers[4]) {
        setChoice = letterSet4;
    }
    else if (game.score < scoreBarriers[5]) {
        setChoice = letterSet5;
    }
    else if (game.score < scoreBarriers[6]) {
        setChoice = letterSet6;
    }
    else {
        setChoice = letterSet7;
    }
    letterIndex = Math.floor(Math.random() * setChoice.length);
    return setChoice[letterIndex];
  }

  function setDifficulty(difficulty) {
    let settings = {letterFallSpeed: 1, letterTime: 2000};
    switch(difficulty) {
        case 'easy':
            settings.letterFallSpeed = 0.5;
            settings.letterTime = 3000;
            break;
        // medium values are already assigned by default
        case 'hard':
            settings.letterFallSpeed = 1.5;
            settings.letterTime = 1000;
            break;
    }
    return settings;
}

function createStar() {
    let star = document.createElement('div');
    star.className = 'star';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    return star;
}