import { squareOnEdge, whitePawnsInitState, BOTTOM, TOP, LEFT, RIGHT } from "utility.ts";

export const generatePawnMovesWhite = (s: number, { occupiedSquares, blackOccupiedSquares }: any) => {
  let moves: number[] = [];

  //moving foward once and twice
  if (!occupiedSquares[s + 8] && !TOP[s]) {
    moves.push(s + 8);
    if (whitePawnsInitState[s] && !occupiedSquares[s + 16]) {
      moves.push(s + 16);
    }
  }
  //moving (attacking) left
  if (blackOccupiedSquares[s + 7] && !LEFT[s]) {
    moves.push(s + 7);
  }
  //moving (attacking) right
  if (blackOccupiedSquares[s + 9] && !RIGHT[s]) {
    moves.push(s + 9);
  }

  return moves;
};

export const generatePawnMovesBlack = (s: number, { occupiedSquares, whiteOccupiedSquares }: any) => {
  let moves: number[] = [];

  //moving downward once and twice
  if (!occupiedSquares[s + -8] && !BOTTOM[s]) {
    moves.push(s + -8);
    if (whitePawnsInitState[s] && !occupiedSquares[s - 16]) {
      moves.push(s + -16);
    }
  }
  //moving (attacking) right
  if (whiteOccupiedSquares[s + -7] && !RIGHT[s]) {
    moves.push(s + -7);
  }
  //moving (attacking) left
  if (whiteOccupiedSquares[s + -9] && !LEFT[s]) {
    moves.push(s + -9);
  }

  return moves;
};

export const generateSlidingMoves = (s: number, offsets: number[], forWhite: boolean, { whiteOccupiedSquares, blackOccupiedSquares }: any) => {
  let moves: number[] = [];

  offsets.forEach((offset) => {
    // if piece is already on edge based on its offset break;
    if (squareOnEdge(s, offset)) return;

    // cast sliding ray in offsets direction
    for (let i = 1; i < 8; i++) {
      const newMove = s + offset * i;

      // stop if friendly occupance
      if ((forWhite && !whiteOccupiedSquares[newMove]) || (!forWhite && !blackOccupiedSquares[newMove])) {
        moves.push(newMove);
      } else break;

      // stop if move hits edge
      if (squareOnEdge(newMove, offset)) break; // if move hits edge stop

      // stop if move hits enemy
      if ((forWhite && blackOccupiedSquares[newMove]) || (!forWhite && whiteOccupiedSquares[newMove])) {
        break;
      }
    }
  });

  return moves;
};
