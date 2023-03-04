const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//Settings || Standard Settings
const boardSize = 900; //900x900 // Change in .main(css) aswell
const squareColor1 = "wheat"; //wheat
const squareColor2 = "brown"; //brown

const squareSize = boardSize / 8; //900x900 = 112.5 squareSize & pieceSize
const pieceSize = boardSize / 8;
canvas.width = boardSize;
canvas.height = boardSize;

class Piece {
  constructor({ position, color, type, worth, imageSrc, hasMoved, hasBeenCaptured }) {
    this.position = position;
    position = {
      rank: this.position.rank,
      file: this.position.file,
    };
    this.color = color; //"black" | "white"
    this.type = type; //King = "k" Queen = "q" Knight = "n" Rook = "r" Bishop = "bishop" Pawn = "p"
    this.worth = worth; //Value of piece
    this.image = new Image();
    this.image.src = imageSrc;
    this.hasMoved = hasMoved; //Used for King, Rook, and Pawns
    this.hasBeenCaptured = hasBeenCaptured; //rip
  }

  draw() {
    c.drawImage(this.image, this.position.rank, this.position.file, pieceSize, pieceSize);
  }

  update() {
    this.draw();
  }
}

const arrayOfSquares = [
  (A1 = {
    rank: 0,
    file: squareSize * 7,
  }),
  (B1 = {
    rank: squareSize,
    file: squareSize * 7,
  }),
  (C1 = {
    rank: squareSize * 2,
    file: squareSize * 7,
  }),
  (D1 = {
    rank: squareSize * 3,
    file: squareSize * 7,
  }),
  (E1 = {
    rank: squareSize * 4,
    file: squareSize * 7,
  }),
  (F1 = {
    rank: squareSize * 5,
    file: squareSize * 7,
  }),
  (G1 = {
    rank: squareSize * 6,
    file: squareSize * 7,
  }),
  (H1 = {
    rank: squareSize * 7,
    file: squareSize * 7,
  }),
  (A2 = {
    rank: 0,
    file: squareSize * 6,
  }),
  (B2 = {
    rank: squareSize,
    file: squareSize * 6,
  }),
  (C2 = {
    rank: squareSize * 2,
    file: squareSize * 6,
  }),
  (D2 = {
    rank: squareSize * 3,
    file: squareSize * 6,
  }),
  (E2 = {
    rank: squareSize * 4,
    file: squareSize * 6,
  }),
  (F2 = {
    rank: squareSize * 5,
    file: squareSize * 6,
  }),
  (G2 = {
    rank: squareSize * 6,
    file: squareSize * 6,
  }),
  (H2 = {
    rank: squareSize * 7,
    file: squareSize * 6,
  }),
  (A3 = {
    rank: 0,
    file: squareSize * 5,
  }),
  (B3 = {
    rank: squareSize,
    file: squareSize * 5,
  }),
  (C3 = {
    rank: squareSize * 2,
    file: squareSize * 5,
  }),
  (D3 = {
    rank: squareSize * 3,
    file: squareSize * 5,
  }),
  (E3 = {
    rank: squareSize * 4,
    file: squareSize * 5,
  }),
  (F3 = {
    rank: squareSize * 5,
    file: squareSize * 5,
  }),
  (G3 = {
    rank: squareSize * 6,
    file: squareSize * 5,
  }),
  (H3 = {
    rank: squareSize * 7,
    file: squareSize * 5,
  }),
  (A4 = {
    rank: 0,
    file: squareSize * 4,
  }),
  (B4 = {
    rank: squareSize,
    file: squareSize * 4,
  }),
  (C4 = {
    rank: squareSize * 2,
    file: squareSize * 4,
  }),
  (D4 = {
    rank: squareSize * 3,
    file: squareSize * 4,
  }),
  (E4 = {
    rank: squareSize * 4,
    file: squareSize * 4,
  }),
  (F4 = {
    rank: squareSize * 5,
    file: squareSize * 4,
  }),
  (G4 = {
    rank: squareSize * 6,
    file: squareSize * 4,
  }),
  (H4 = {
    rank: squareSize * 7,
    file: squareSize * 4,
  }),
  (A5 = {
    rank: 0,
    file: squareSize * 3,
  }),
  (B5 = {
    rank: squareSize,
    file: squareSize * 3,
  }),
  (C5 = {
    rank: squareSize * 2,
    file: squareSize * 3,
  }),
  (D5 = {
    rank: squareSize * 3,
    file: squareSize * 3,
  }),
  (E5 = {
    rank: squareSize * 4,
    file: squareSize * 3,
  }),
  (F5 = {
    rank: squareSize * 5,
    file: squareSize * 3,
  }),
  (G5 = {
    rank: squareSize * 6,
    file: squareSize * 3,
  }),
  (H5 = {
    rank: squareSize * 7,
    file: squareSize * 3,
  }),
  (A6 = {
    rank: 0,
    file: squareSize * 2,
  }),
  (B6 = {
    rank: squareSize,
    file: squareSize * 2,
  }),
  (C6 = {
    rank: squareSize * 2,
    file: squareSize * 2,
  }),
  (D6 = {
    rank: squareSize * 3,
    file: squareSize * 2,
  }),
  (E6 = {
    rank: squareSize * 4,
    file: squareSize * 2,
  }),
  (F6 = {
    rank: squareSize * 5,
    file: squareSize * 2,
  }),
  (G6 = {
    rank: squareSize * 6,
    file: squareSize * 2,
  }),
  (H6 = {
    rank: squareSize * 7,
    file: squareSize * 2,
  }),
  (A7 = {
    rank: 0,
    file: squareSize,
  }),
  (B7 = {
    rank: squareSize,
    file: squareSize,
  }),
  (C7 = {
    rank: squareSize * 2,
    file: squareSize,
  }),
  (D7 = {
    rank: squareSize * 3,
    file: squareSize,
  }),
  (E7 = {
    rank: squareSize * 4,
    file: squareSize,
  }),
  (F7 = {
    rank: squareSize * 5,
    file: squareSize,
  }),
  (G7 = {
    rank: squareSize * 6,
    file: squareSize,
  }),
  (H7 = {
    rank: squareSize * 7,
    file: squareSize,
  }),
  (A8 = {
    rank: 0,
    file: 0,
  }),
  (B8 = {
    rank: squareSize,
    file: 0,
  }),
  (C8 = {
    rank: squareSize * 2,
    file: 0,
  }),
  (D8 = {
    rank: squareSize * 3,
    file: 0,
  }),
  (E8 = {
    rank: squareSize * 4,
    file: 0,
  }),
  (F8 = {
    rank: squareSize * 5,
    file: 0,
  }),
  (G8 = {
    rank: squareSize * 6,
    file: 0,
  }),
  (H8 = {
    rank: squareSize * 7,
    file: 0,
  }),
]; //64

const arrayOfPieces = [
  (rook_black = new Piece({
    position: arrayOfSquares[56],
    color: "black",
    type: "r",
    worth: 5,
    imageSrc: "./pieces/rook_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (knight_black = new Piece({
    position: arrayOfSquares[57],
    color: "black",
    type: "n",
    worth: 3,
    imageSrc: "./pieces/knight_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (bishop_black = new Piece({
    position: arrayOfSquares[58],
    color: "black",
    type: "b",
    worth: 3,
    imageSrc: "./pieces/bishop_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (queen_black = new Piece({
    position: arrayOfSquares[59],
    color: "black",
    type: "q",
    worth: 9,
    imageSrc: "./pieces/queen_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (king_black = new Piece({
    position: arrayOfSquares[60],
    color: "black",
    type: "k",
    worth: 99,
    imageSrc: "./pieces/king_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (bishop_black2 = new Piece({
    position: arrayOfSquares[61],
    color: "black",
    type: "b",
    worth: 3,
    imageSrc: "./pieces/bishop_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (knight_black2 = new Piece({
    position: arrayOfSquares[62],
    color: "black",
    type: "n",
    worth: 3,
    imageSrc: "./pieces/knight_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (rook_black2 = new Piece({
    position: arrayOfSquares[63],
    color: "black",
    type: "r",
    worth: 5,
    imageSrc: "./pieces/rook_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black = new Piece({
    position: arrayOfSquares[48],
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black2 = new Piece({
    position: arrayOfSquares[49],
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black3 = new Piece({
    position: arrayOfSquares[50],
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black4 = new Piece({
    position: arrayOfSquares[51],
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black5 = new Piece({
    position: arrayOfSquares[52],
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black6 = new Piece({
    position: arrayOfSquares[53],
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black7 = new Piece({
    position: arrayOfSquares[54],
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black8 = new Piece({
    position: arrayOfSquares[55],
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (rook_white = new Piece({
    position: arrayOfSquares[0],
    color: "white",
    type: "R",
    worth: 5,
    imageSrc: "./pieces/rook_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (knight_white = new Piece({
    position: arrayOfSquares[1],
    color: "white",
    type: "N",
    worth: 3,
    imageSrc: "./pieces/knight_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (bishop_white = new Piece({
    position: arrayOfSquares[2],
    color: "white",
    type: "B",
    worth: 3,
    imageSrc: "./pieces/bishop_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (queen_white = new Piece({
    position: arrayOfSquares[3],
    color: "white",
    type: "Q",
    worth: 9,
    imageSrc: "./pieces/queen_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (king_white = new Piece({
    position: arrayOfSquares[4],
    color: "white",
    type: "K",
    worth: 99,
    imageSrc: "./pieces/king_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (bishop_white2 = new Piece({
    position: arrayOfSquares[5],
    color: "white",
    type: "B",
    worth: 3,
    imageSrc: "./pieces/bishop_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (knight_white2 = new Piece({
    position: arrayOfSquares[6],
    color: "white",
    type: "N",
    worth: 3,
    imageSrc: "./pieces/knight_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (rook_white2 = new Piece({
    position: arrayOfSquares[7],
    color: "white",
    type: "R",
    worth: 5,
    imageSrc: "./pieces/rook_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white = new Piece({
    position: arrayOfSquares[8],
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white2 = new Piece({
    position: arrayOfSquares[9],
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white3 = new Piece({
    position: arrayOfSquares[10],
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white4 = new Piece({
    position: arrayOfSquares[11],
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white5 = new Piece({
    position: arrayOfSquares[12],
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white6 = new Piece({
    position: arrayOfSquares[13],
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white7 = new Piece({
    position: arrayOfSquares[14],
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white8 = new Piece({
    position: arrayOfSquares[15],
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
]; //32

//Generates dynamic sized chessboard
function animateChessboard() {
  window.requestAnimationFrame(animateChessboard);
  for (let file = 0, fileCount = 0; file < canvas.width, fileCount < 8; file += squareSize, fileCount++) {
    for (let rank = 0, rankCount = 0; rank < canvas.width, rankCount < 8; rank += squareSize, rankCount++) {
      if (fileCount % 2 == 0) {
        if (rankCount % 2 == 0) {
          c.fillStyle = squareColor1;
        } else c.fillStyle = squareColor2;
      } else if (fileCount % 2 !== 0) {
        if (rankCount % 2 == 0) {
          c.fillStyle = squareColor2;
        } else c.fillStyle = squareColor1;
      }

      c.fillRect(rank, file, squareSize, squareSize);
    }
  }
}

animateChessboard();

//Updates animation for all pieces
function animatePieces() {
  window.requestAnimationFrame(animatePieces);
  for (let i = 0; i < arrayOfPieces.length; i++) {
    if (arrayOfPieces[i].hasBeenCaptured == false) {
      arrayOfPieces[i].update();
    }
  }
}

animatePieces(); //skal lige ned og hente icetea i netto

/*
function animateLegalSquare(legalSquares) {
  window.requestAnimationFrame();
  let rank;
  let file;
  let array = [
    {
      rank,
      file,
    },
  ];
  for (i = 0; i <= legalSquares.length; i++) {
    array[i] = arrayOfSquares[legalSquares[i]];

    rank = array.rank;
    file = array.file;

    c.fillStyle = "yellow";
    c.fillRect(rank, file, squareSize, squareSize);
  }
  console.log(array);
}
*/

let startSquare = undefined; //first square selected by click
let targetSquare = undefined; //second square selected by click
let hasClicked = false;
let whiteToMove = true;

const readClick = document.querySelector(".main");

readClick.addEventListener(
  "click",
  (event) => {
    if (hasClicked) {
      hasClicked = false;
      targetSquare = parseInt(event.target.id); //fuck javasript
    } else if (!hasClicked) {
      startSquare = parseInt(event.target.id);

      if (getPieceIndexFromSquare(startSquare) != undefined) {
        hasClicked = true;
      }
    }

    if (targetSquare && startSquare != undefined && targetSquare != startSquare && !hasClicked) {
      move(startSquare, targetSquare);

      startSquare = undefined;
      targetSquare = undefined;
    }
  },
  { capture: true } //stops event bubbling :> ! since class is .main
);

function getPieceIndexFromSquare(startSquare) {
  for (i = 0; i < arrayOfPieces.length; i++) {
    if (arrayOfPieces[i].position == arrayOfSquares[startSquare]) {
      return i;
    } //I can be undefined
  }
}

function move(startSquare, targetSquare) {
  let i = getPieceIndexFromSquare(startSquare); //fetches the index for piece on startingsquare

  if (i != undefined && checkLegalMove() && checkTurn(i) && !hasFriendlyOccupance()) {
    arrayOfPieces[i].position = arrayOfSquares[targetSquare];
    arrayOfPieces[i].hasMoved = true; //To prevent king from castling, rook from castling, pawn from moving twice
    whiteToMove = !whiteToMove; //Turn switch whenever a legal move has been made
  }
  console.log("startSquare", startSquare);
  console.log("targetSquare", targetSquare);
}

function checkLegalMove() {
  let legalSquares;

  switch (arrayOfPieces[i].type) {
    case "R":
    case "r":
      legalSquares = legalRookMoves();
      break;
    case "P":
    case "p":
      legalSquares = legalPawnMoves();
      break;
    case "B":
    case "b":
      legalSquares = legalBishopMoves();
      break;
    case "Q":
    case "q":
      legalSquares = legalQueenMoves();
      break;
    case "N":
    case "n":
      legalSquares = legalKnightMoves();
      break;
    case "K":
    case "k":
      legalSquares = legalKingMoves();
      break;
  }
  //animateLegalSquare(legalSquares);
  //console.log(arrayOfPieces[i].color == "white"); //true
  console.log(legalSquares);

  for (let i = 0; i < legalSquares.length; i++) {
    if (legalSquares[i] == targetSquare) {
      return true;
    }
  }
  return false;
}

function checkTurn(i) {
  if (arrayOfPieces[i].color == "white" && whiteToMove == true) {
    return true;
  } else if (arrayOfPieces[i].color == "black" && whiteToMove == false) {
    return true;
  } else return false;
}

function hasFriendlyOccupance() {
  let i = getPieceIndexFromSquare(targetSquare);

  if (i != undefined) {
    if (arrayOfPieces[i].color == "white" && whiteToMove) {
      return true;
    } else if (arrayOfPieces[i].color == "black" && !whiteToMove) {
      return true;
    } else return false;
  }
}

function hasEvilOccupance() {
  let i = getPieceIndexFromSquare(targetSquare);

  if (i != undefined) {
    if (arrayOfPieces[i].color == "black" && whiteToMove) {
      return true;
    } else if (arrayOfPieces[i].color == "white" && !whiteToMove) {
      return true;
    } else return false;
  }
}

/*
function animateLegalMoves(legalSquares) {
  window.requestAnimationFrame(animateLegalMoves);
  squareToAnimate = {
    rank: undefined,
    file: undefined,
  };
  for (i = 0; i < legalSquares.length; i++) {
    squareToAnimate = arrayOfSquares[legalSquares];
  }
  c.fillRect(squareToAnimate.rank, squareToAnimate.file, squareSize, squareSize);
}
*/

function legalPawnMoves() {
  let legalSquares = [];
  let offset = 8;
  switch (arrayOfPieces[i].type) {
    case "P":
      offset = offset * -1;
    case "p":
      legalSquares[0] = startSquare - offset;
      if (arrayOfPieces[i].hasMoved == false) {
        //Makes sure a pawn can move 2 squares
        legalSquares[1] = startSquare - offset * 2;
      }
      if (hasEvilOccupance(targetSquare) && targetSquare == startSquare + 7) {
        legalSquares[2] = startSquare + 7;
        console.log(legalSquares[2]);
      } else if (hasEvilOccupance(targetSquare) && targetSquare == startSquare + 9) {
        legalSquares[3] = startSquare + 9;
      }
      break;
  }
  /*
  console.log(hasEvilOccupance(targetSquare));
  console.log(startSquare + 7);
  console.log(targetSquare == startSquare + 7);
  console.log(legalSquares[2]);
*/

  removeIllegalMoves(legalSquares);
  return legalSquares;
}

function legalBishopMoves() {
  let legalSquares = [];

  for (let i = 0; i < 7; i++) {
    if (startSquare % 8 == i) break;
    legalSquares[i] = startSquare - -7 * (i + 1);

    let j = getPieceIndexFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 7; i < 14; i++) {
    if (7 - (startSquare % 8) == i % 7) break;
    legalSquares[i] = startSquare - -9 * ((i % 7) + 1);

    let j = getPieceIndexFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 14; i < 21; i++) {
    if (7 - (startSquare % 8) == i % 7) break;
    legalSquares[i] = startSquare - 7 * ((i % 7) + 1);

    let j = getPieceIndexFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 21; i < 28; i++) {
    if (startSquare % 8 == i % 7) break;
    legalSquares[i] = startSquare - 9 * ((i % 7) + 1);

    let j = getPieceIndexFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  removeIllegalMoves(legalSquares);
  return legalSquares;
}

function legalRookMoves() {
  let legalSquares = [];
  let offsetRank = 8;
  let offsetFile = 1;

  for (let i = 0; i < 7; i++) {
    legalSquares[i] = startSquare - offsetRank * (i + 1);

    let j = getPieceIndexFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 7; i < 14; i++) {
    legalSquares[i] = startSquare - -offsetRank * ((i % 7) + 1);

    let j = getPieceIndexFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }
  for (let i = 14; i < 21; i++) {
    if (startSquare % 8 == i % 7) break;
    legalSquares[i] = startSquare - offsetFile * ((i % 7) + 1);

    let j = getPieceIndexFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 21; i < 29; i++) {
    if (7 - (startSquare % 8) == i % 7) break;
    legalSquares[i] = startSquare - -offsetFile * ((i % 7) + 1);

    let j = getPieceIndexFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  removeIllegalMoves(legalSquares);
  return legalSquares;
}

function legalQueenMoves() {
  let legalBishopSquares = [];
  let legalRookSquares = [];
  let legalSquares = [];

  legalBishopSquares = legalBishopMoves();
  legalRookSquares = legalRookMoves();

  legalSquares = legalBishopSquares.concat(legalRookSquares);

  removeIllegalMoves(legalSquares);

  return legalSquares;
}

function legalKnightMoves() {
  let legalSquares = [];
  let factor = 1;
  let index = startSquare % 8;

  for (let i = 0; i < 2; i++) {
    legalSquares[i] = startSquare - 6 * factor;
    legalSquares[i + 2] = startSquare - 10 * factor;
    legalSquares[i + 4] = startSquare - 15 * factor;
    legalSquares[i + 6] = startSquare - 17 * factor;

    factor = factor * -1;
  }
  removeIllegalMoves(legalSquares);
  //console.log(legalSquares);

  for (let i = legalSquares.length - 1; i >= 0; i--) {
    if ((index < 2 && legalSquares[i] % 8 > index + 2) || (index > 5 && legalSquares[i] % 8 < index - 2)) {
      legalSquares.splice(i, 1);
    }
  }

  return legalSquares;
}

function legalKingMoves() {
  let legalsquares = [];
}

function removeIllegalMoves(legalSquares) {
  for (let i = legalSquares.length - 1; i >= 0; i--) {
    if (legalSquares[i] < 0 || legalSquares[i] > 63 || typeof legalSquares[i] != "number") {
      legalSquares.splice(i, 1);
    }
  }
}
