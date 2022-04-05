(function () {
    'use strict';
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    /* const score = document.getElementById('score'); */
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
    const actionArea = document.getElementById('actions');
    const dice = document.getElementById("dice");
    /* start page overlay */
    const start0 = document.getElementById("start0");
    const startPage = document.getElementById("startPage");
    /* rule page overlay */
    const checkRules = document.getElementById("checkRules");
    const ok = document.getElementById("ok");
    

    /* sounds------------------------------------ */
    const switchSound = new Audio('media/switch.m4a');
    const startSound = new Audio('media/gamestart.m4a');
    const winSound = new Audio('media/winning.m4a');
    const buttonSound = new Audio('media/button.m4a');
    const bgm = new Audio('media/bgm.m4a');
    bgm.loop = true;
    bgm.play();
    /* bgm.pause(); */
    let gameData = {
        dice: ['1die.png', '2die.png', '3die.png',
            '4die.png', '5die.png', '6die.png'
        ],
        players: ['Paul', 'Grace'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };
    start0.addEventListener("click", function(event){
        event.preventDefault();
        buttonSound.play();
        startPage.className = "overlay hidden";
        checkRules.className = "overlay showing";
    });
    ok.addEventListener("click", function(event){
        event.preventDefault();
        buttonSound.play();
        
        checkRules.className = "overlay hidden";
        checkRules.style.backgroundColor = "red";
    });

    document.getElementById('quit').addEventListener("click", function () {
        buttonSound.play();
        location.reload();
    });

    document.getElementById('openRules').addEventListener("click", function (event) {
        event.preventDefault();
        buttonSound.play();
        checkRules.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        checkRules.className = "overlay showing";
    });
    startGame.addEventListener("click", function () {
        //bgm stop
        bgm.pause();
        //sound play
        startSound.play();
        //move the quit button to corner
        //random set
        gameData.index = Math.round(Math.random());
        gameControl.innerHTML = '';

        console.log("set up the turn!");
        console.log(gameData.index);

        setUpTurn();
    });

    function setUpTurn() {
        //random player
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id = "roll">Roll the Dice</button>';
        document.getElementById('roll').addEventListener('click', function () {
            buttonSound.play();
            console.log('roll the dice!');
            throwDice();
        });
    }

    function throwDice() {
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1; //use ceil could result in a zero
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        dice.innerHTML = `<img src="images/${gameData.dice[gameData.roll1-1]}">
                                <img src="images/${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if two 1
        if (gameData.rollSum === 2) {
            //sound play
            switchSound.play();
            console.log("snake eyes were rolled");
            game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            //change player
            gameData.index ? (gameData.index) = 0 : (gameData.index = 1);
            //show the surrent score
            setTimeout(setUpTurn, 2000);
            showCurrentScore()
        }
        //if either dice is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            //sound play
            switchSound.play();
            console.log("one of the two dice was a 1");
            gameData.index ? (gameData.index) = 0 : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 4000);
            showCurrentScore()
        }
        //if neither dice is a 1
        else {
            console.log("the game processed");
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id = "rollagain">Roll Again</button> <button id = "pass">Pass</button>';
            document.getElementById('rollagain').addEventListener('click', function () {
                buttonSound.play();
                throwDice();
            });
            document.getElementById('pass').addEventListener('click', function () {
                buttonSound.play();
                gameData.index ? (gameData.index) = 0 : (gameData.index = 1);
                throwDice();
            });
            //check winning condition!
            checkWinningCondition();
        }
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            //sound play
            winSound.play();
            actionArea.innerHTML = '';
            winningCelebrate();
            
        } else {
            //show current score
            showCurrentScore();
        }
    }
    //if player has 30+ points, show the winner celebrate function
    function winningCelebrate(){
        const winner =document.getElementById("winner");
        const showWinner = document.getElementById("showWinner");
        winner.className = "overlay showing";
        showWinner.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
        showWinner.innerHTML += `<img src="images/pig${gameData.index+1}.png">`;
        showWinner.innerHTML += "<button id='playAgain'>Play Again</button>";
        document.getElementById("playAgain").addEventListener("click",function(){
            buttonSound.play();
            location.reload();
        });

    }
    function showCurrentScore() {
        score1.innerHTML = `${gameData.score[0]}`;
        score2.innerHTML = `${gameData.score[1]}`;
    }

    //user test--------------------------
    const userTest = document.getElementById("userTest");
    document.getElementById("userTaskCheck").addEventListener('click', function () {
        buttonSound.play();
        userTest.className = "overlay hidden";
    });
}());
