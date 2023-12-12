const startGameBtn = document.getElementById('start-game-btn');

const SELECT_ROCK = 'rock';
const SELECT_PAPER = 'paper';
const SELECT_SCISSORS = 'scissors';
const DEFAULT_CHOICE_USER = SELECT_PAPER;
const RESULT_DRAW = 'draw';
const RESULT_PLAYER_WON = 'you win';
const RESULT_PLAYER_LOST = "you lost";


let gameRuns = false; 

const getChoiceFrPlayer = function() {
    const select = prompt(`Chose ${SELECT_ROCK}, ${SELECT_PAPER} or ${SELECT_SCISSORS}`, '').toLowerCase();
    if (select !== SELECT_ROCK && select !== SELECT_PAPER && select !== SELECT_SCISSORS) {
        alert(`Unrecognized choice; we chose ${DEFAULT_CHOICE_USER} for you`);
        return;
    }
    return select;
};

const getChoiceFrComputer = function() {
    const valueRandom = Math.random();
    if (valueRandom < 0.34) {
        return SELECT_ROCK;
    } else if (valueRandom < 0.67) {
        return SELECT_PAPER;
    } else {
        return SELECT_SCISSORS;
    }
};

const determineWinner = (choiceC, choiceP = DEFAULT_CHOICE_USER) => 
    choiceC === choiceP 
        ? RESULT_DRAW  
        : (choiceC === SELECT_ROCK && choiceP === SELECT_PAPER) || 
        (choiceC === SELECT_PAPER && choiceP === SELECT_SCISSORS) || 
        (choiceC === SELECT_SCISSORS && choiceP === SELECT_ROCK) 
        ? RESULT_PLAYER_WON : RESULT_PLAYER_LOST;



startGameBtn.addEventListener('click', () => {
    if (gameRuns) { 
        return;
    }
    gameRuns = true;
    console.log('Game starts...');
    const playerSelect = getChoiceFrPlayer();
    const computerSelect = getChoiceFrComputer();
    let winner;
    if (playerSelect) {
        winner = determineWinner(computerSelect, playerSelect);
    } else {
        winner = determineWinner(computerSelect); // passing undefined or leaving the argument empty is replaced by the default value given, other falsey values are not!! 
        }
    let message = `You chose ${playerSelect || DEFAULT_CHOICE_USER} and the computer chose ${computerSelect}, therefore `;
    if (winner === RESULT_DRAW) {
        message = message + `you are both incompetent`;
    } else if (winner === RESULT_PLAYER_WON) {
        message = message + `you did something`;
    } else {
        message = message + `you're a worthless piece of shit`;
    }
    alert(message);
    gameRuns = false; // again with this, what is this mechanic???
});



// not related to the game

const combine = (callbackFn, operation,  ...numbers) => { // rest parameter merges all parameters in an array!!!
    const validation = (number) => {
        return isNaN(number) ? 0 : number;
    };
    let sumUp = 0;
    for (const nr of numbers) {
        if (operation === 'add') {
        sumUp += validation(nr);
        } else {
            sumUp -= validation(numbers);
        }
    }
    callbackFn(sumUp);
};

const subtract = function () {
    let sumUp = 0;
    for (const nr of arguments) { // arguments gives an array-like object but DON'T USE IT
        sumUp -= nr;
    }
    return sumUp;
};

const displayResult = (textMessage, result) => {
    alert(textMessage+ ' ' + result);
};

combine(displayResult.bind(this, 'The result after adding all numbers is'), 'add', 2, 3, 45, 12, 31, 41, 2);
combine(displayResult.bind(this, 'The result after adding all numers is'), 'add', 5, 6, 2, 45, 8);
combine(displayResult.bind(this, 'The result after substracting all numbers is'), 'subtract', 4, 24, 5, 1, 5, 64);