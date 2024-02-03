import {
	validateTurn,
	CONTESTED_SQUARES_BLACK_INIT,
	CONTESTED_SQUARES_WHITE_INIT,
	OCCUPIED_SQUARES_ALL_INIT,
	OCCUPIED_SQUARES_BLACK_INIT,
	OCCUPIED_SQUARES_WHITE_INIT,
	WHITE_KING_INIT,
	WHITE_QUEENS_INIT,
	WHITE_BISHOPS_INIT,
	WHITE_ROOKS_INIT,
	WHITE_KNIGHTS_INIT,
	WHITE_PAWNS_INIT,
	WHITE_DEATH_RAYS_INIT,
	BLACK_KING_INIT,
	BLACK_QUEENS_INIT,
	BLACK_BISHOPS_INIT,
	BLACK_ROOKS_INIT,
	BLACK_KNIGHTS_INIT,
	BLACK_PAWNS_INIT,
	BLACK_DEATH_RAYS_INIT,
	PIECE_INDEX_INIT,
	findValidMove
} from './brrrr.js';
import { animateChessboard, animatePieces, animateMoves } from './render.js';
import { generatePawnMoves, generateBishopMoves, generateKingMoves, generateKnightMoves, generateQueenMoves, generateRookMoves } from './moveGen.js';

animateChessboard();

let state = {
	whiteToMove: true,
	occupiedSquaresWhite: OCCUPIED_SQUARES_WHITE_INIT,
	occupiedSquaresBlack: OCCUPIED_SQUARES_BLACK_INIT,
	occupiedSquaresAll: OCCUPIED_SQUARES_ALL_INIT,
	contestedSquaresWhite: CONTESTED_SQUARES_WHITE_INIT,
	contestedSquaresBlack: CONTESTED_SQUARES_BLACK_INIT,
	whiteDeathRays: WHITE_DEATH_RAYS_INIT,
	blackDeathRays: BLACK_DEATH_RAYS_INIT,
	whiteKing: WHITE_KING_INIT,
	whiteQueens: WHITE_QUEENS_INIT,
	whiteBishops: WHITE_BISHOPS_INIT,
	whiteRooks: WHITE_ROOKS_INIT,
	whiteKnights: WHITE_KNIGHTS_INIT,
	whitePawns: WHITE_PAWNS_INIT,
	blackKing: BLACK_KING_INIT,
	blackQueens: BLACK_QUEENS_INIT,
	blackBishops: BLACK_BISHOPS_INIT,
	blackRooks: BLACK_ROOKS_INIT,
	blackKnights: BLACK_KNIGHTS_INIT,
	blackPawns: BLACK_PAWNS_INIT,
	pieceIndex: PIECE_INDEX_INIT
};

let temp = structuredClone(state);

//animateChessboard(ctx, squareSize);

setTimeout(() => {
	animatePieces(state);
}, 44);

let firstClick = true;
let firstClickedSquare = null;

const handleFirstClick = (clickedSquare) => {
	if (validateTurn(clickedSquare, state)) {
		animateMoves(clickedSquare, moves, state);
		animatePieces(state);
		firstClickedSquare = clickedSquare;
		firstClick = false;
	}
};

const handleSecondClick = (clickedSquare) => {
	// if second click is friendly piece, consider it first click
	if (validateTurn(clickedSquare, state)) {
		animateChessboard();
		handleFirstClick(clickedSquare);
	}
	// if second click is valid execute the move
	else if (findValidMove(firstClickedSquare, clickedSquare, moves)) {
		console.log('LEGIT MOVE');
		firstClick = true;
		animateChessboard();
		animatePieces(state);
		state.whiteToMove = !state.whiteToMove;
	}
	// reset
	else {
		firstClick = true;
		animateChessboard();
		animatePieces(state);
	}
};

document.getElementById('clickGrid').addEventListener(
	'click',
	(event) => {
		firstClick ? handleFirstClick(parseInt(event.target.id)) : handleSecondClick(parseInt(event.target.id));
	},
	{ captureOn: true }
);

console.log(state);

let moves = [];

const generateMoves = ({ pieceIndex }) => {
	for (let i = 0; i < 64; i++) {
		let forWhite;
		pieceIndex[i] === pieceIndex[i].toUpperCase() ? (forWhite = true) : (forWhite = false);
		switch (pieceIndex[i]) {
			case 'K':
			case 'k':
				moves.push(...generateKingMoves(i, forWhite, state));
				break;
			case 'Q':
			case 'q':
				moves.push(...generateQueenMoves(i, forWhite, state));
				break;
			case 'B':
			case 'b':
				moves.push(...generateBishopMoves(i, forWhite, state));
				break;
			case 'N':
			case 'n':
				moves.push(...generateKnightMoves(i, forWhite, state));
				break;
			case 'R':
			case 'r':
				moves.push(...generateRookMoves(i, forWhite, state));
				break;
			case 'P':
			case 'p':
				moves.push(...generatePawnMoves(i, forWhite, state));
				break;
		}
	}
};

generateMoves(state);

console.table(moves);
