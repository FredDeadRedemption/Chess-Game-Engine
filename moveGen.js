import {
	OFFSETS_BISHOP,
	OFFSETS_ROOK,
	OFFSETS_QUEEN,
	OFFSETS_KING,
	squareOnEdge,
	castSlidingRays,
	DOUBLEPAWNWHITE,
	DOUBLEPAWNBLACK,
	hasEvilOccupance,
	hasNoOccupance,
	hasDoublePawnMoveRights,
	hasFriendlyOccupance,
	contestedByEnemy
} from './brrrr.js';
import { Move } from './Move.js';

export const generateMoves = (state) => {
	let whiteMoves = [];
	let whitePawnMoves = [];
	// Generate all white moves
	for (let i = 0; i < 64; i++) {
		switch (state.pieceIndex[i]) {
			case 'K':
				whiteMoves.push(...generateKingMoves(i, true, state));
				break;
			case 'Q':
				whiteMoves.push(...generateQueenMoves(i, true, state));
				break;
			case 'B':
				whiteMoves.push(...generateBishopMoves(i, true, state));
				break;
			case 'N':
				whiteMoves.push(...generateKnightMoves(i, true, state));
				break;
			case 'R':
				whiteMoves.push(...generateRookMoves(i, true, state));
				break;
			case 'P':
				whitePawnMoves.push(...generatePawnMoves(i, true, state));
				break;
		}
	}
	// Map white contested squares in game state for all pieces except pawns
	state.contestedSquaresWhite = new Array(64).fill(0);
	whiteMoves.forEach((move) => {
		state.contestedSquaresWhite[move.target] = 1;
	});
	// Map white contested squares for pawns only
	for (let i = 0; i < 64; i++) {
		// loop all squares
		if (state.bitBoards['P'][i]) {
			// if square occupied has white pawn occupant
			[i + 7, i + 9].forEach((target) => {
				// check diagonals for enemies
				if (state.occupiedSquaresBlack[target] && !squareOnEdge(i, target - i)) {
					state.contestedSquaresWhite[target] = 1; // add contested squares
				}
			});
		}
	}

	let blackMoves = [];
	let blackPawnMoves = [];
	// Generate all black moves
	for (let i = 0; i < 64; i++) {
		switch (state.pieceIndex[i]) {
			case 'k':
				blackMoves.push(...generateKingMoves(i, false, state));
				break;
			case 'q':
				blackMoves.push(...generateQueenMoves(i, false, state));
				break;
			case 'b':
				blackMoves.push(...generateBishopMoves(i, false, state));
				break;
			case 'n':
				blackMoves.push(...generateKnightMoves(i, false, state));
				break;
			case 'r':
				blackMoves.push(...generateRookMoves(i, false, state));
				break;
			case 'p':
				blackPawnMoves.push(...generatePawnMoves(i, false, state));
				break;
		}
	}
	// Map black contested squares in game state for all pieces except pawns
	state.contestedSquaresBlack = new Array(64).fill(0);
	blackMoves.forEach((move) => {
		state.contestedSquaresBlack[move.target] = 1;
	});
	// Map black contested squares for pawns only
	for (let i = 0; i < 64; i++) {
		if (state.bitBoards['p'][i]) {
			[i + -7, i + -9].forEach((target) => {
				if (state.occupiedSquaresWhite[target] && !squareOnEdge(i, target - i)) {
					state.contestedSquaresBlack[target] = 1;
				}
			});
		}
	}
	// add pawn moves to moves
	whiteMoves.push(...whitePawnMoves);
	blackMoves.push(...blackPawnMoves);
	// Return all moves
	return { whiteMoves, blackMoves };
};

export const generatePawnMoves = (origin, forWhite, { occupiedSquaresBlack, occupiedSquaresWhite }) => {
	let moves = [];
	const offsets = forWhite ? [8, 16, 7, 9] : [-8, -16, -7, -9];

	// advancing once and twice
	if (hasNoOccupance(origin + offsets[0], occupiedSquaresBlack, occupiedSquaresWhite) && !squareOnEdge(origin, offsets[0])) {
		moves.push(new Move(origin, origin + offsets[0]));
		if (
			hasNoOccupance(origin + offsets[1], occupiedSquaresBlack, occupiedSquaresWhite) &&
			hasDoublePawnMoveRights(forWhite, origin) &&
			!squareOnEdge(origin, offsets[1])
		) {
			moves.push(new Move(origin, origin + offsets[1]));
		}
	}
	//moving (attacking) left
	if (hasEvilOccupance(forWhite, origin + offsets[2], occupiedSquaresBlack, occupiedSquaresWhite) && !squareOnEdge(origin, offsets[2])) {
		moves.push(new Move(origin, origin + offsets[2]));
	}
	//moving (attacking) right
	if (hasEvilOccupance(forWhite, origin + offsets[3], occupiedSquaresBlack, occupiedSquaresWhite) && !squareOnEdge(origin, offsets[3])) {
		moves.push(new Move(origin, origin + offsets[3]));
	}

	return moves;
};

export const generateBishopMoves = (origin, forWhite, state) => {
	return castSlidingRays(origin, OFFSETS_BISHOP, forWhite, state);
};

export const generateRookMoves = (origin, forWhite, state) => {
	return castSlidingRays(origin, OFFSETS_ROOK, forWhite, state);
};

export const generateQueenMoves = (origin, forWhite, state) => {
	return castSlidingRays(origin, OFFSETS_QUEEN, forWhite, state);
};

export const generateKingMoves = (origin, forWhite, { occupiedSquaresWhite, occupiedSquaresBlack, contestedSquaresWhite, contestedSquaresBlack }) => {
	let moves = [];

	OFFSETS_KING.forEach((offset) => {
		const target = origin + offset;
		if (
			!squareOnEdge(origin, offset) &&
			!hasFriendlyOccupance(forWhite, target, occupiedSquaresWhite, occupiedSquaresBlack) &&
			!contestedByEnemy(forWhite, target, contestedSquaresWhite, contestedSquaresBlack)
		) {
			moves.push(new Move(origin, target));
		}
	});

	/*
  // right
  if (!RIGHT[origin]) {
    moves.push(origin + 9);
    moves.push(origin + 1);
    moves.push(origin - 7);
  }
  // left
  if (!LEFT[origin]) {
    moves.push(origin + 7);
    moves.push(origin - 1);
    moves.push(origin - 9);
  }
  // up
  if (!TOP[origin]) moves.push(origin + 8);
  // down
  if (!BOTTOM[origin]) moves.push(origin - 8);
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

export const generateKnightMoves = (origin, forWhite, { occupiedSquaresWhite, occupiedSquaresBlack }) => {
	let moves = [];

	let factor = 1;
	const file = origin % 8;

	for (let i = 0; i < 2; i++) {
		const targets = [origin - 6 * factor, origin - 10 * factor, origin - 15 * factor, origin - 17 * factor];

		targets.forEach((target) => {
			if (!hasFriendlyOccupance(forWhite, target, occupiedSquaresWhite, occupiedSquaresBlack)) {
				moves.push(new Move(origin, target));
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
