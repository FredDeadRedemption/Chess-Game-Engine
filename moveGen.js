import { OFFSETS_BISHOP, OFFSETS_ROOK, OFFSETS_QUEEN, OFFSETS_KING, squareOnEdge, castSlidingRays, WHITE_PAWNS_INIT, BLACK_PAWNS_INIT } from "./brrrr.js";

export const generatePawnMoves = (s, forWhite, { occupiedSquaresAll, occupiedSquaresBlack, occupiedSquaresWhite }) => {
  let moves = [];
  let offsets = [];

  forWhite ? (offsets = [8, 16, 7, 9]) : (offsets = [-8, -16, -7, -9]);

  // advancing once and twice
  if (!occupiedSquaresAll[s + offsets[0]] && !squareOnEdge(s, offsets[0])) {
    moves.push(s + offsets[0]);
    if (((forWhite && WHITE_PAWNS_INIT[s]) || (!forWhite && BLACK_PAWNS_INIT[s])) && !occupiedSquaresAll[s + offsets[1]]) {
      moves.push(s + offsets[1]);
    }
  }
  //moving (attacking) left
  if (((forWhite && occupiedSquaresBlack[s + offsets[2]]) || (!forWhite && occupiedSquaresWhite[s + offsets[2]])) && !squareOnEdge(s, offsets[2])) {
    moves.push(s + offsets[2]);
  }
  //moving (attacking) right
  if (((forWhite && occupiedSquaresBlack[s + offsets[3]]) || (!forWhite && occupiedSquaresWhite[s + offsets[2]])) && !squareOnEdge(s, offsets[3])) {
    moves.push(s + offsets[3]);
  }

  return moves;
};

export const generateBishopMoves = (s, forWhite, state) => {
  return castSlidingRays(s, OFFSETS_BISHOP, forWhite, state);
};

export const generateRookMoves = (s, forWhite, state) => {
  return castSlidingRays(s, OFFSETS_ROOK, forWhite, state);
};

export const generateQueenMoves = (s, forWhite, state) => {
  return castSlidingRays(s, OFFSETS_QUEEN, forWhite, state);
};

export const generateKingMoves = (s) => {
  let moves = [];

  OFFSETS_KING.forEach((offset) => {
    if (!squareOnEdge(s, offset)) {
      moves.push(s + offset);
    }
  });

  /*
  // right
  if (!RIGHT[s]) {
    moves.push(s + 9);
    moves.push(s + 1);
    moves.push(s - 7);
  }
  // left
  if (!LEFT[s]) {
    moves.push(s + 7);
    moves.push(s - 1);
    moves.push(s - 9);
  }
  // up
  if (!TOP[s]) moves.push(s + 8);
  // down
  if (!BOTTOM[s]) moves.push(s - 8);
  */

  // TODO: + check if squares between king and rook are contested
  // castling
  if (!this.HasMoved()) {
    // castle short white
    if (this.isWhite() && !this.getBoard().getPieces()[23].HasMoved() && !this.getBoard().getPieces()[23].getHasBeenSlaughtered() && !Util.hasOccupant(5, this.getBoard()) && !Util.hasOccupant(6, this.getBoard())) {
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
    if (!isWhite() && !this.getBoard().getPieces()[7].HasMoved() && !this.getBoard().getPieces()[7].getHasBeenSlaughtered() && !Util.hasOccupant(61, this.getBoard()) && !Util.hasOccupant(62, this.getBoard())) {
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
};

export const generateKnightMoves = (s, forWhite, { occupiedSquaresWhite, occupiedSquaresBlack }) => {
  let moves = [];

  let factor = 1;
  const file = s % 8;

  for (let i = 0; i < 2; i++) {
    moves.push(s - 6 * factor);
    moves.push(s - 10 * factor);
    moves.push(s - 15 * factor);
    moves.push(s - 17 * factor);

    factor = factor * -1;
  }

  for (let i = moves.length - 1; i >= 0; i--) {
    if ((file < 2 && moves[i] % 8 > file + 2) || (file > 5 && moves[i] % 8 < file - 2)) {
      moves = moves.splice(i, 1);
    }
  }

  return moves;
};
