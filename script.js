const CANVAS_SIZE = {
    w: 800.0,
    h: 800.0,
};
const FRAMERATE = 6.0;
const STEP = 32.0;

const DIR = {
    RIGHT: "right",
    LEFT:  "left",
    UP:    "up",
    DOWN:  "down",
};

const snake = {
    head: {
        x: 0.0,
        y: 0.0,
    },
    parts: [],
    size: {
        w: STEP,
        h: STEP,
    },
    direction: DIR.RIGHT,
};
const STARTING_SNAKE_SIZE = 3;

let food = null;
const FOOD_SIZE = {
    w: snake.size.w * 0.5,
    h: snake.size.h * 0.5,
};

function setup() {
    createCanvas(CANVAS_SIZE.w, CANVAS_SIZE.h);
    frameRate(FRAMERATE);
    rectMode(CENTER);

    spawnFood();
    for (let i = 0; i < STARTING_SNAKE_SIZE; i++) {
        addSnakePart();
    }
}

function spawnFood() {
    let x = Math.random() * CANVAS_SIZE.w;
    x -= x % STEP;
    let y = Math.random() * CANVAS_SIZE.h;
    y -= y % STEP;
    food = {
        x: x,
        y: y,
    };
}

function addSnakePart() {
    let x, y;
    const lastPart = snake.parts[snake.parts.length - 1];
    if (lastPart) {
        x = lastPart.x;
        y = lastPart.y;
    } else {
        x = snake.head.x;
        y = snake.head.y;
    }
    snake.parts.push({
        x: x,
        y: y,
    });
}

function keyPressed() {
    const letter = String
        .fromCharCode(keyCode)
        .toUpperCase();

    // Check WASD
    switch (letter) {
        case "A":
            snake.direction = DIR.LEFT;
            return;
        case "D":
            snake.direction = DIR.RIGHT;
            return;
        case "W":
            snake.direction = DIR.UP;
            return;
        case "S":
            snake.direction = DIR.DOWN;
            return;
    }

    // Check arrow keys
    switch (keyCode) {
        case 37:
            snake.direction = DIR.LEFT;
            return;
        case 39:
            snake.direction = DIR.RIGHT;
            return;
        case 38:
            snake.direction = DIR.UP;
            return;
        case 40:
            snake.direction = DIR.DOWN;
            return;
    }
}

function moveSnake() {
    moveSnakeHead();
    moveSnakeParts();
}

function moveSnakeHead() {
    switch (snake.direction) {
        case DIR.LEFT:
            snake.head.x -= STEP;
            break;
        case DIR.RIGHT:
            snake.head.x += STEP;
            break;
        case DIR.UP:
            snake.head.y -= STEP;
            break;
        case DIR.DOWN:
            snake.head.y += STEP;
            break;
    }

    // Loop around
    snake.head.x = (CANVAS_SIZE.w + snake.head.x) % CANVAS_SIZE.w;
    snake.head.y = (CANVAS_SIZE.h + snake.head.y) % CANVAS_SIZE.h;
}

function moveSnakeParts() {
    for (let i = snake.parts.length - 1; i >= 0; i--) {
        const part = snake.parts[i];
        const prevPart = snake.parts[i - 1];
        let x, y;
        if (prevPart) {
            x = prevPart.x;
            y = prevPart.y;
        } else {
            x = snake.head.x;
            y = snake.head.y;
        }
        part.x = x;
        part.y = y;
    }
}

function checkCollisionWithFood() {
    // If food doesn't exist, then don't try to check for collision
    if (!food) return;

    if (
        snake.head.x == food.x
        && snake.head.y == food.y
    ) {
        addSnakePart();
        spawnFood();
    }
}

function draw() {
    update();
    render();
}

function update() {
    moveSnake();
    checkCollisionWithFood();
}

function render() {
    // background color
    background(128, 128, 128);

    // snake parts
    for (let i = 0; i < snake.parts.length; i++) {
        const part = snake.parts[i];
        fill(200, 0, 0);
        rect(
            part.x,
            part.y,
            snake.size.w,
            snake.size.h
        );
    }

    // snake head
    fill(255, 0, 0);
    rect(
        snake.head.x,
        snake.head.y,
        snake.size.w,
        snake.size.h
    );

    // food
    if (food) {
        fill(0, 255, 0);
        rect(
            food.x,
            food.y,
            FOOD_SIZE.w,
            FOOD_SIZE.h,
        );
    }

    // score
    const score = snake.parts.length - STARTING_SNAKE_SIZE;
    fill(0, 0, 255);
    textSize(32);
    text(score, STEP, STEP);
}
