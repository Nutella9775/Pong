const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let leftScore = 0;
let rightScore = 0;

let x = canvas.width / 2;      
let y = canvas.height / 2;    
let dx = 3;                    
let dy = -3;                
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
    x += dx;
    y += dy;

    if (x - 15 <= 0) {
        dx = -dx;
        x = 15; 
    }
    if (x + 15 >= canvas.width) {
        dx = -dx;
        x = canvas.width - 15;
    }
    if (y - 15 <= 0) {
        dy = -dy;
        y = 15;
    }   
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
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 3;
    dy = -3;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawBall();
});
