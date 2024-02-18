import { randomColor, bitBoardToRankWhite, bitBoardToFileWhite } from './brrrr.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Board
const boardSize = 1000; //Changable (900x900 standard)
const squareSize = boardSize / 8;
canvas.width = boardSize;
canvas.height = boardSize;
clickGrid.style.height = boardSize + 'px';
clickGrid.style.width = boardSize + 'px';
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

// Colors
const lightSquareColor = 'beige';
const darkSquareColor = randomColor();
const colorMoves = 'rgba(255, 140, 0, 0.5)'; // alt --> "rgba(135, 206, 235, 0.6)";
const colorAttacks = 'rgba(255, 0, 0, 0.5)';

const spriteSheet = new Image();
spriteSheet.src = '/chess.png';

const spriteSheetLookupX = {
	K: 0,
	Q: 200,
	B: 400,
	N: 600,
	R: 800,
	P: 1000
};

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
		let x, y;
		// get y value (piece color)
		pieceIndex[i] === pieceIndex[i].toUpperCase() ? (y = 0) : (y = 200);
		// get x value (piece type)
		x = spriteSheetLookupX[pieceIndex[i].toUpperCase()];
		// render if piece
		x !== null &&
			ctx.drawImage(spriteSheet, x, y, 200, 200, bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize, squareSize);
	}
};

export const animateMoves = (originSquare, { moves, whiteToMove, occupiedSquaresWhite, occupiedSquaresBlack }) => {
	// set initial color
	ctx.fillStyle = colorMoves;
	const validMoves = moves.filter((move) => move.origin === originSquare);

	// loop moves
	validMoves.forEach((move) => {
		if ((whiteToMove && occupiedSquaresBlack[move.target]) || (!whiteToMove && occupiedSquaresWhite[move.target])) {
			ctx.fillStyle = colorAttacks;
		}

		ctx.fillRect(bitBoardToFileWhite(move.target, squareSize), bitBoardToRankWhite(move.target, squareSize), squareSize, squareSize);

		ctx.fillStyle = colorMoves;
	});

	ctx.fillStyle = colorAttacks;
	ctx.fillRect(bitBoardToFileWhite(originSquare, squareSize), bitBoardToRankWhite(originSquare, squareSize), squareSize, squareSize);
};

export const animateContestedSquares = ({ whiteToMove, contestedSquaresWhite, contestedSquaresBlack }) => {
	// set initial color
	console.log('brrrr', contestedSquaresWhite);
	let arr;

	if (!whiteToMove) {
		ctx.fillStyle = 'red';
		arr = contestedSquaresWhite;
	} else {
		ctx.fillStyle = 'blue';
		arr = contestedSquaresBlack;
	}

	for (let i = 0; i < 64; i++) {
		if (arr[i]) {
			console.log(i);
			ctx.fillRect(bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize / 6, squareSize / 6);
		}
	}
};
