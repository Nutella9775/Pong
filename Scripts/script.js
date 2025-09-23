const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let leftScore = 0;
let rightScore = 0;

function drawBoard() {
    ctx.fillStyle = "black";

    for (let i = 0; i < canvas.height; i += 20) {
        ctx.fillRect(canvas.width / 2 - 2, i, 4, 10);
    }
}


drawBoard();
