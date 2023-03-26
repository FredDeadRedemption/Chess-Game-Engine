const clickGrid = document.querySelector(".clickGrid");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//Board
const boardSize = 900; //Changable (900x900 standard)
const squareSize = boardSize / 8;
canvas.width = boardSize;
canvas.height = boardSize;
clickGrid.style.height = boardSize + "px";
clickGrid.style.width = boardSize + "px";

//Color Settings
const lightSquareColor = "oldlace";
const DarkSquareColor = "darkviolet";

const colorMoves = "rgba(135, 206, 235, 0.6)"; // standard --> "rgba(255, 140, 0, 0.5)";
const colorAttacks = "rgba(255, 0, 0, 0.5)";

//FX
const fx_move = new Audio("./fx/fx_move.mp3");
const fx_capture = new Audio("./fx/fx_capture.mp3");

//*********BitBoard********//
// // // // // // // // // //
// 56 57 58 59 60 61 62 63 //
// 48 49 50 51 52 53 54 55 //
// 40 41 42 43 44 45 46 47 //
// 32 33 34 35 36 37 38 39 //
// 24 25 26 27 28 29 30 31 //
// 16 17 18 19 20 21 22 23 //
// 8  9  10 11 12 13 14 15 //
// 0  1  2  3  4  5  6  7  //
// // // // // // // // // //

//TO DO

//lav enPessant()

//lav isInCheck i tilfælde af castle og promotion

function randomColor() {
  /*
  const number = Math.random();
  let color;

  if (number <= 0.25) {
    color = "rgb(166, 188, 143)"; //"teal";
  } else if (number > 0.25 && number <= 0.5) {
    color = "rgb(143, 188, 147)"; //"darkslategrey";
  } else if (number > 0.5 && number <= 0.75) {
    color = "rgb(188, 143, 143)"; //"rosybrown";
  } else if (number > 0.75 && number <= 0.995) {
    color = "rgb(143, 188, 188)"; //"seagreen";
  } else if (number > 0.995) {
    color = "deeppink";
  }
  */
  //dark color
  document.getElementById("56").style.color = DarkSquareColor;
  document.getElementById("40").style.color = DarkSquareColor;
  document.getElementById("24").style.color = DarkSquareColor;
  document.getElementById("8").style.color = DarkSquareColor;
  //light color
  document.getElementById("0").style.color = lightSquareColor;
  document.getElementById("16").style.color = lightSquareColor;
  document.getElementById("32").style.color = lightSquareColor;
  document.getElementById("48").style.color = lightSquareColor;
  // return color;
}

randomColor();

class Piece {
  constructor({ position, color, type, worth, imageSrc, hasMoved, hasBeenCaptured }) {
    this.position = position;
    this.color = color; //"black" | "white"
    this.type = type; //King = "k" Queen = "q" Knight = "n" Rook = "r" Bishop = "b" Pawn = "p"
    this.worth = worth; //King = 99 Queen = 9 Knight = 3 Rook = 4 Bishop = 3 Pawn = 1
    this.image = new Image();
    this.image.src = imageSrc;
    this.hasMoved = hasMoved; //Used for castle() and pawn moving twice
    this.hasBeenCaptured = hasBeenCaptured; //stops rendering
  }

  draw() {
    c.drawImage(this.image, arrayOfSquares[this.position].rank, arrayOfSquares[this.position].file, squareSize, squareSize);
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
    position: 56,
    color: "black",
    type: "r",
    worth: 5,
    imageSrc: "./pieces/rook_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (knight_black = new Piece({
    position: 57,
    color: "black",
    type: "n",
    worth: 3,
    imageSrc: "./pieces/knight_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (bishop_black = new Piece({
    position: 58,
    color: "black",
    type: "b",
    worth: 3,
    imageSrc: "./pieces/bishop_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (queen_black = new Piece({
    position: 59,
    color: "black",
    type: "q",
    worth: 9,
    imageSrc: "./pieces/queen_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (king_black = new Piece({
    position: 60,
    color: "black",
    type: "k",
    worth: 99,
    imageSrc: "./pieces/king_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (bishop_black2 = new Piece({
    position: 61,
    color: "black",
    type: "b",
    worth: 3,
    imageSrc: "./pieces/bishop_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (knight_black2 = new Piece({
    position: 62,
    color: "black",
    type: "n",
    worth: 3,
    imageSrc: "./pieces/knight_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (rook_black2 = new Piece({
    position: 63,
    color: "black",
    type: "r",
    worth: 5,
    imageSrc: "./pieces/rook_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black = new Piece({
    position: 48,
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black2 = new Piece({
    position: 49,
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black3 = new Piece({
    position: 50,
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black4 = new Piece({
    position: 51,
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black5 = new Piece({
    position: 52,
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black6 = new Piece({
    position: 53,
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black7 = new Piece({
    position: 54,
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_black8 = new Piece({
    position: 55,
    color: "black",
    type: "p",
    worth: 1,
    imageSrc: "./pieces/pawn_black.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (rook_white = new Piece({
    position: 0,
    color: "white",
    type: "R",
    worth: 5,
    imageSrc: "./pieces/rook_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (knight_white = new Piece({
    position: 1,
    color: "white",
    type: "N",
    worth: 3,
    imageSrc: "./pieces/knight_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (bishop_white = new Piece({
    position: 2,
    color: "white",
    type: "B",
    worth: 3,
    imageSrc: "./pieces/bishop_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (queen_white = new Piece({
    position: 3,
    color: "white",
    type: "Q",
    worth: 9,
    imageSrc: "./pieces/queen_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (king_white = new Piece({
    position: 4,
    color: "white",
    type: "K",
    worth: 99,
    imageSrc: "./pieces/king_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (bishop_white2 = new Piece({
    position: 5,
    color: "white",
    type: "B",
    worth: 3,
    imageSrc: "./pieces/bishop_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (knight_white2 = new Piece({
    position: 6,
    color: "white",
    type: "N",
    worth: 3,
    imageSrc: "./pieces/knight_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (rook_white2 = new Piece({
    position: 7,
    color: "white",
    type: "R",
    worth: 5,
    imageSrc: "./pieces/rook_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white = new Piece({
    position: 8,
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white2 = new Piece({
    position: 9,
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white3 = new Piece({
    position: 10,
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white4 = new Piece({
    position: 11,
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white5 = new Piece({
    position: 12,
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white6 = new Piece({
    position: 13,
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white7 = new Piece({
    position: 14,
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
  (pawn_white8 = new Piece({
    position: 15,
    color: "white",
    type: "P",
    worth: 1,
    imageSrc: "./pieces/pawn_white.png",
    hasMoved: false,
    hasBeenCaptured: false,
  })),
]; //32

function animateChessboard() {
  for (let file = 0, fileCount = 0; file < canvas.width, fileCount < 8; file += squareSize, fileCount++) {
    for (let rank = 0, rankCount = 0; rank < canvas.width, rankCount < 8; rank += squareSize, rankCount++) {
      if (fileCount % 2 == 0) {
        if (rankCount % 2 == 0) {
          c.fillStyle = lightSquareColor;
        } else c.fillStyle = DarkSquareColor;
      } else if (fileCount % 2 !== 0) {
        if (rankCount % 2 == 0) {
          c.fillStyle = DarkSquareColor;
        } else c.fillStyle = lightSquareColor;
      }

      c.fillRect(rank, file, squareSize, squareSize);
    }
  }
}

animateChessboard();

function animatePieces() {
  window.requestAnimationFrame(animatePieces);
  for (let i = 0; i < arrayOfPieces.length; i++) {
    if (!arrayOfPieces[i].hasBeenCaptured) {
      arrayOfPieces[i].update();
    }
  }
}

animatePieces(); //skal lige ned og hente icetea i netto

function animateLegalSquares(legalSquares) {
  //initial fillstyle
  c.fillStyle = colorMoves;
  for (let i = 0; i < legalSquares.length; i++) {
    //highligth enemy squares
    if (hasEvilOccupance(legalSquares[i])) {
      c.fillStyle = colorAttacks;
    }

    //highlight legal moves
    c.fillRect(arrayOfSquares[legalSquares[i]].rank, arrayOfSquares[legalSquares[i]].file, squareSize, squareSize);
    c.fillStyle = colorMoves;
  }
  //highlight selected square
  if (startSquare != undefined) {
    c.fillStyle = colorAttacks;
    c.fillRect(arrayOfSquares[startSquare].rank, arrayOfSquares[startSquare].file, squareSize, squareSize);
  }
}

window.requestAnimationFrame(animateLegalSquares);

let moveCounter = 0;
let startSquare = undefined; //first square selected by click
let targetSquare = undefined; //second square selected by click
let hasClicked = false; //flips onclick
let whiteToMove = true; //flips on move

let allWhiteMoves = [];
let allBlackMoves = [];

//click handler
clickGrid.addEventListener(
  "click",
  (event) => {
    let piece;

    //first click
    if (!hasClicked) {
      //load square
      startSquare = parseInt(event.target.id);

      //load piece
      piece = getPieceFromSquare(startSquare);

      console.log(piece);

      //first click is valid
      if (piece != undefined && checkTurn(piece)) {
        legalSquares = generateLegalMoves(piece);
        animateLegalSquares(legalSquares);
        hasClicked = true;
      }
    }
    //second click
    else if (hasClicked) {
      //load square
      targetSquare = parseInt(event.target.id);

      //choose new start square instead
      if (hasFriendlyOccupance(targetSquare)) {
        startSquare = targetSquare;
        targetSquare = undefined;

        //load piece
        piece = getPieceFromSquare(startSquare);

        legalSquares = generateLegalMoves(piece);
        animateChessboard();
        animateLegalSquares(legalSquares);
        hasClicked = true;
      }
      //second click valid
      else if (targetIsLegal(targetSquare)) {
        //load piece
        piece = getPieceFromSquare(startSquare);

        if (!isStillInCheckAfterMove(startSquare, targetSquare, piece)) {
          move(startSquare, targetSquare, piece);
        } else resetClick();
      }
      //second click invalid
      else {
        resetClick();
      }
    }
  },
  { capture: true } //stop event bubbling
);

function resetClick() {
  startSquare = undefined;
  targetSquare = undefined;
  hasClicked = false;
  animateChessboard();
}

function getPieceFromSquare(inputSquare) {
  for (i = 0; i < arrayOfPieces.length; i++) {
    if (arrayOfPieces[i].position == inputSquare) {
      return arrayOfPieces[i];
    } //piece can be undefined duh!
  }
}

function getSquareFromPiece(piece) {
  for (i = 0; i < arrayOfSquares.length; i++) {
    if (piece.position == i) {
      return i;
    }
  }
}

function targetIsLegal(targetSquare) {
  console.log(targetSquare);
  console.log(legalSquares);
  for (let i = 0; i < legalSquares.length; i++) {
    if (targetSquare == legalSquares[i]) {
      return true;
    }
  }
  return false;
}

function move(startSquare, targetSquare, piece) {
  //capture
  if (hasEvilOccupance(targetSquare)) {
    capture();
    fx_capture.play();
  }

  //move execution
  piece.position = targetSquare; //Move

  //promote
  if (piece.type == "p" || piece.type == "P") {
    promote(piece);
  }
  //castle
  if (piece.type == "k" || piece.type == "K") {
    castle();
  }
  //update board
  piece.hasMoved = true;
  animateChessboard();
  fx_move.play();
  whiteToMove = !whiteToMove; //Turn switch
  moveCounter++;
  updateAllMoves();

  console.log("startSquare", startSquare);
  console.log("targetSquare", targetSquare);
  console.log("move_count:", moveCounter);
}

function capture() {
  let evilPiece = getPieceFromSquare(targetSquare);
  evilPiece.hasBeenCaptured = true;
  evilPiece.position = null;
}

function promote(piece) {
  //Promotion white
  if (targetSquare > 55 && piece.color == "white") {
    piece.type = "Q";
    piece.worth = 9;
    piece.image = new Image();
    piece.imageSrc = "./pieces/queen_white.png";
    piece.hasMoved = false;

    piece.image.src = piece.imageSrc;
  }
  //Promotion Black
  if (targetSquare < 8 && piece.color == "black") {
    piece.type = "q";
    piece.worth = 9;
    piece.image = new Image();
    piece.imageSrc = "./pieces/queen_black.png";
    piece.hasMoved = false;

    piece.image.src = piece.imageSrc;
  }
}

function castle() {
  //castle white
  if (!king_white.hasMoved) {
    //castle short
    if (targetSquare == 6 && !rook_white2.hasMoved) {
      rook_white2.position = 5;
    }
    //castle long
    if (targetSquare == 2 && !rook_white.hasMoved) {
      rook_white.position = 3;
    }
  }
  //castle black
  if (!king_black.hasMoved) {
    //castle short
    if (targetSquare == 62 && !rook_black2.hasMoved) {
      rook_black2.position = 61;
    }
    //castle long
    if (targetSquare == 58 && !rook_black.hasMoved) {
      rook_black.position = 59;
    }
  }
}

function isStillInCheckAfterMove(startSquare, targetSquare, piece) {
  let evilPiece = getPieceFromSquare(targetSquare);
  let captureTookPlace = false;
  piece.position = targetSquare;
  if (hasEvilOccupance(targetSquare)) {
    capture();
    captureTookPlace = true;
  }

  //update opposing moves
  whiteToMove ? updateBlackMoves() : updateWhiteMoves();

  if (whiteToMove && whiteInCheck()) {
    piece.position = startSquare;
    if (captureTookPlace) {
      evilPiece.position = targetSquare;
      evilPiece.hasBeenCaptured = false;
    }
    updateBlackMoves();
    return true;
  } else if (!whiteToMove && blackInCheck()) {
    piece.position = startSquare;
    if (captureTookPlace) {
      evilPiece.position = targetSquare;
      evilPiece.hasBeenCaptured = false;
    }
    updateWhiteMoves();
    return true;
  }
  piece.position = startSquare;
  if (captureTookPlace) {
    evilPiece.position = targetSquare;
    evilPiece.hasBeenCaptured = false;
  }
  return false;
}

function whiteInCheck() {
  for (let i = 0; i < allBlackMoves.length; i++) {
    for (let j = 0; j < allBlackMoves[i].length; j++) {
      if (king_white.position == allBlackMoves[i][j]) {
        console.log("white king in check!");
        return true;
      }
    }
  }
  return false;
}

function blackInCheck() {
  for (let i = 0; i < allWhiteMoves.length; i++) {
    for (let j = 0; j < allWhiteMoves[i].length; j++) {
      if (king_black.position == allWhiteMoves[i][j]) {
        console.log("black king in check!");
        return true;
      }
    }
  }
  return false;
}

function generateLegalMoves(piece) {
  let legalSquares = [];

  switch (piece.type) {
    case "R":
    case "r":
      legalSquares = generateRookMoves(piece);
      break;
    case "P":
    case "p":
      legalSquares = generatePawnMoves(piece);
      break;
    case "B":
    case "b":
      legalSquares = generateBishopMoves(piece);
      break;
    case "Q":
    case "q":
      legalSquares = generateQueenMoves(piece);
      break;
    case "N":
    case "n":
      legalSquares = generateKnightMoves(piece);
      break;
    case "K":
    case "k":
      legalSquares = generateKingMoves(piece);
      break;
  }

  //console.log(`%cLegal moves for ${piece.type} starting on square ${startSquare} is: \n${legalSquares.join("\n")}`, `color : orange; font-size: 20px`);

  return legalSquares;
}

function generateAllLegalMovesFor(color) {
  let allLegalMoves = [];
  let resetTurn;

  switch (color) {
    case "white":
      if (!whiteToMove) {
        whiteToMove = true;
        resetTurn = true;
      }
      for (let i = 16; i < 32; i++) {
        if (!arrayOfPieces[i].hasBeenCaptured) {
          allLegalMoves.push(generateLegalMoves(arrayOfPieces[i]));
        }
      }
      if (resetTurn) {
        whiteToMove = false;
      }
      break;
    case "black":
      if (whiteToMove) {
        whiteToMove = false;
        resetTurn = true;
      }
      for (let i = 0; i < 16; i++) {
        if (!arrayOfPieces[i].hasBeenCaptured) {
          allLegalMoves.push(generateLegalMoves(arrayOfPieces[i]));
        }
      }
      if (resetTurn) {
        whiteToMove = true;
      }
      break;
  }
  return allLegalMoves;
}

function updateAllMoves() {
  updateWhiteMoves();

  console.log("whiteMoves:");
  console.table(allWhiteMoves);

  updateBlackMoves();

  console.log("blackMoves:");
  console.table(allBlackMoves);
}

function updateWhiteMoves() {
  allWhiteMoves = generateAllLegalMovesFor("white");
}

function updateBlackMoves() {
  allBlackMoves = generateAllLegalMovesFor("black");
}

function checkTurn(piece) {
  if (piece.color == "white" && whiteToMove == true) {
    return true;
  } else if (piece.color == "black" && whiteToMove == false) {
    return true;
  } else return false;
}

function hasFriendlyOccupance(square) {
  let piece = getPieceFromSquare(square);
  let color;
  if (whiteToMove) {
    color = "white";
  } else color = "black";

  if (piece != undefined) {
    if (piece.color == color) {
      return true;
    } else return false;
  }
}

function hasEvilOccupance(square) {
  let piece = getPieceFromSquare(square);
  let color;
  if (!whiteToMove) {
    color = "white";
  } else color = "black";

  if (piece != undefined) {
    if (piece.color == color) {
      return true;
    } else return false;
  }
}

function hasNoOccupance(square) {
  let piece = getPieceFromSquare(square);

  if (piece == undefined) {
    return true;
  } else return false;
}

function generatePawnMoves(piece) {
  let legalSquares = [];
  let pawnAttackLeft;
  let pawnAttackRight;
  let pawnMoveFoward;

  switch (piece.type) {
    //white pawn offsets
    case "P":
      pawnAttackLeft = 7;
      pawnAttackRight = 9;
      pawnMoveFoward = 8;
      fileLeft = 0;
      fileRight = 7;
      break;
    //black pawn offsets
    case "p":
      pawnAttackLeft = -7;
      pawnAttackRight = -9;
      pawnMoveFoward = -8;
      fileLeft = 7;
      fileRight = 0;
      break;
  }

  //moving foward twice
  if (piece.hasMoved == false && hasNoOccupance(piece.position + pawnMoveFoward * 2) && hasNoOccupance(piece.position + pawnMoveFoward)) {
    legalSquares[0] = piece.position + pawnMoveFoward * 2;
  }
  //moving foward once
  if (hasNoOccupance(piece.position + pawnMoveFoward)) {
    legalSquares[1] = piece.position + pawnMoveFoward;
  }
  //moving (attacking) left
  if (hasEvilOccupance(piece.position + pawnAttackLeft) && piece.position % 8 != fileLeft) {
    legalSquares[2] = piece.position + pawnAttackLeft;
  }
  //moving (attacking) right
  if (hasEvilOccupance(piece.position + pawnAttackRight) && piece.position % 8 != fileRight) {
    legalSquares[3] = piece.position + pawnAttackRight;
  }

  filtered = filterLegalSquares(legalSquares);
  return filtered;
}

function generateBishopMoves(piece) {
  let legalSquares = [];

  for (let i = 0; i < 7; i++) {
    if (piece.position % 8 == i) break;
    legalSquares[i] = piece.position - -7 * (i + 1);

    let j = getPieceFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 7; i < 14; i++) {
    if (7 - (piece.position % 8) == i % 7) break;
    legalSquares[i] = piece.position - -9 * ((i % 7) + 1);

    let j = getPieceFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 14; i < 21; i++) {
    if (7 - (piece.position % 8) == i % 7) break;
    legalSquares[i] = piece.position - 7 * ((i % 7) + 1);

    let j = getPieceFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 21; i < 28; i++) {
    if (piece.position % 8 == i % 7) break;
    legalSquares[i] = piece.position - 9 * ((i % 7) + 1);

    let j = getPieceFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  filtered = filterLegalSquares(legalSquares);
  return filtered;
}

function generateRookMoves(piece) {
  let legalSquares = [];
  let offsetRank = 8;
  let offsetFile = 1;

  for (let i = 0; i < 7; i++) {
    legalSquares[i] = piece.position - offsetRank * (i + 1);

    let j = getPieceFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 7; i < 14; i++) {
    legalSquares[i] = piece.position - -offsetRank * ((i % 7) + 1);

    let j = getPieceFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }
  for (let i = 14; i < 21; i++) {
    if (piece.position % 8 == i % 7) break;
    legalSquares[i] = piece.position - offsetFile * ((i % 7) + 1);

    let j = getPieceFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  for (let i = 21; i < 29; i++) {
    if (7 - (piece.position % 8) == i % 7) break;
    legalSquares[i] = piece.position - -offsetFile * ((i % 7) + 1);

    let j = getPieceFromSquare(legalSquares[i]);
    if (j != undefined) break;
  }

  filtered = filterLegalSquares(legalSquares);
  return filtered;
}

function generateQueenMoves(piece) {
  let legalSquares = [];
  let legalBishopSquares = [];
  let legalRookSquares = [];

  legalBishopSquares = generateBishopMoves(piece);
  legalRookSquares = generateRookMoves(piece);

  legalSquares = legalBishopSquares.concat(legalRookSquares);

  filtered = filterLegalSquares(legalSquares);

  return filtered;
}

function generateKnightMoves(piece) {
  let legalSquares = [];
  let factor = 1;
  let index = piece.position % 8;

  for (let i = 0; i < 2; i++) {
    legalSquares[i] = piece.position - 6 * factor;
    legalSquares[i + 2] = piece.position - 10 * factor;
    legalSquares[i + 4] = piece.position - 15 * factor;
    legalSquares[i + 6] = piece.position - 17 * factor;

    factor = factor * -1;
  }

  for (let i = legalSquares.length - 1; i >= 0; i--) {
    if ((index < 2 && legalSquares[i] % 8 > index + 2) || (index > 5 && legalSquares[i] % 8 < index - 2)) {
      legalSquares.splice(i, 1);
    }
  }

  filtered = filterLegalSquares(legalSquares);
  return filtered;
}

function generateKingMoves(piece) {
  let legalSquares = [];

  //right
  if (piece.position % 8 != 7) {
    legalSquares[7] = piece.position + 9;
    legalSquares[1] = piece.position + 1;
    legalSquares[2] = piece.position - 7;
  }
  //left
  if (piece.position % 8 != 0) {
    legalSquares[5] = piece.position + 7;
    legalSquares[0] = piece.position - 1;
    legalSquares[4] = piece.position - 9;
  }
  //up & down
  legalSquares[6] = piece.position + 8;
  legalSquares[3] = piece.position - 8;

  //castle short white
  if (!king_white.hasMoved && !rook_white2.hasMoved && !rook_white2.hasBeenCaptured && hasNoOccupance(5) && hasNoOccupance(6)) {
    legalSquares[8] = piece.position + 2;
  }
  //castle long white
  if (!king_white.hasMoved && !rook_white.hasMoved && !rook_white.hasBeenCaptured && hasNoOccupance(1) && hasNoOccupance(2) && hasNoOccupance(3)) {
    legalSquares[9] = piece.position - 2;
  }
  //castle short black
  if (!king_black.hasMoved && !rook_black2.hasMoved && !rook_black2.hasBeenCaptured && hasNoOccupance(61) && hasNoOccupance(62)) {
    legalSquares[10] = piece.position + 2;
  }
  //castle long black
  if (!king_black.hasMoved && !rook_black.hasMoved && !rook_black.hasBeenCaptured && hasNoOccupance(57) && hasNoOccupance(58) && hasNoOccupance(59)) {
    legalSquares[11] = piece.position - 2;
  }

  filtered = filterLegalSquares(legalSquares);
  return filtered;
}

function filterLegalSquares(legalSquares) {
  //filter values outside of board
  for (let i = legalSquares.length - 1; i >= 0; i--) {
    if (legalSquares[i] < 0 || legalSquares[i] > 63 || hasFriendlyOccupance(legalSquares[i])) {
      legalSquares.splice(i, 1);
    }
  }

  //filter empty
  filtered = legalSquares.filter(filterEmpty);

  return filtered;
}

let filterEmpty = (element) => element !== "";
