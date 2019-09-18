// Variable configuration
const scale = 50;
let speedTime = 400;
// snake array
let snikeX = [3, 2, 1];
let snikeY = [4, 4, 4];
// start need that 
let direction = "right";
let lastDirection = "right";
let foodX = -1;
let foodY;
let score = -10;
// canvas context
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// main Function "one function to rule them all" - Lord of the rings
function game() {
    moveSnike(direction);
    isOnBorder();
    snikeIsOnFood();
    collisions();
    drawSnike();
    drawFood();
    lastDirection = direction;
}
// Draw snike 
function drawSnike() {
    // Black rect
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, 10 * scale, 10 * scale);
    // draw green snike
    for (let i = 0; i < snikeX.length; i++) {
        ctx.fillStyle = 'rgb(0,200,0)';
        ctx.fillRect(snikeX[i] * scale, snikeY[i] * scale, scale - 2, scale - 2);
    }
}
// snike move
function moveSnike(dir) {
    if (direction === 'right') {
        snikeX.unshift(snikeX[0] + 1);
        snikeY.unshift(snikeY[0]);
    } else if (direction === 'left') {
        snikeX.unshift(snikeX[0] - 1);
        snikeY.unshift(snikeY[0]);
    } else if (direction === 'up') {
        snikeX.unshift(snikeX[0]);
        snikeY.unshift(snikeY[0] - 1);
    } else if (direction === 'down') {
        snikeX.unshift(snikeX[0]);
        snikeY.unshift(snikeY[0] + 1);
    }
    snikeX.pop();
    snikeY.pop();
}
// time start
let time = setInterval(() => game(), speedTime);

// keyboard support up down left right 
window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 37: // Left
        case 65: // A
            if (direction != "right" && lastDirection != "right") direction = "left";
            break;

        case 38: // Up
        case 87: // W key
            if (direction != "down" && lastDirection != "down") direction = "up";
            break;

        case 39: // Right
        case 68: // D key
            if (direction != "left" && lastDirection != "left") direction = "right";
            break;

        case 40: // Down
        case 68: // S key
            if (direction != "up" && lastDirection != "up") direction = "down";
            break;
    }
}, false);

// first fitcher crossing the wall
function isOnBorder() {
    if (snikeX[0] === -1 || snikeX[0] === 10) {
        if (snikeX[0] === -1) {
            snikeX[0] = 9;
        } else {
            snikeX[0] = 0;
        }
    }
    if (snikeY[0] === -1 || snikeY[0] === 10) {
        if (snikeY[0] === -1) {
            snikeY[0] = 9;
        } else {
            snikeY[0] = 0;
        }
    }
}
// time for drawing food and validation (removing the possibility of food appearing on the snake), additionally adding score up
function drawFood(min = 0, max = 9) {
    if (foodX === -1) {
        foodX = Math.floor(Math.random() * (max - min)) + min;
        foodY = Math.floor(Math.random() * (max - min)) + min;
        for (let i = 0; i < snikeX.length; i++) {
            if (snikeX[i] === foodX && snikeY[i] === foodY) {
                foodX = -1;
                drawFood();
            }
        }
        scoreUp();
    }
    ctx.fillStyle = 'rgb(200,200,200)';
    ctx.fillRect(foodX * scale, foodY * scale, scale - 2, scale - 2);
}
// extension of the snake ^^ everyone wants that :D
function snikeIsOnFood() {
    if (snikeX[0] === foodX && snikeY[0] === foodY) {
        foodX = -1;
        snikeX.push(snikeX[snikeX.length]);
        snikeY.push(snikeY[snikeY.length]);
        drawFood();
    }
}
// snake collisions that restart the game
function collisions() {
    for (let i = 1; i < snikeX.length; i++) {
        if (snikeX[i] === snikeX[0] && snikeY[i] === snikeY[0]) {
            startNewGame();
        }
    }
}
// Restart Game
function startNewGame() {
    snikeX = [3, 2, 1];
    snikeY = [4, 4, 4];
    direction = "right";
    lastDirection = "right";
    foodX = -1;
    speedTime = 400;
    score = -10;
}
// Score
function scoreUp() {
    score += 10;
    document.querySelector('h1').innerHTML = "Score: " + score;
    accelerationOfTime();
}
// time turn faster when score up
function accelerationOfTime() {
    clearInterval(time);
    speedTime = speedTime - 5;
    time = window.setInterval(() => game(), speedTime);
}