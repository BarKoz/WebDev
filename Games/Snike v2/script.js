// canvas context
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
// Variable configuration map, scale, speed
let map = {
    scale: 70,
    x: 12,
    y: 8
};
// snake and food objects
let snake = {
    speed: 500,
    fastSpeedUp: 25,
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
    snakeTeleportOnBorder();
    if (snakeIsOnFood()) {
        scoreUp(10);
        snakeEatFood();
    }
    if (snakeIsOnPremiumFood()) {
        scoreUp(20);
        food.premiumPosition = undefined;
    }
    if (isCollision()) {
        restartGame(); //if collision is true reset the game
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
        ctx.fillRect(snake.position[i].x * map.scale, snake.position[i].y * map.scale, map.scale - 2, map.scale - 2);
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
        } while (foodInSnake(food.position.x, food.position.y));
        food.premiumTimer = 0;
    }
    ctx.fillStyle = 'rgb(200,200,200)';
    ctx.fillRect(food.position.x * map.scale, food.position.y * map.scale, map.scale - 2, map.scale - 2);
    // draw premium food
    if (!(snake.score % 50)) {
        if (food.premiumPosition === undefined) {
            do {
                food.premiumPosition = {
                    x: randomNum(map.x),
                    y: randomNum(map.y)
                }
            } while (foodInSnake(food.premiumPosition.x, food.premiumPosition.y));
        }
        food.premiumTimer++;
        if (food.premiumTimer < 16) {
            ctx.fillStyle = 'rgb(210,214,27)';
            ctx.fillRect(food.premiumPosition.x * map.scale, food.premiumPosition.y * map.scale, map.scale - 2, map.scale - 2);
        }
    }
}

function moveSnake() {
    if (snake.direction === 'right') {
        snake.position.unshift({x: snake.position[0].x + 1, y: snake.position[0].y});
    } else if (snake.direction === 'left') {
        snake.position.unshift({x: snake.position[0].x - 1, y: snake.position[0].y});
    } else if (snake.direction === 'up') {
        snake.position.unshift({x: snake.position[0].x, y: snake.position[0].y - 1});
    } else if (snake.direction === 'down') {
        snake.position.unshift({x: snake.position[0].x, y: snake.position[0].y + 1});
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

// first feature crossing the wall
function snakeTeleportOnBorder() {
    if (snake.position[0].x === -1 || snake.position[0].x === map.x) {
        (snake.position[0].x === -1) ? snake.position[0].x = map.x - 1 : snake.position[0].x = 0;
    }
    if (snake.position[0].y === -1 || snake.position[0].y === map.y) {
        (snake.position[0].y === -1) ? snake.position[0].y = map.y - 1 : snake.position[0].y = 0;
    }
}

// time for drawing food and validation (removing the possibility of food appearing on the snake), additionally adding score up
function randomNum(max) {
    let min = 0;
    return Math.floor(Math.random() * (max - min)) + min;
}

function foodInSnake(foodPosX, foodPosY) {
    for (let i = 0; i < snake.position.length; i++) {
        if (snake.position[i].x === foodPosX && snake.position[i].y === foodPosY) {
            return true;
        }
    }
    return false;
}

// extension of the snake ^^ everyone wants that :D
function snakeIsOnFood() {
    if (food.position === undefined) {
        return false;
    }
    return (snake.position[0].x === food.position.x && snake.position[0].y === food.position.y);
}

function snakeIsOnPremiumFood() {
    if (food.premiumPosition === undefined) {
        return false;
    }
    return (snake.position[0].x === food.premiumPosition.x && snake.position[0].y === food.premiumPosition.y && food.premiumTimer < 15);
}

function snakeEatFood() {
    food.position = undefined;
    // we add on last position one element and then snake is bigger :)
    snake.position.push({
        x: snake.position[snake.position.length],
        y: snake.position[snake.position.length]
    });
}

// snake collisions that restart the game
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
        fastSpeedUp: 25,
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

// time turn faster when score up
function acceleration() {
    clearInterval(time);
    if (snake.fastSpeedUp > 0) {
        snake.speed -= snake.fastSpeedUp;
        snake.fastSpeedUp--;
    }
    time = setInterval(game, snake.speed);
}

// ScoreUP
function scoreUp(howMany) {
    snake.score += howMany;
    document.querySelector('h1').innerHTML = "Score: " + snake.score;
    acceleration();
}