import { whitePawnsInitState, LEFT_EDGE, RIGHT_EDGE } from "utility.ts";

export const generatePawnMovesWhite = (s: number, board: any) => {
  let moves: number[] = [];

  //moving foward once and twice
  if (!board.occupiedSquares[s + 8]) {
    moves.push(s + 8);
    if (whitePawnsInitState[s] && !board.occupiedSquares[s + 16]) {
      moves.push(s + 16);
    }
  }
  //moving (attacking) left
  if (board.blackOccupiedSquares[s + 7] && !LEFT_EDGE[s]) {
    moves.push(s + 7);
  }
  //moving (attacking) right
  if (board.blackOccupiedSquares[s + 9] && !RIGHT_EDGE[s]) {
    moves.push(s + 9);
  }

  return moves;
};

export const generatePawnMovesBlack = (s: number, board: any) => {
  let moves: number[] = [];

  //moving foward once and twice
  if (!board.occupiedSquares[s + -8]) {
    moves.push(s + -8);
    if (whitePawnsInitState[s] && !board.occupiedSquares[s - 16]) {
      moves.push(s + -16);
    }
  }
  //moving (attacking) left
  if (board.blackOccupiedSquares[s + -7] && !RIGHT_EDGE[s]) {
    moves.push(s + -7);
  }
  //moving (attacking) right
  if (board.blackOccupiedSquares[s + -9] && !LEFT_EDGE[s]) {
    moves.push(s + -9);
  }

  return moves;
};
