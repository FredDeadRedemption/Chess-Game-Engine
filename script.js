import {
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
	PIECE_INDEX_INIT
} from './brrrr.js';
import { animateChessboard, animatePieces } from './render.js';

const clickGrid = document.getElementById('clickGrid');

animateChessboard();

let state = {
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

//animateChessboard(ctx, squareSize);

setTimeout(() => {
	animatePieces(state);
}, 4);

clickGrid.addEventListener(
	'click',
	(event) => {
		console.log(event.target.id);
	},
	{ captureOn: true } //stop event bubbling
);

console.log(state);
