import {
	OFFSETS_BISHOP,
	OFFSETS_ROOK,
	OFFSETS_QUEEN,
	OFFSETS_KING,
	squareOnEdge,
	castSlidingRays,
	WHITE_PAWNS_INIT,
	BLACK_PAWNS_INIT
} from './brrrr.js';
import { Move } from './Move.js';

export const generatePawnMoves = (originSquare, forWhite, { occupiedSquaresAll, occupiedSquaresBlack, occupiedSquaresWhite }) => {
	let moves = [];
	let offsets = [];

	forWhite ? (offsets = [8, 16, 7, 9]) : (offsets = [-8, -16, -7, -9]);

	// advancing once and twice
	if (!occupiedSquaresAll[originSquare + offsets[0]] && !squareOnEdge(originSquare, offsets[0])) {
		moves.push(new Move(originSquare, originSquare + offsets[0]));
		if (
			((forWhite && WHITE_PAWNS_INIT[originSquare]) || (!forWhite && BLACK_PAWNS_INIT[originSquare])) &&
			!occupiedSquaresAll[originSquare + offsets[1]]
		) {
			moves.push(new Move(originSquare, originSquare + offsets[1]));
		}
	}
	//moving (attacking) left
	if (
		((forWhite && occupiedSquaresBlack[originSquare + offsets[2]]) || (!forWhite && occupiedSquaresWhite[originSquare + offsets[2]])) &&
		!squareOnEdge(originSquare, offsets[2])
	) {
		moves.push(new Move(originSquare, originSquare + offsets[2]));
	}
	//moving (attacking) right
	if (
		((forWhite && occupiedSquaresBlack[originSquare + offsets[3]]) || (!forWhite && occupiedSquaresWhite[originSquare + offsets[2]])) &&
		!squareOnEdge(originSquare, offsets[3])
	) {
		moves.push(new Move(originSquare, originSquare + offsets[3]));
	}

	return moves;
};

export const generateBishopMoves = (originSquare, forWhite, state) => {
	return castSlidingRays(originSquare, OFFSETS_BISHOP, forWhite, state);
};

export const generateRookMoves = (originSquare, forWhite, state) => {
	return castSlidingRays(originSquare, OFFSETS_ROOK, forWhite, state);
};

export const generateQueenMoves = (originSquare, forWhite, state) => {
	return castSlidingRays(originSquare, OFFSETS_QUEEN, forWhite, state);
};

export const generateKingMoves = (originSquare, forWhite, { occupiedSquaresWhite, occupiedSquaresBlack }) => {
	let moves = [];

	OFFSETS_KING.forEach((offset) => {
		const target = originSquare + offset;
		if (!squareOnEdge(originSquare, offset) && ((forWhite && !occupiedSquaresWhite[target]) || (!forWhite && !occupiedSquaresBlack[target]))) {
			moves.push(new Move(originSquare, target));
		}
	});

	/*
  // right
  if (!RIGHT[originSquare]) {
    moves.push(originSquare + 9);
    moves.push(originSquare + 1);
    moves.push(originSquare - 7);
  }
  // left
  if (!LEFT[originSquare]) {
    moves.push(originSquare + 7);
    moves.push(originSquare - 1);
    moves.push(originSquare - 9);
  }
  // up
  if (!TOP[originSquare]) moves.push(originSquare + 8);
  // down
  if (!BOTTOM[originSquare]) moves.push(originSquare - 8);
  */
	/*
	// TODO: + check if squares between king and rook are contested
	// castling
	if (!this.HasMoved()) {
		// castle short white
		if (
			this.isWhite() &&
			!this.getBoard().getPieces()[23].HasMoved() &&
			!this.getBoard().getPieces()[23].getHasBeenSlaughtered() &&
			!Util.hasOccupant(5, this.getBoard()) &&
			!Util.hasOccupant(6, this.getBoard())
		) {
			moves.add(6);
		}
		// castle long white
		if (
			this.isWhite() &&
			!this.getBoard().getPieces()[16].HasMoved() &&
			!this.getBoard().getPieces()[16].getHasBeenSlaughtered() &&
			!Util.hasOccupant(1, this.getBoard()) &&
			!Util.hasOccupant(2, this.getBoard()) &&
			!Util.hasOccupant(3, this.getBoard())
		) {
			moves.add(2);
		}
		// castle short black
		if (
			!isWhite() &&
			!this.getBoard().getPieces()[7].HasMoved() &&
			!this.getBoard().getPieces()[7].getHasBeenSlaughtered() &&
			!Util.hasOccupant(61, this.getBoard()) &&
			!Util.hasOccupant(62, this.getBoard())
		) {
			moves.add(62);
		}
		// castle long black
		if (
			!isWhite() &&
			!this.getBoard().getPieces()[0].HasMoved() &&
			!this.getBoard().getPieces()[0].getHasBeenSlaughtered() &&
			!Util.hasOccupant(57, this.getBoard()) &&
			!Util.hasOccupant(58, this.getBoard()) &&
			!Util.hasOccupant(59, this.getBoard())
		) {
			moves.add(58);
		}
	}
	*/
	return moves;
};

export const generateKnightMoves = (originSquare, forWhite, { occupiedSquaresWhite, occupiedSquaresBlack }) => {
	let moves = [];

	let factor = 1;
	const file = originSquare % 8;

	for (let i = 0; i < 2; i++) {
		const targets = [originSquare - 6 * factor, originSquare - 10 * factor, originSquare - 15 * factor, originSquare - 17 * factor];

		targets.forEach((target) => {
			if ((forWhite && !occupiedSquaresWhite[target]) || (!forWhite && !occupiedSquaresBlack[target])) {
				moves.push(new Move(originSquare, target));
			}
		});

		factor = factor * -1;
	}

	for (let i = moves.length - 1; i >= 0; i--) {
		if ((file < 2 && moves[i].target % 8 > file + 2) || (file > 5 && moves[i].target % 8 < file - 2) || moves[i].target < 0 || moves[i].target > 63) {
			moves.splice(i, 1);
		}
	}

	return moves;
};
