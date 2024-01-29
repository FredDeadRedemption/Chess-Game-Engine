import { randomColor, bitBoardToRankWhite, bitBoardToFileWhite } from './brrrr.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Board
const boardSize = 1000; //Changable (900x900 standard)
const squareSize = boardSize / 8;
canvas.width = boardSize;
canvas.height = boardSize;
clickGrid.style.height = boardSize + 'px';
clickGrid.style.width = boardSize + 'px';
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

const lightSquareColor = 'wheat';
const darkSquareColor = randomColor();

document.getElementById('56').style.color = darkSquareColor;
document.getElementById('48').style.color = lightSquareColor;
document.getElementById('40').style.color = darkSquareColor;
document.getElementById('32').style.color = lightSquareColor;
document.getElementById('24').style.color = darkSquareColor;
document.getElementById('16').style.color = lightSquareColor;
document.getElementById('8').style.color = darkSquareColor;
document.getElementById('0').style.color = lightSquareColor;

const spriteSheet = new Image();
spriteSheet.src = '/chess.png';

export const animateChessboard = () => {
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

export const animatePieces = ({ pieceIndex }) => {
	for (let i = 0; i < pieceIndex.length; i++) {
		let multiplier;
		pieceIndex[i] === pieceIndex[i].toUpperCase() ? (multiplier = 0) : (multiplier = 200);
		switch (pieceIndex[i]) {
			case 'K':
			case 'k':
				ctx.drawImage(spriteSheet, 0, multiplier, 200, 200, bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize, squareSize);
				break;
			case 'Q':
			case 'q':
				ctx.drawImage(spriteSheet, 200, multiplier, 200, 200, bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize, squareSize);
				break;
			case 'B':
			case 'b':
				ctx.drawImage(spriteSheet, 400, multiplier, 200, 200, bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize, squareSize);
				break;
			case 'N':
			case 'n':
				ctx.drawImage(spriteSheet, 600, multiplier, 200, 200, bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize, squareSize);
				break;
			case 'R':
			case 'r':
				ctx.drawImage(spriteSheet, 800, multiplier, 200, 200, bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize, squareSize);
				break;
			case 'P':
			case 'p':
				ctx.drawImage(spriteSheet, 1000, multiplier, 200, 200, bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize, squareSize);
				break;
		}
	}
};
