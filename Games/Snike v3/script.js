// canvas context
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
// Variable configuration map, scale, speed
const map = {
    scale: 70,
    x: 12,
    y: 8
};
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
    score: 0
};
let food = {
    position: undefined,
    premiumPosition: undefined,
    premiumTimer: 0
};
canvas.height = map.y * map.scale;
canvas.width = map.x * map.scale;
let time = setInterval(game, snake.speed);

// main Function "one function to rule them all" - Lord of the Coders
function game() {
    moveSnake();
    checkIfSnakeIsOnAnyFood();
    snakeTeleportOnBorder(snake.position[0]);
    checkIfSnakeIsOnAnyFood();
    if (isCollision()) {
        restartGame();
    }
    drawMap();
    drawSnake();
    drawFood();
    snake.lastDirection = snake.direction;
}

function drawMap() {
    // Black rect is a map
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, map.x * map.scale, map.y * map.scale);
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
            console.log('Draw snake error');
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
            ctx.fillRect(food.premiumPosition.x * map.scale + 1, food.premiumPosition.y * map.scale + 1, map.scale - 2, map.scale - 2);
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
    if (snakeHead.x === -1 || snakeHead.x === map.x) {
        (snakeHead.x === -1) ? snakeHead.x = map.x - 1 : snakeHead.x = 0;
    }
    else if (snakeHead.y === -1 || snakeHead.y === map.y) {
        (snakeHead.y === -1) ? snakeHead.y = map.y - 1 : snakeHead.y = 0;
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
    return (premiumPosition === food.position);
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

function restartGame() {
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
        score: 0
    };
    food = {
        position: undefined,
        premiumPosition: undefined,
        premiumTimer: 0
    };
    document.querySelector('h1').innerHTML = "Score: " + snake.score;
    clearInterval(time);
    time = setInterval(game, snake.speed);
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