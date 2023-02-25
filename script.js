const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//Settings || Standard Settings
const boardSize = 900; //900x900
const squareColor1 = "wheat"; //wheat
const squareColor2 = "brown"; //brown

const squareSize = boardSize / 8; //900 = 112.5 squareSize & pieceSize
const pieceSize = boardSize / 8;
canvas.width = boardSize;
canvas.height = boardSize;

class Piece {
  constructor({ position, color, imageSrc }) {
    this.position = position;
    position = {
      rank: this.position.rank,
      file: this.position.file,
    };
    this.color = color;
    this.image = new Image();
    this.image.src = imageSrc;
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
    imageSrc: "./pieces/rook_black.png",
  })),
  (knight_black = new Piece({
    position: arrayOfSquares[57],
    color: "black",
    imageSrc: "./pieces/knight_black.png",
  })),
  (bishop_black = new Piece({
    position: arrayOfSquares[58],
    color: "black",
    imageSrc: "./pieces/bishop_black.png",
  })),
  (queen_black = new Piece({
    position: arrayOfSquares[59],
    color: "black",
    imageSrc: "./pieces/queen_black.png",
  })),
  (king_black = new Piece({
    position: arrayOfSquares[60],
    color: "black",
    imageSrc: "./pieces/king_black.png",
  })),
  (bishop_black2 = new Piece({
    position: arrayOfSquares[61],
    color: "black",
    imageSrc: "./pieces/bishop_black.png",
  })),
  (knight_black2 = new Piece({
    position: arrayOfSquares[62],
    color: "black",
    imageSrc: "./pieces/knight_black.png",
  })),
  (rook_black2 = new Piece({
    position: arrayOfSquares[63],
    color: "black",
    imageSrc: "./pieces/rook_black.png",
  })),
  (pawn_black = new Piece({
    position: arrayOfSquares[48],
    color: "black",
    imageSrc: "./pieces/pawn_black.png",
  })),
  (pawn_black2 = new Piece({
    position: arrayOfSquares[49],
    color: "black",
    imageSrc: "./pieces/pawn_black.png",
  })),
  (pawn_black3 = new Piece({
    position: arrayOfSquares[50],
    color: "black",
    imageSrc: "./pieces/pawn_black.png",
  })),
  (pawn_black4 = new Piece({
    position: arrayOfSquares[51],
    color: "black",
    imageSrc: "./pieces/pawn_black.png",
  })),
  (pawn_black5 = new Piece({
    position: arrayOfSquares[52],
    color: "black",
    imageSrc: "./pieces/pawn_black.png",
  })),
  (pawn_black6 = new Piece({
    position: arrayOfSquares[53],
    color: "black",
    imageSrc: "./pieces/pawn_black.png",
  })),
  (pawn_black7 = new Piece({
    position: arrayOfSquares[54],
    color: "black",
    imageSrc: "./pieces/pawn_black.png",
  })),
  (pawn_black8 = new Piece({
    position: arrayOfSquares[55],
    color: "black",
    imageSrc: "./pieces/pawn_black.png",
  })),
  (rook_white = new Piece({
    position: arrayOfSquares[0],
    color: "white",
    imageSrc: "./pieces/rook_white.png",
  })),
  (knight_white = new Piece({
    position: arrayOfSquares[1],
    color: "white",
    imageSrc: "./pieces/knight_white.png",
  })),
  (bishop_white = new Piece({
    position: arrayOfSquares[2],
    color: "white",
    imageSrc: "./pieces/bishop_white.png",
  })),
  (queen_white = new Piece({
    position: arrayOfSquares[3],
    color: "white",
    imageSrc: "./pieces/queen_white.png",
  })),
  (king_white = new Piece({
    position: arrayOfSquares[4],
    color: "white",
    imageSrc: "./pieces/king_white.png",
  })),
  (bishop_white2 = new Piece({
    position: arrayOfSquares[5],
    color: "white",
    imageSrc: "./pieces/bishop_white.png",
  })),
  (knight_white2 = new Piece({
    position: arrayOfSquares[6],
    color: "white",
    imageSrc: "./pieces/knight_white.png",
  })),
  (rook_white2 = new Piece({
    position: arrayOfSquares[7],
    color: "white",
    imageSrc: "./pieces/rook_white.png",
  })),
  (pawn_white = new Piece({
    position: arrayOfSquares[8],
    color: "white",
    imageSrc: "./pieces/pawn_white.png",
  })),
  (pawn_white2 = new Piece({
    position: arrayOfSquares[9],
    color: "white",
    imageSrc: "./pieces/pawn_white.png",
  })),
  (pawn_white3 = new Piece({
    position: arrayOfSquares[10],
    color: "white",
    imageSrc: "./pieces/pawn_white.png",
  })),
  (pawn_white4 = new Piece({
    position: arrayOfSquares[11],
    color: "white",
    imageSrc: "./pieces/pawn_white.png",
  })),
  (pawn_white5 = new Piece({
    position: arrayOfSquares[12],
    color: "white",
    imageSrc: "./pieces/pawn_white.png",
  })),
  (pawn_white6 = new Piece({
    position: arrayOfSquares[13],
    color: "white",
    imageSrc: "./pieces/pawn_white.png",
  })),
  (pawn_white7 = new Piece({
    position: arrayOfSquares[14],
    color: "white",
    imageSrc: "./pieces/pawn_white.png",
  })),
  (pawn_white8 = new Piece({
    position: arrayOfSquares[15],
    color: "white",
    imageSrc: "./pieces/pawn_white.png",
  })),
]; //32

function drawChessboard() {
  window.requestAnimationFrame(drawChessboard);

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

drawChessboard();

function animate() {
  window.requestAnimationFrame(animate);
  for (let i = 0; i < arrayOfPieces.length; i++) {
    arrayOfPieces[i].update();
  }
}

animate(); //skal lige ned og hente icetea i netto

let currentSquare = undefined;
let targetSquare = undefined;

const readClick = document.querySelector(".main");

hasClicked = false;

readClick.addEventListener(
  "click",
  (event) => {
    hasClicked ? (hasClicked = false) : (hasClicked = true); //switches between true and false every click

    if (!hasClicked) {
      hasClicked = false;
      targetSquare = event.target.id;
    } else if (hasClicked) {
      hasClicked = true;
      currentSquare = event.target.id;
    }

    if (targetSquare && currentSquare != undefined && targetSquare != currentSquare) {
      move(currentSquare, targetSquare);
    }

    console.log(hasClicked);
  },
  { capture: true } //stops event bubbling :> !
);

function move(currentSquare, targetSquare) {
  console.log("currentSquare", currentSquare);
  console.log("targetSquare", targetSquare);
  pawn_white.position = arrayOfSquares[targetSquare];
  console.log("yeehaw");
}
