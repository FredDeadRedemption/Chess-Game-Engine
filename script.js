const canvas = document.querySelector("canvas"); //yeehaw
const c = canvas.getContext("2d");

//Settings
const boardSize = 900; //900x900 standard // !change in .main css class aswell!
const squareColor1 = "wheat";
const squareColor2 = randomColor();

const squareSize = boardSize / 8; //900x900 = 112.5 squareSize & pieceSize
const pieceSize = boardSize / 8;
canvas.width = boardSize;
canvas.height = boardSize;

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

//Border patrol pawns

//square 0 er broken

//lav enPessant()

//lav isInCheck()

function randomColor() {
  const number = Math.random();
  let color;

  if (number <= 0.25) {
    color = "teal";
  } else if (number > 0.25 && number <= 0.5) {
    color = "darkslategrey";
  } else if (number > 0.5 && number <= 0.75) {
    color = "rosybrown";
  } else if (number > 0.75 && number <= 0.995) {
    color = "seagreen";
  } else if (number > 0.995) {
    color = "deeppink";
  }
  //update css colors
  document.getElementById("56").style.color = color;
  document.getElementById("40").style.color = color;
  document.getElementById("24").style.color = color;
  document.getElementById("8").style.color = color;
  return color;
}

class Piece {
  constructor({ position, color, type, worth, imageSrc, hasMoved, hasBeenCaptured }) {
    this.position = position;
    position = {
      rank: this.position.rank,
      file: this.position.file,
    };
    this.color = color; //"black" | "white"
    this.type = type; //King = "k" Queen = "q" Knight = "n" Rook = "r" Bishop = "b" Pawn = "p"
    this.worth = worth; //King = 99 Queen = 9 Knight = 3 Rook = 4 Bishop = 3 Pawn = 1
    this.image = new Image();
    this.image.src = imageSrc;
    this.hasMoved = hasMoved; //Used for castle() and pawn moving twice
    this.hasBeenCaptured = hasBeenCaptured; //stops rendering
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

let legalSquares = []; //legal moves for current piece
let startSquare = undefined; //first square selected by click
let targetSquare = undefined; //second square selected by click
let hasClicked = false; //flips onclick
let whiteToMove = true; //flips on legal move

//generate / render board
function animateChessboard() {
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

//render pieces
function animatePieces() {
  window.requestAnimationFrame(animatePieces);
  for (let i = 0; i < arrayOfPieces.length; i++) {
    if (!arrayOfPieces[i].hasBeenCaptured) {
      arrayOfPieces[i].update();
    }
  }
}

animatePieces();

//skal lige ned og hente icetea i netto

function animateLegalSquares(legalSquares) {
  //initial fillstyle
  c.fillStyle = "rgba(255, 140, 0, 0.5)";
  for (let i = 0; i < legalSquares.length; i++) {
    //highligths enemies red
    if (hasEvilOccupance(legalSquares[i])) {
      c.fillStyle = "rgba(255, 0, 0, 0.5)";
    }

    //highlights legal moves orange
    c.fillRect(arrayOfSquares[legalSquares[i]].rank, arrayOfSquares[legalSquares[i]].file, squareSize, squareSize);
    c.fillStyle = "rgba(255, 140, 0, 0.5)";
  }
  //highlights selected square red
  if (startSquare != undefined) {
    c.fillStyle = "rgba(255, 0, 0, 0.5)";
    c.fillRect(arrayOfSquares[startSquare].rank, arrayOfSquares[startSquare].file, squareSize, squareSize);
  }
}

window.requestAnimationFrame(animateLegalSquares);

const readClick = document.querySelector(".main");

//click handler
readClick.addEventListener(
  "click",
  (event) => {
    //select target square
    if (hasClicked) {
      targetSquare = parseInt(event.target.id);

      if (hasFriendlyOccupance(targetSquare)) {
        startSquare = targetSquare;
        targetSquare = undefined;

        let i = getPieceIndexFromSquare(startSquare);

        if (checkTurn(i)) {
          legalSquares = generateLegalMoves(i);
          animateChessboard();
          animateLegalSquares(legalSquares);
          hasClicked = true;
          console.log("yeehaw");
        }

        hasClicked = true;
      } else if (!targetIsLegal(targetSquare, legalSquares)) {
        animateChessboard();
        hasClicked = false;
      } else hasClicked = false;
      console.log("target", targetSquare);

      // animatePieces();
    }
    //select start square
    else if (!hasClicked) {
      startSquare = parseInt(event.target.id);
      console.log("start", startSquare);

      let i = getPieceIndexFromSquare(startSquare);

      if (i != undefined) {
        if (checkTurn(i)) {
          legalSquares = generateLegalMoves(i);
          animateLegalSquares(legalSquares);
          hasClicked = true;
        }
      }
    }

    //request move
    if (targetSquare && startSquare != undefined && targetSquare != startSquare && !hasClicked) {
      move(startSquare, targetSquare, legalSquares);

      startSquare = undefined;
      targetSquare = undefined;
    }
  },
  { capture: true } //stop event bubbling
);

//fetches index for piece on given square
function getPieceIndexFromSquare(inputSquare) {
  for (i = 0; i < arrayOfPieces.length; i++) {
    if (arrayOfPieces[i].position == arrayOfSquares[inputSquare]) {
      return i;
    } //I can be undefined
  }
}

function targetIsLegal(targetSquare, legalSquares) {
  for (let j = 0; j < legalSquares.length + 1; j++) {
    if (targetSquare == legalSquares[j]) {
      return true;
    } else return false;
  }
}

function move(startSquare, targetSquare, legalSquares) {
  let i = getPieceIndexFromSquare(startSquare); //fetches the index for piece on startingsquare

  //check legality of move
  for (let j = 0; j < legalSquares.length; j++) {
    if (targetSquare == legalSquares[j]) {
      console.log("yeehaw");
      //check extra conditions
      if (i != undefined && checkTurn(i) && !hasFriendlyOccupance(targetSquare)) {
        //Capture
        if (hasEvilOccupance(targetSquare)) {
          capture();
        }

        let i = getPieceIndexFromSquare(startSquare);

        //move execution
        arrayOfPieces[i].position = arrayOfSquares[targetSquare]; //Move
        whiteToMove = !whiteToMove; //Turn switch

        //promote
        if (arrayOfPieces[i].type == "p" || arrayOfPieces[i].type == "P") {
          promote();
        }
        //castle
        if (arrayOfPieces[i].type == "k" || arrayOfPieces[i].type == "K") {
          castle();
        }
        //update board
        arrayOfPieces[i].hasMoved = true;
        animateChessboard();
      }
      break;
    }
  }
  console.log(arrayOfPieces[i].type);
  console.log("startSquare", startSquare);
  console.log("targetSquare", targetSquare);
}

function capture() {
  let i = getPieceIndexFromSquare(targetSquare);
  arrayOfPieces[i].hasBeenCaptured = true;
  arrayOfPieces[i].position = null;
}

function promote() {
  //Promotion white
  if (targetSquare > 55 && arrayOfPieces[i].color == "white") {
    arrayOfPieces[i].type = "Q";
    arrayOfPieces[i].worth = 9;
    arrayOfPieces[i].image = new Image();
    arrayOfPieces[i].imageSrc = "./pieces/queen_white.png";
    arrayOfPieces[i].hasMoved = false;

    arrayOfPieces[i].image.src = arrayOfPieces[i].imageSrc;
  }
  //Promotion Black
  if (targetSquare < 8 && arrayOfPieces[i].color == "black") {
    arrayOfPieces[i].type = "q";
    arrayOfPieces[i].worth = 9;
    arrayOfPieces[i].image = new Image();
    arrayOfPieces[i].imageSrc = "./pieces/queen_black.png";
    arrayOfPieces[i].hasMoved = false;

    arrayOfPieces[i].image.src = arrayOfPieces[i].imageSrc;
  }
}

function castle() {
  //castle white
  if (!king_white.hasMoved) {
    //castle short
    if (targetSquare == 6 && !rook_white2.hasMoved) {
      rook_white2.position = arrayOfSquares[5];
    }
    //castle long
    if (targetSquare == 2 && !rook_white.hasMoved) {
      rook_white.position = arrayOfSquares[3];
    }
  }
  //castle black
  if (!king_black.hasMoved) {
    //castle short
    if (targetSquare == 62 && !rook_black2.hasMoved) {
      rook_black2.position = arrayOfSquares[61];
    }
    //castle long
    if (targetSquare == 58 && !rook_black.hasMoved) {
      rook_black.position = arrayOfSquares[59];
    }
  }
}

function generateLegalMoves(i) {
  let legalSquares = [];

  switch (arrayOfPieces[i].type) {
    case "R":
    case "r":
      legalSquares = generateRookMoves();
      break;
    case "P":
    case "p":
      legalSquares = generatePawnMoves();
      break;
    case "B":
    case "b":
      legalSquares = generateBishopMoves();
      break;
    case "Q":
    case "q":
      legalSquares = generateQueenMoves();
      break;
    case "N":
    case "n":
      legalSquares = generateKnightMoves();
      break;
    case "K":
    case "k":
      legalSquares = generateKingMoves();
      break;
  }

  console.log(`%cLegal moves for ${arrayOfPieces[i].type} starting on square ${startSquare} is: \n${legalSquares.join("\n")}`, `color : orange; font-size: 20px`);

  return legalSquares;
}

function checkTurn(i) {
  if (arrayOfPieces[i].color == "white" && whiteToMove == true) {
    return true;
  } else if (arrayOfPieces[i].color == "black" && whiteToMove == false) {
    return true;
  } else return false;
}

function hasFriendlyOccupance(square) {
  let i = getPieceIndexFromSquare(square);

  if (i != undefined) {
    if (arrayOfPieces[i].color == "white" && whiteToMove) {
      return true;
    } else if (arrayOfPieces[i].color == "black" && !whiteToMove) {
      return true;
    } else return false;
  }
}

function hasEvilOccupance(square) {
  let i = getPieceIndexFromSquare(square);

  if (i != undefined) {
    if (arrayOfPieces[i].color == "black" && whiteToMove) {
      return true;
    } else if (arrayOfPieces[i].color == "white" && !whiteToMove) {
      return true;
    } else return false;
  }
}

function hasNoOccupance(square) {
  let i = getPieceIndexFromSquare(square);

  if (i == undefined) {
    return true;
  } else return false;
}

function generatePawnMoves() {
  let legalSquares = [];
  let pawnAttackLeft;
  let pawnAttackRight;
  let pawnMoveFoward;

  switch (arrayOfPieces[i].type) {
    //white pawn offsets
    case "P":
      pawnAttackLeft = 7;
      pawnAttackRight = 9;
      pawnMoveFoward = 8;
      fileLeft = 1;
      fileRight = 7;
      break;
    //black pawn offsets
    case "p":
      pawnAttackLeft = -7;
      pawnAttackRight = -9;
      pawnMoveFoward = -8;
      fileLeft = 7;
      fileRight = 1;
      break;
  }

  //moving foward twice
  if (
    arrayOfPieces[i].hasMoved == false &&
    !hasFriendlyOccupance(startSquare + pawnMoveFoward * 2) &&
    !hasFriendlyOccupance(startSquare + pawnMoveFoward) &&
    !hasEvilOccupance(startSquare + pawnMoveFoward * 2) &&
    !hasEvilOccupance(startSquare + pawnMoveFoward)
  ) {
    legalSquares[0] = startSquare + pawnMoveFoward * 2;
  }
  //moving foward once
  if (!hasFriendlyOccupance(startSquare + pawnMoveFoward) && !hasEvilOccupance(startSquare + pawnMoveFoward)) {
    legalSquares[1] = startSquare + pawnMoveFoward;
  }
  //moving (attacking) left
  if (hasEvilOccupance(startSquare + pawnAttackLeft) && (startSquare % 8 != fileLeft)) {
    legalSquares[2] = startSquare + pawnAttackLeft;
  }
  //moving (attacking) right
  if (hasEvilOccupance(startSquare + pawnAttackRight) && (startSquare % 8 != fileRight)) {
    legalSquares[3] = startSquare + pawnAttackRight;
  }

  filterLegalSquares(legalSquares);
  filtered = legalSquares.filter(filterEmpty);
  return filtered;
}

function generateBishopMoves() {
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

  filterLegalSquares(legalSquares);

  filtered = legalSquares.filter(filterEmpty);
  return filtered;
}

function generateRookMoves() {
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

  filterLegalSquares(legalSquares);
  filtered = legalSquares.filter(filterEmpty);
  return filtered;
}

function generateQueenMoves() {
  let legalSquares = [];
  let legalBishopSquares = [];
  let legalRookSquares = [];

  legalBishopSquares = generateBishopMoves();
  legalRookSquares = generateRookMoves();

  legalSquares = legalBishopSquares.concat(legalRookSquares);

  filterLegalSquares(legalSquares);

  filtered = legalSquares.filter(filterEmpty);
  return filtered;
}

function generateKnightMoves() {
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

  for (let i = legalSquares.length - 1; i >= 0; i--) {
    if ((index < 2 && legalSquares[i] % 8 > index + 2) || (index > 5 && legalSquares[i] % 8 < index - 2)) {
      legalSquares.splice(i, 1);
    }
  }

  filtered = filterLegalSquares(legalSquares);
  return filtered;
}

function generateKingMoves() {
  let legalSquares = [];

  //Initial offsets :D
  legalSquares[0] = startSquare - 1;
  legalSquares[1] = startSquare + 1;
  legalSquares[2] = startSquare - 7;
  legalSquares[3] = startSquare - 8;
  legalSquares[4] = startSquare - 9;
  legalSquares[5] = startSquare + 7;
  legalSquares[6] = startSquare + 8;
  legalSquares[7] = startSquare + 9;

  //castle short white
  if (!king_white.hasMoved && !rook_white2.hasMoved && hasNoOccupance(5) && hasNoOccupance(6)) {
    legalSquares[8] = startSquare + 2;
  }
  //castle long white
  if (!king_white.hasMoved && !rook_white.hasMoved && hasNoOccupance(1) && hasNoOccupance(2) && hasNoOccupance(3)) {
    legalSquares[9] = startSquare - 2;
  }
  //castle short black
  if (!king_black.hasMoved && !rook_black2.hasMoved && hasNoOccupance(61) && hasNoOccupance(62)) {
    legalSquares[10] = startSquare + 2;
  }
  //castle long black
  if (!king_black.hasMoved && !rook_black.hasMoved && hasNoOccupance(57) && hasNoOccupance(58) && hasNoOccupance(59)) {
    legalSquares[11] = startSquare - 2;
  }

  filtered = filterLegalSquares(legalSquares);
  return filtered;
}

function filterLegalSquares(legalSquares) {
  for (let i = legalSquares.length - 1; i >= 0; i--) {
    if (legalSquares[i] < 0 || legalSquares[i] > 63 || hasFriendlyOccupance(legalSquares[i])) {
      legalSquares.splice(i, 1);
    }
  }
  filtered = legalSquares.filter(filterEmpty);
  return filtered;
}

function filterEmpty(element) {
  return element !== "";
}
