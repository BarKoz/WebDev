// canvas context
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
// Variable configuration map, scale, speed
const map = {
    scale: 70,
    x: 12,
    y: 8
}
canvas.height = map.y * map.scale;
canvas.width = map.x * map.scale;
// snake and food objects
let snake = {
    speed: 500,
    howFastSpeedUp: 25,
    position: [
        {x: 3, y: 2},
        {x: 2, y: 2},
        {x: 1, y: 2}
    ],
    direction: "right",
    lastDirection: "right",
    score: 0,
    lastScore: 0,
    bestScore: 0
}

let food = {
    position: undefined,
    premiumPosition: undefined,
    premiumTimer: 0
}

let time = setTimeout(menu, 100);
// main Function "one function to rule them all" - Lord of the Coders
function game() {
    moveSnake();
    checkIfSnakeIsOnAnyFood();
    snakeTeleportOnBorder(snake.position[0]);
    checkIfSnakeIsOnAnyFood();
    if (isCollision()) {
        clearInterval(time);
        restartVariables();
        if (snake.lastScore > snake.bestScore) {
            snake.bestScore = snake.lastScore;
        }
        endGameMenu();
        return;
    }
    drawMap();
    drawSnake();
    drawFood();
    snake.lastDirection = snake.direction;
}

function startGame() {
    clearInterval(time);
    canvas.removeEventListener("click", startGame, false);
    time = setInterval(game, snake.speed);
}

function menu() {
    drawMap();
    drawMenu();
    canvas.addEventListener("click", startGame, false);
}

function endGameMenu() {
    ctx.textAlign = 'center';
    ctx.font = "50px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("You Score: " + snake.lastScore, canvas.width / 2, canvas.height / 2);
    ctx.fillText("Best Score: " + snake.bestScore, canvas.width / 2, canvas.height / 2 + 50);
    ctx.fillText("Click to new game :)", canvas.width / 2, canvas.height / 2 + 100);
    canvas.addEventListener("click", startGame, false);
}

function drawMap() {
    // Black rect is a map
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, map.x * map.scale, map.y * map.scale);
}

function drawMenu() {
    ctx.textAlign = 'center';
    ctx.font = "40px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("Click to play!", canvas.width / 2, canvas.height / 2);
}

function drawSnake() {
    // draw all part of green snake
    for (let i = 0; i < snake.position.length; i++) {
        ctx.fillStyle = 'rgb(0,200,0)';
        ctx.fillRect(snake.position[i].x * map.scale + 1, snake.position[i].y * map.scale + 1, map.scale - 2, map.scale - 2);
    }
    ctx.fillStyle = 'rgb(39,108,200)';
    switch (snake.direction) {
        case "right":
            ctx.fillRect(snake.position[0].x * map.scale + map.scale*0.75, snake.position[0].y * map.scale + map.scale*0.30, 5, 5);
            ctx.fillRect(snake.position[0].x * map.scale + map.scale*0.75, snake.position[0].y * map.scale + map.scale*0.65, 5, 5);
            break;
        case "left":
            ctx.fillRect(snake.position[0].x * map.scale + map.scale*0.25, snake.position[0].y * map.scale + map.scale*0.30, 5, 5);
            ctx.fillRect(snake.position[0].x * map.scale + map.scale*0.25, snake.position[0].y * map.scale + map.scale*0.65, 5, 5);
            break;
        case "up":
            ctx.fillRect(snake.position[0].x * map.scale + map.scale*0.30, snake.position[0].y * map.scale + map.scale*0.25, 5, 5);
            ctx.fillRect(snake.position[0].x * map.scale + map.scale*0.65, snake.position[0].y * map.scale + map.scale*0.25, 5, 5);
            break;
        case "down":
            ctx.fillRect(snake.position[0].x * map.scale + map.scale*0.30, snake.position[0].y * map.scale + map.scale*0.75, 5, 5);
            ctx.fillRect(snake.position[0].x * map.scale + map.scale*0.65, snake.position[0].y * map.scale + map.scale*0.75, 5, 5);
            break;
        default:
            console.log('Draw snake.direction error');
    }
}

function drawFood() {
    //draw normal food
    if (food.position === undefined) {
        do {
            food.position = {
                x: randomNum(map.x),
                y: randomNum(map.y)
            }
        } while (foodInSnake(food.position));
        food.premiumTimer = 0;
    }
    ctx.fillStyle = 'rgb(200,200,200)';
    ctx.fillRect(food.position.x * map.scale + 1, food.position.y * map.scale + 1, map.scale - 2, map.scale - 2);
    // draw premium food
    if (!(snake.score % 50)) {
        if (food.premiumPosition === undefined) {
            do {
                food.premiumPosition = {
                    x: randomNum(map.x),
                    y: randomNum(map.y)
                }
            } while (foodInSnake(food.premiumPosition) || foodInPremiumFood(food.premiumPosition));
        }
        food.premiumTimer++;
        if (food.premiumTimer < 16) {
            ctx.fillStyle = 'rgb(210,214,27)';
            ctx.beginPath();
            ctx.moveTo(food.premiumPosition.x * map.scale + map.scale * 0.50,food.premiumPosition.y * map.scale);
            ctx.lineTo(food.premiumPosition.x * map.scale + map.scale * 0.60,food.premiumPosition.y * map.scale + map.scale * 0.3);
            ctx.lineTo(food.premiumPosition.x * map.scale + map.scale,food.premiumPosition.y * map.scale + map.scale * 0.25);
            ctx.lineTo(food.premiumPosition.x * map.scale + map.scale * 0.70,food.premiumPosition.y * map.scale + map.scale * 0.55);
            ctx.lineTo(food.premiumPosition.x * map.scale + map.scale * 0.90,food.premiumPosition.y * map.scale + map.scale);
            ctx.lineTo(food.premiumPosition.x * map.scale + map.scale * 0.50,food.premiumPosition.y * map.scale + map.scale * 0.70);
            ctx.lineTo(food.premiumPosition.x * map.scale + map.scale * 0.10,food.premiumPosition.y * map.scale + map.scale);
            ctx.lineTo(food.premiumPosition.x * map.scale + map.scale * 0.30,food.premiumPosition.y * map.scale + map.scale * 0.55);
            ctx.lineTo(food.premiumPosition.x * map.scale,food.premiumPosition.y * map.scale + map.scale * 0.25);
            ctx.lineTo(food.premiumPosition.x * map.scale + map.scale * 0.40,food.premiumPosition.y * map.scale + map.scale * 0.30);
            ctx.fill();
        }
    }
}

function moveSnake() {
    switch (snake.direction) {
        case 'right':
            snake.position.unshift({x: snake.position[0].x + 1, y: snake.position[0].y});
            break;
        case 'left':
            snake.position.unshift({x: snake.position[0].x - 1, y: snake.position[0].y});
            break;
        case 'up':
            snake.position.unshift({x: snake.position[0].x, y: snake.position[0].y - 1});
            break;
        case 'down':
            snake.position.unshift({x: snake.position[0].x, y: snake.position[0].y + 1});
            break;
        default:
            console.log('Error moveSnake()');
    }
    snake.position.pop();
}

// keyboard support up down left right
window.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
            if (snake.direction !== "right" && snake.lastDirection !== "right") {
                snake.direction = "left";
            }
            break;
        case 'ArrowUp':
        case 'KeyW':
            if (snake.direction !== "down" && snake.lastDirection !== "down") {
                snake.direction = "up";
            }
            break;
        case 'ArrowRight':
        case 'KeyD':
            if (snake.direction !== "left" && snake.lastDirection !== "left") {
                snake.direction = "right";
            }
            break;
        case 'ArrowDown':
        case 'KeyS':
            if (snake.direction !== "up" && snake.lastDirection !== "up") {
                snake.direction = "down";
            }
            break;
        default:
            break;
    }
}, false);

function snakeTeleportOnBorder(snakeHead) {
    if (snakeHead.x === -1) {
        snakeHead.x = map.x - 1;
    }
    if (snakeHead.x === map.x){
        snakeHead.x = 0;
    }
    if (snakeHead.y === -1) {
        snakeHead.y = map.y - 1;
    }
    if (snakeHead.y === map.y){
        snakeHead.y = 0;
    }
}

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function foodInSnake(foodPos) {
    for (let i = 0; i < snake.position.length; i++) {
        if (snake.position[i].x === foodPos.x && snake.position[i].y === foodPos.y) {
            return true;
        }
    }
    return false;
}
function foodInPremiumFood(premiumPosition) {
    return (premiumPosition.x === food.position.x && premiumPosition.y === food.position.y);
}

function snakeIsOnFood(position, premiumTimer = 0) {
    if (position === undefined) {
        return false;
    }
    return (snake.position[0].x === position.x && snake.position[0].y === position.y && premiumTimer < 15);
}

function snakeEatFood() {
    food.position = undefined;
    // we add on last position one element and then snake is bigger :)
    snake.position.push({
        x: snake.position[snake.position.length],
        y: snake.position[snake.position.length]
    });
}

function checkIfSnakeIsOnAnyFood() {
    if (snakeIsOnFood(food.position)) {
        scoreUp(10);
        snakeEatFood();
    }
    else if (snakeIsOnFood(food.premiumPosition,food.premiumTimer)) {
        scoreUp(20);
        food.premiumPosition = undefined;
    }
}

function isCollision() {
    for (let i = 1; i < snake.position.length; i++) {
        if (snake.position[i].x === snake.position[0].x && snake.position[i].y === snake.position[0].y) {
            return true;
        }
    }
    return false;
}

function acceleration() {
    clearInterval(time);
    if (snake.howFastSpeedUp > 0) {
        snake.speed -= snake.howFastSpeedUp;
        snake.howFastSpeedUp--;
    }
    time = setInterval(game, snake.speed);
}

// ScoreUP
function scoreUp(howMany) {
    snake.score += howMany;
    document.querySelector('h1').innerHTML = "Score: " + snake.score;
    acceleration();
}

function restartVariables() {
    snake = {
        speed: 500,
        howFastSpeedUp: 25,
        position: [
            {x: 3, y: 2},
            {x: 2, y: 2},
            {x: 1, y: 2}
        ],
        direction: "right",
        lastDirection: "right",
        score: 0,
        lastScore: snake.score,
        bestScore: snake.bestScore
    }
    food = {
        position: undefined,
        premiumPosition: undefined,
        premiumTimer: 0
    }
    document.querySelector('h1').innerHTML = "Score: " + snake.score;
    clearInterval(time);
    time = setInterval(game, snake.speed);
}
//TODO remember DRY
//TODO FOOD eat graphic
//TODO add options
//TODO add tests
//TODO simplify code
//TODO update game (add new fetchers)
//TODO learn more :D
