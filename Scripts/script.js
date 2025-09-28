const canvas = document.getElementById("pongCanvas");
canvas.setAttribute('tabindex','0');
const ctx = canvas.getContext("2d");

const paddleWidth = 100;
const paddleHeight = 15;
const paddleY = canvas.height - paddleHeight - 10;
const paddleSpeed = 7;

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 0;
let dy = 0;
let rafId = null;
let timerId = null;
let seconds = 0;
let paddleX = (canvas.width - paddleWidth) / 2;
let moveLeft = false;
let moveRight = false;

const scoreEl = document.getElementById("score");
if (scoreEl) scoreEl.setAttribute('aria-live', 'polite');

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

    if (moveLeft){
        paddleX -= paddleSpeed;
        if (paddleX < 0) paddleX = 0;
    }

    if (moveRight){
        paddleX += paddleSpeed;
        if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
    }

    if (y + 15 >= paddleY && y + 15 <= paddleY + paddleHeight &&
        x >= paddleX && x <= paddleX + paddleWidth) {
        dy = -Math.abs(dy);
        const hitPos = (x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
        dx = (dx + hitPos * 2) || (hitPos * 2 || 1);
        y = paddleY - 15;
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 0;
    dy = 0;
    paddleX = (canvas.width - paddleWidth) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        const speed = 3;
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

canvas.addEventListener("touchmove", (e) => {
    let rect = canvas.getBoundingClientRect();
    let touchX = e.touches[0].clientX - rect.left;
    paddleX = touchX - paddleWidth / 2;
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
    e.preventDefault();
}, { passive: false });

let dragging = false;
canvas.addEventListener('mousedown', (e) => {
    dragging = true;
    const rect = canvas.getBoundingClientRect();
    paddleX = e.clientX - rect.left - paddleWidth / 2;
});
window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = canvas.getBoundingClientRect();
    paddleX = e.clientX - rect.left - paddleWidth / 2;
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
});
window.addEventListener('mouseup', () => { dragging = false; });

resetBoard();