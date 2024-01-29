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
} from "./brrrr.js";
import { animateChessboard } from "./render.js";
//       6 │ 40 41 42 43 44 45 46 47 │ 6
//       5 │ 32 33 34 35 36 37 38 39 │ 5
//       4 │ 24 25 26 27 28 29 30 31 │ 4
//       3 │ 16 17 18 19 20 21 22 23 │ 3
//       2 │  8  9 10 11 12 13 14 15 │ 2
//       1 │  0  1  2  3  4  5  6  7 │ 1
//         └─────────────────────────┘
//            A  B  C  D  E  F  G  H

const clickGrid = document.querySelector(".clickGrid");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Board
const boardSize = 1000; //Changable (900x900 standard)
const squareSize = boardSize / 8;
canvas.width = boardSize;
canvas.height = boardSize;
clickGrid.style.height = boardSize + "px";
clickGrid.style.width = boardSize + "px";
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

animateChessboard(ctx, squareSize);

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
};

console.log(state);
