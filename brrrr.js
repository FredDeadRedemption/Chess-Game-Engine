import { Move } from "./Move.js";

export const randomColor = () => {
	const arr = ['rgb(166, 188, 143)', 'rgb(143, 188, 147)', 'rgb(188, 143, 143)', 'rgb(143, 188, 188)'];
	return arr[Math.floor(Math.random() * arr.length)];
};

export const bitBoardToFileWhite = (index, squareSize) => {
	return (index % 8) * squareSize;
};

export const bitBoardToFileBlack = (index, squareSize) => {
  return (7 - (index % 8)) * squareSize;
};

export const bitBoardToRankWhite = (index, squareSize) => {
	return (8 - 1 - Math.floor(index / 8)) * squareSize;
};

export const bitBoardToRankBlack = (index, squareSize) => {
  return (Math.floor(index / 8)) * squareSize;
};

export const toBitBoardWhite = (file, rank) => {
	return (7 - rank) * 8 + file;
};

export const toBitBoardBlack = (file, rank) => {
	return rank * 8 + (7 - file);
};

export const validateTurn = (clickedSquare, { whiteToMove, occupiedSquaresWhite, occupiedSquaresBlack}) => {
  return (whiteToMove && occupiedSquaresWhite[clickedSquare]) || (!whiteToMove && occupiedSquaresBlack[clickedSquare]);
}

export const validateMove = (clickOrigin, clickTarget, moves) => {
  return moves.find((move) => move.origin === clickOrigin && move.target === clickTarget);
}

export const TOP = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1
];

export const BOTTOM = [ 
	1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const LEFT = [
	1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0
];

export const RIGHT = [
	0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1
];

const directionLookup = {
  "7": [TOP, LEFT],   // NW
  "9": [TOP, RIGHT],  // NE
  "-7": [BOTTOM, RIGHT], // SE
  "-9": [BOTTOM, LEFT],  // SW
  "8": [TOP],         // N
  "-8": [BOTTOM],   // S
  "1": [RIGHT],       // E
  "-1": [LEFT]      // W
};

export const squareOnEdge = (square, offset) => {
	const directions = directionLookup[offset] ?? []; // which edge to detect for based on offset?
  return directions.some(direction => direction[square]); // is it on the edge?
};

export const castSlidingRays = (originSquare, offsets, forWhite, { occupiedSquaresWhite, occupiedSquaresBlack }) => {
	let moves = [];

	offsets.forEach((offset) => {
		// stop if piece is already on edge based on its offset;
		if (squareOnEdge(originSquare, offset)) return;

		// cast sliding ray in offsets direction
		for (let i = 1; i < 8; i++) {
			const newTarget = originSquare + offset * i;

			// add new move if no friendly occupancy
			if ((forWhite && !occupiedSquaresWhite[newTarget]) || (!forWhite && !occupiedSquaresBlack[newTarget])) {
				moves.push(new Move(originSquare, newTarget));
			} else break;

			// stop further ray casting if new move hits edge
			if (squareOnEdge(newTarget, offset)) break;

			// stop further ray casting if new move hits enemy
			if ((forWhite && occupiedSquaresBlack[newTarget]) || (!forWhite && occupiedSquaresWhite[newTarget])) {
				break;
			}
		}
	});

	return moves;
};

// offsets
export const OFFSETS_BISHOP = [7, -7, 9, -9];

export const OFFSETS_ROOK = [8, -8, 1, -1];

export const OFFSETS_QUEEN = [7, -7, 9, -9, 8, -8, 1, -1];

export const OFFSETS_KING = [7, -7, 9, -9, 8, -8, 1, -1];

export const DOUBLEPAWNWHITE = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const DOUBLEPAWNBLACK = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export let occupiedSquaresWhite = [
	1, 1, 1, 1, 1, 1, 1, 1, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export let occupiedSquaresBlack = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  1, 1, 1, 1, 1, 1, 1, 1
];

export let whiteKingBit = [
	0, 0, 0, 0, 1, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export let whiteQueensBit = [
	0, 0, 0, 1, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export let whiteBishopsBit = [
	0, 0, 1, 0, 0, 1, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export let whiteKnightsBit = [
	0, 1, 0, 0, 0, 0, 1, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export let whiteRooksBit = [
	1, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export let whitePawnsBit = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export let blackKingBit = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 1, 0, 0, 0
];

export let blackQueensBit = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 1, 0, 0, 0, 0
];

export let blackBishopsBit = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 1, 0, 0, 1, 0, 0
];

export let blackKnightsBit = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 1, 0, 0, 0, 0, 1, 0
];

export let blackRooksBit = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 1
];

export let blackPawnsBit = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export let pieceIndex = [
  "R", "N", "B", "Q", "K", "B", "N", "R",
  "P", "P", "P", "P", "P", "P", "P", "P",
  " ", " ", " ", " ", " ", " ", " ", " ",
  " ", " ", " ", " ", " ", " ", " ", " ",
  " ", " ", " ", " ", " ", " ", " ", " ",
  " ", " ", " ", " ", " ", " ", " ", " ",
  "p", "p", "p", "p", "p", "p", "p", "p",
  "r", "n", "b", "q", "k", "b", "n", "r",
];


