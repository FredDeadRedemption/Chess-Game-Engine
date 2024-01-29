import { randomColor } from "./brrrr.js";

const lightSquareColor = "wheat";
const darkSquareColor = randomColor();

document.getElementById("56").style.color = darkSquareColor;
document.getElementById("40").style.color = darkSquareColor;
document.getElementById("24").style.color = darkSquareColor;
document.getElementById("8").style.color = darkSquareColor;
document.getElementById("0").style.color = lightSquareColor;
document.getElementById("16").style.color = lightSquareColor;
document.getElementById("32").style.color = lightSquareColor;
document.getElementById("48").style.color = lightSquareColor;

export const animateChessboard = (ctx, squareSize) => {
  let squareIsLight = true;
  for (let file = 0; file < 8; file++) {
    for (let rank = 0; rank < 8; rank++) {
      squareIsLight ? (ctx.fillStyle = lightSquareColor) : (ctx.fillStyle = darkSquareColor);

      ctx.fillRect(rank * squareSize, file * squareSize, squareSize, squareSize);
      squareIsLight = !squareIsLight;
    }
    squareIsLight = !squareIsLight;
  }
};

export const animatePieces = (ctx, state) => {};
