let lastRenderTime = 0;
const SNAKE_SPED = .2;
// let onSnake = 0;
let newSegments = 0;
let gameOver = false;
function main(currentTime) {
    if(gameOver) {
        return alert("Game Over!")
    }
    window.requestAnimationFrame(main);
    const secondRender = (currentTime - lastRenderTime) / 1000;
   if(secondRender < SNAKE_SPED /1) return;
    // console.log("render");

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

let gameBoard = document.getElementById('game-board');
function update() {
    updateSnake();
    updateFood();
    // checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}


//  Snake Game //

const snakeBody = [{x: 10, y: 11}]

function updateSnake() {
    // console.log("updateSnake")
    addSegment()
    let inputDirection = getInputDirection();
    for(let i = snakeBody.length-2;  i >= 0; i--) {
        snakeBody[i+1] = {...snakeBody[i]};
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

function drawSnake(gameBoard) {
    // console.log("drawSnake")
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    })
}


function expandSnake(amount) {
    newSegments += amount;
}
function onSnake(position) {
    return snakeBody.some(segment => {
        return equalPosition(segment, position)
    })
}

function equalPosition(pos1 , pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegment() {
    for(let i = 0; i < newSegments; i++) {
        snakeBody[snakeBody.length] = ({...snakeBody[snakeBody.length-1]})
    }
    newSegments = 0;
}
// input User //

let inputDirection = { x: 0, y:0 };
let lastInputDirection = { x: 0, y:0}
window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "ArrowUp":
            if(lastInputDirection.y != 0) break;
            inputDirection = { x: 0, y: -1};
            break;
        case "ArrowDown":
            if(lastInputDirection.y != 0) break;
            inputDirection = { x: 0, y: 1};
            break;
        case "ArrowLeft":
            if(lastInputDirection.x != 0) break;
            inputDirection = { x: -1, y: 0};
            break;
        case "ArrowRight":
            if(lastInputDirection.x != 0) break;
            inputDirection = { x: 1, y:0};
            break;
    }
})

function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection;
}

// food Game //
let food = getRandomFood();
const EXPANSION_RATE = 1;
function updateFood() {
    if(onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFood ();
    }
}

function drawFood(gameBoard) {
    // console.log("drawSnake")
    
        const foodElement = document.createElement("div");
        foodElement.style.gridColumnStart = food.x;
        foodElement.style.gridRowStart = food.y;
        foodElement.classList.add("food");
        gameBoard.appendChild(foodElement);
}

function getRandomFood() {
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
}

//  randomGridPosition //
let GRID_SIZE = 21;
function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * 21 ) + 1,
        y: Math.floor(Math.random() *21 )+ 1
    }
}


// function checkDeath() {
//     gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
// }

// function outsideGrid(position) {
//     return {
//        position.y
//     };

// }