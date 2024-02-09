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

export const animateChessboard = () => {
	let squareIsLight = true;
	for (let file = 0; file < 8; file++) {
		for (let rank = 0; rank < 8; rank++) {
			squareIsLight ? (ctx.fillStyle = lightSquareColor) : (ctx.fillStyle = randomColor()); //hihi

			ctx.fillRect(rank * squareSize, file * squareSize, squareSize, squareSize);
			squareIsLight = !squareIsLight;
		}
		squareIsLight = !squareIsLight;
	}
};

// x = piece type, y = piece color
export const animatePieces = ({ pieceIndex }) => {
	for (let i = 0; i < pieceIndex.length; i++) {
		let x, y;
		pieceIndex[i] === pieceIndex[i].toUpperCase() ? (y = 0) : (y = 200);
		x =
			pieceIndex[i] === 'K' || pieceIndex[i] === 'k'
				? 0
				: pieceIndex[i] === 'Q' || pieceIndex[i] === 'q'
				? 200
				: pieceIndex[i] === 'B' || pieceIndex[i] === 'b'
				? 400
				: pieceIndex[i] === 'N' || pieceIndex[i] === 'n'
				? 600
				: pieceIndex[i] === 'R' || pieceIndex[i] === 'r'
				? 800
				: pieceIndex[i] === 'P' || pieceIndex[i] === 'p'
				? 1000
				: null;
		if (x !== null) {
			ctx.drawImage(spriteSheet, x, y, 200, 200, bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize, squareSize);
		}
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

export const animateContestedSquares = ({ contestedSquaresWhite, contestedSquaresBlack }) => {
	// set initial color
	console.log('brrrr', contestedSquaresWhite);
	ctx.fillStyle = 'red';
	for (let i = 0; i < 64; i++) {
		if (contestedSquaresWhite[i]) {
			console.log(i);
			ctx.fillRect(bitBoardToFileWhite(i, squareSize), bitBoardToRankWhite(i, squareSize), squareSize / 6, squareSize / 6);
		}
	}
};
