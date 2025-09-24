const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let leftScore = 0;
let rightScore = 0;

let x = 20;
let y = canvas.height / 2;
const speed = 2;
let rafId = null;

function drawBoard() {
    ctx.fillStyle = "black";
    for (let i = 0; i < canvas.height; i += 20) {
        ctx.fillRect(canvas.width / 2 - 2, i, 4, 10);
    }
}

function drawBall() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    x += speed;
    if (x > canvas.width - 15) x = -15;
}


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawBall();
    update();
    rafId = requestAnimationFrame(loop);
}

document.getElementById('start').addEventListener('click', () => {
    if (!rafId) {
        loop(); 
    }
});

document.getElementById('reset').addEventListener('click', () => {
    cancelAnimationFrame(rafId);
    rafId = null;
    x = 20; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawBall();
});
