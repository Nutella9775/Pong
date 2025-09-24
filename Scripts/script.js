const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
const paddleWidth = 100;
const paddleHeight = 15;
const paddleY = canvas.height - paddleHeight - 10; 

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 0;
let dy = 0;
let rafId = null;
let timerId = null;
let seconds = 0;
let paddleX = (canvas.width - paddleWidth) / 2;

function drawBoard() {
    ctx.fillStyle = "black";
    for (let i = 0; i < canvas.height; i += 20) {
        ctx.fillRect(canvas.width / 2 - 2, i, 4, 10);
    }
}

function drawPaddle(){
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    x += dx;
    y += dy;

    if (x - 15 <= 0) { dx = -dx; x = 15; }
    if (x + 15 >= canvas.width) { dx = -dx; x = canvas.width - 15; }
    if (y - 15 <= 0) { dy = -dy; y = 15; }

    if (y + 15 >= canvas.height) {
        gameOver();
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawBall();
    drawPaddle();
    update();
    rafId = requestAnimationFrame(loop);
}

function startTimer() {
    seconds = 0;
    document.getElementById("score").textContent = "Score : 0 s";
    timerId = setInterval(() => {
        seconds++;
        document.getElementById("score").textContent = `Score : ${seconds} s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}


function gameOver() {
    cancelAnimationFrame(rafId);
    rafId = null;
    stopTimer();

    const msg = document.getElementById("gameOverMessage");
    msg.textContent = `Vous avez perdu ! Votre score : ${seconds} s`;
    msg.classList.remove("hidden");
}

function resetBoard() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 0;
    dy = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawBall();
    document.getElementById("score").textContent = "Score : 0 s";
}

document.getElementById('start').addEventListener('click', () => {
    if (!rafId) {
        let speed = 3;
        dx = (Math.random() < 0.5 ? -1 : 1) * speed;
        dy = (Math.random() < 0.5 ? -1 : 1) * speed;

        loop();
        startTimer();
    }
});

document.getElementById('reset').addEventListener('click', () => {
    cancelAnimationFrame(rafId);
    rafId = null;
    stopTimer();

    document.getElementById("gameOverMessage").classList.add("hidden");

    resetBoard();
});
