const canvas = document.getElementById("pongCanvas");
canvas.setAttribute('tabindex','0');
const ctx = canvas.getContext("2d");

const logicalWidth = canvas.width;
const logicalHeight = canvas.height;

let paddleWidth = 100;
let paddleHeight = 15;
let paddleY = logicalHeight - paddleHeight - 10;
let paddleSpeed = 7;

let x = logicalWidth / 2;
let y = logicalHeight / 2;
let dx = 0;
let dy = 0;
const initialSpeed = 3;
const maxSpeed = initialSpeed * 5;
let speed = initialSpeed;

let rafId = null;
let timerId = null;
let seconds = 0;
let paddleX = (logicalWidth - paddleWidth) / 2;
let moveLeft = false;
let moveRight = false;

const scoreEl = document.getElementById("score");
if (scoreEl) scoreEl.setAttribute('aria-live', 'polite');

function getScale() {
    return canvas.clientWidth / logicalWidth;
}

function drawPaddle() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function increaseSpeed() {
    speed *= 1.05;
    if (speed > maxSpeed) speed = maxSpeed;
    const angle = Math.atan2(dy, dx);
    dx = Math.cos(angle) * speed;
    dy = Math.sin(angle) * speed;
}

function update() {
    x += dx;
    y += dy;

    if (x - 15 <= 0) { dx = -dx; x = 15; increaseSpeed(); }
    if (x + 15 >= logicalWidth) { dx = -dx; x = logicalWidth - 15; increaseSpeed(); }
    if (y - 15 <= 0) { dy = -dy; y = 15; increaseSpeed(); }

    if (y + 15 >= logicalHeight) {
        gameOver();
    }

    if (moveLeft){
        paddleX -= paddleSpeed;
        if (paddleX < 0) paddleX = 0;
    }
    if (moveRight){
        paddleX += paddleSpeed;
        if (paddleX + paddleWidth > logicalWidth) paddleX = logicalWidth - paddleWidth;
    }

    if (y + 15 >= paddleY && y + 15 <= paddleY + paddleHeight &&
        x >= paddleX && x <= paddleX + paddleWidth) {
        dy = -Math.abs(dy);
        const hitPos = (x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
        dx = (dx + hitPos * 2) || (hitPos * 2 || 1);
        y = paddleY - 15;
        increaseSpeed();
    }
}

function loop() {
    ctx.clearRect(0, 0, logicalWidth, logicalHeight);
    drawBall();
    drawPaddle();
    update();
    rafId = requestAnimationFrame(loop);
}

function startTimer() {
    if (timerId) return;
    seconds = 0;
    if (scoreEl) scoreEl.textContent = "Score : 0 s";
    timerId = setInterval(() => {
        seconds++;
        if (scoreEl) scoreEl.textContent = `Score : ${seconds} s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}

function gameOver() {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    stopTimer();

    const msg = document.getElementById("gameOverMessage");
    if (msg) {
        msg.textContent = `Vous avez perdu ! Votre score : ${seconds} s`;
        msg.classList.remove("hidden");
    }
}

function resetBoard() {
    x = logicalWidth / 2;
    y = logicalHeight / 2;
    dx = 0;
    dy = 0;
    speed = initialSpeed;
    paddleX = (logicalWidth - paddleWidth) / 2;
    ctx.clearRect(0, 0, logicalWidth, logicalHeight);
    drawBall();
    if (scoreEl) scoreEl.textContent = "Score : 0 s";
    const msg = document.getElementById("gameOverMessage");
    if (msg) msg.classList.add("hidden");
}

document.getElementById('start').addEventListener('click', () => {
    if (!rafId) {
        x = paddleX + paddleWidth / 2;
        y = paddleY - 15;

        const minAngle = Math.PI / 6;
        const maxAngle = Math.PI - Math.PI / 6;
        const angle = Math.random() * (maxAngle - minAngle) + minAngle;
        speed = initialSpeed;
        dx = Math.cos(angle) * speed;
        dy = -Math.abs(Math.sin(angle) * speed);

        startTimer();

        const msg = document.getElementById("gameOverMessage");
        if (msg) msg.classList.add("hidden");

        loop();
    }
});

document.getElementById('reset').addEventListener('click', () => {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    stopTimer();

    const msg = document.getElementById("gameOverMessage");
    if (msg) msg.classList.add("hidden");

    resetBoard();
});

document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowLeft") moveLeft = true;
    if (e.code === "ArrowRight") moveRight = true;
});
document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowLeft") moveLeft = false;
    if (e.code === "ArrowRight") moveRight = false;
});

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scale = getScale();
    return (e.clientX - rect.left) / scale - paddleWidth / 2;
}

canvas.addEventListener("touchmove", (e) => {
    paddleX = getMousePos(e.touches[0]);
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddleWidth > logicalWidth) paddleX = logicalWidth - paddleWidth;
    e.preventDefault();
}, { passive: false });

let dragging = false;
canvas.addEventListener('mousedown', (e) => { dragging = true; paddleX = getMousePos(e); });
window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    paddleX = getMousePos(e);
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddleWidth > logicalWidth) paddleX = logicalWidth - paddleWidth;
});
window.addEventListener('mouseup', () => { dragging = false; });

resetBoard();
