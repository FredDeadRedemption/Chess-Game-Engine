import {
	validateTurn,
	ZERO_TABLE,
	occupiedSquaresBlack,
	occupiedSquaresWhite,
	whiteKingBit,
	whiteQueensBit,
	whiteBishopsBit,
	whiteRooksBit,
	whiteKnightsBit,
	whitePawnsBit,
	blackKingBit,
	blackQueensBit,
	blackBishopsBit,
	blackRooksBit,
	blackKnightsBit,
	blackPawnsBit,
	pieceIndex,
	validateMove
} from './brrrr.js';
import { animateChessboard, animatePieces, animateMoves, animateContestedSquares } from './render.js';
import { generateMoves } from './moveGen.js';

let state = {
	whiteToMove: true,
	occupiedSquaresWhite: occupiedSquaresWhite,
	occupiedSquaresBlack: occupiedSquaresBlack,
	contestedSquaresWhite: structuredClone(ZERO_TABLE),
	contestedSquaresBlack: structuredClone(ZERO_TABLE),
	whiteDeathRays: structuredClone(ZERO_TABLE),
	blackDeathRays: structuredClone(ZERO_TABLE),
	bitBoards: {
		K: whiteKingBit,
		Q: whiteQueensBit,
		B: whiteBishopsBit,
		R: whiteRooksBit,
		N: whiteKnightsBit,
		P: whitePawnsBit,
		k: blackKingBit,
		q: blackQueensBit,
		b: blackBishopsBit,
		r: blackRooksBit,
		n: blackKnightsBit,
		p: blackPawnsBit
	},
	pieceIndex: pieceIndex,
	moves: []
};

// snapshot = structuredClone(state) :D

const executeMove = (origin, target, piece) => {
	// handle origin
	state.pieceIndex[origin] = ' ';
	state.bitBoards[piece][origin] = 0;

	state.occupiedSquaresWhite[origin] = 0;
	state.occupiedSquaresBlack[origin] = 0;

	// handle target
	state.pieceIndex[target] = piece;
	state.bitBoards[piece][target] = 1;
	// handle capture
	if (state.whiteToMove) {
		state.occupiedSquaresWhite[target] = 1;
		state.occupiedSquaresBlack[target] = 0;
	} else {
		state.occupiedSquaresBlack[target] = 1;
		state.occupiedSquaresWhite[target] = 0;
	}
	// flip turn
	state.whiteToMove = !state.whiteToMove;
	// generate new moves
	let { whiteMoves, blackMoves } = generateMoves(state);

	console.log(state.contestedSquaresWhite);
	state.moves = [...whiteMoves, ...blackMoves];
	//console.table('IIWEIUH', state.occupiedSquaresWhite);
};

animateChessboard();
setTimeout(() => {
	animatePieces(state);
}, 44);

let firstClick = true;
let firstClickedSquare = null;

const handleFirstClick = (clickedSquare) => {
	if (validateTurn(clickedSquare, state)) {
		animateMoves(clickedSquare, state);
		animatePieces(state);
		firstClickedSquare = clickedSquare;
		firstClick = false;
	}
};

const resetClick = () => {
	firstClick = true;
	animateChessboard();
	animatePieces(state);
};

const handleSecondClick = (clickedSquare) => {
	// if second click is friendly piece, consider it new first click
	if (validateTurn(clickedSquare, state)) {
		animateChessboard();
		handleFirstClick(clickedSquare);
	}
	// if second click is valid move, execute
	else if (validateMove(firstClickedSquare, clickedSquare, state.moves)) {
		executeMove(firstClickedSquare, clickedSquare, state.pieceIndex[firstClickedSquare]);
		resetClick();
		animateContestedSquares(state);
	}
	// reset
	else {
		resetClick();
	}
};

document.getElementById('clickGrid').addEventListener(
	'click',
	(event) => {
		firstClick ? handleFirstClick(parseInt(event.target.id)) : handleSecondClick(parseInt(event.target.id));
	},
	{ capture: true }
);

state.moves = [...generateMoves(state).whiteMoves, ...generateMoves(state).blackMoves];
