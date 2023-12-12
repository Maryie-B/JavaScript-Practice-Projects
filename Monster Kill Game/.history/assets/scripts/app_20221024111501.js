const ATTACK_POINTS = 15;
const MONSTER_ATTACK = 17;
const STRONG_ATTACK = 20;
const HEAL = 7;

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

function getLifeValue() {
    const hpGiven = prompt('Max HP for you and the monster.', '100');

    const parsedLife = parseInt(hpGiven);
    if (isNaN(parsedLife) || parsedLife <= 0) {
    throw { message: 'Invalid input, fuck you, write a number!'};
    }
    return parsedLife;
}

let chosenLifeValue;

try {
    chosenLifeValue = getLifeValue();
} catch (error) {
    console.log(error);
    chosenLifeValue = 113;
    alert('You entered sth wrong, use fucking numbers!')
} 

let monsterCurrentLife = chosenLifeValue;
let playerCurrentLife = chosenLifeValue;
let hasLife = true;

let battleLog = [];
let lastLoggedEvent;

adjustHealthBars(chosenLifeValue);




function writeLog (event, value, monsterHP, playerHP) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHP: monsterHP,
        finalPLayerHP: playerHP
    };
    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'MONSTER',
                finalMonsterHP: monsterHP,
                finalPLayerHP: playerHP
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHP: monsterHP,
                finalPLayerHP: playerHP
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHP: monsterHP,
                finalPLayerHP: playerHP
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: event,
                value: value,
                finalMonsterHP: monsterHP,
                finalPLayerHP: playerHP
            };
            break;
        default:
            logEntry = {};

    }

    // if (event === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry = {
    //         event: event, 
    //         value: value,
    //         target: 'MONSTER',
    //         finalMonsterHP: monsterHP,
    //         finalPLayerHP: playerHP
    //     };
    // } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry = {
    //         event: event, 
    //         value: value,
    //         target: 'MONSTER',
    //         finalMonsterHP: monsterHP,
    //         finalPLayerHP: playerHP
    //     };
    // } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry = {
    //         event: event, 
    //         value: value,
    //         target: 'PLAYER',
    //         finalMonsterHP: monsterHP,
    //         finalPLayerHP: playerHP
    //     };
    // } else if (event === LOG_EVENT_PLAYER_HEAL) {
    //     logEntry = {
    //         event: event, 
    //         value: value,
    //         target: 'MONSTER',
    //         finalMonsterHP: monsterHP,
    //         finalPLayerHP: playerHP
    //     };
    // } else if (event === LOG_EVENT_GAME_OVER) {
    //     logEntry = {
    //         event: event, 
    //         value: value,
    //         finalMonsterHP: monsterHP,
    //         finalPLayerHP: playerHP
    //     };
    // }
    battleLog.push(logEntry); 
}

function reset() {
    monsterCurrentLife = chosenLifeValue;
    playerCurrentLife = chosenLifeValue;
    resetGame(chosenLifeValue);
}

function roundEnd () {
    const initialLife = playerCurrentLife;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    playerCurrentLife -= playerDamage;
    writeLog(
        LOG_EVENT_MONSTER_ATTACK, 
        playerDamage, 
        monsterCurrentLife, 
        playerCurrentLife);

    if (playerCurrentLife <= 0 && hasLife) {
        hasLife = false;
        removeBonusLife();
        playerCurrentLife = initialLife;
        setPlayerHealth(initialLife);
        alert('You would be dead, \
        but the extra life saved your sorry ass!');
        
    }

    if (monsterCurrentLife <= 0 && playerCurrentLife > 0) {
        alert('You WON!');
        writeLog(
            LOG_EVENT_GAME_OVER, 
            'you won', 
            monsterCurrentLife, 
            playerCurrentLife);
        reset();
    } else if (playerCurrentLife <= 0 && monsterCurrentLife > 0) {
        alert('You lost, loser!');
        writeLog(
            LOG_EVENT_GAME_OVER, 
            'you lost', 
            monsterCurrentLife, 
            playerCurrentLife);
        reset();
    } else if (playerCurrentLife <= 0 && monsterCurrentLife <= 0) {
        alert('you have a draw!');
        writeLog(
            LOG_EVENT_GAME_OVER, 
            'draw', 
            monsterCurrentLife, 
            playerCurrentLife);
        reset();
    }
}

function attack (strength) {
    let loging;
    let maxDamage;
    if (strength === 'normal') {
        maxDamage = ATTACK_POINTS;
        loging = LOG_EVENT_PLAYER_ATTACK;
    } else if (strength === 'buff') {
        maxDamage = STRONG_ATTACK;
        loging = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const damage = dealMonsterDamage(maxDamage);
    monsterCurrentLife -= damage;
    writeLog(
        loging, 
        damage, 
        monsterCurrentLife, 
        playerCurrentLife);
    roundEnd();
}

function attackEnemy () {
    attack('normal');
    
}

function strongAttack () {
    attack('buff');

}

function heal () {
    let healValue;
    if (playerCurrentLife >= chosenLifeValue - HEAL) {
        alert("You can't heal more than your hit points max!");
        healValue = chosenLifeValue - playerCurrentLife;
    } else {
      healValue = HEAL;  
    }
    increasePlayerHealth(healValue);
    playerCurrentLife += healValue;
    writeLog(
        LOG_EVENT_PLAYER_HEAL, 
        healValue, 
        monsterCurrentLife, 
        playerCurrentLife);
    roundEnd();
}

function printLog() {
    // console.log(battleLog);
    for (let i = 0; i < 5; i++) {
        console.log("fuck");
    }

    let j = 0;
    while (j < 4) {
        console.log('Fuck you');
        j++;
    }

    // for (let i = 0; i < battleLog.length; i++) {
    //     console.log(battleLog[i]);
    // }

    let i = 0;
    for (const logEntry of battleLog) {
        if ((!lastLoggedEvent && lastLoggedEvent !== i) || lastLoggedEvent < i) {
            console.log(`#${i}`);
            for (const property in logEntry) {
            console.log(`${property} ==> ${logEntry[property]}`);
         }
            lastLoggedEvent = i; 
            break;
        }
        
        i++;
       
    }
    
}

attackBtn.addEventListener('click', attackEnemy);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', heal);
logBtn.addEventListener('click', printLog);