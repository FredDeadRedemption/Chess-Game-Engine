const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//Settings || Standard Settings
const boardSize = 900; //900x900
const squareColor1 = "wheat"; //wheat
const squareColor2 = "darkcyan"; //brown

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

const squares = {
  A1: {
    rank: 0,
    file: squareSize * 7,
  },
  A2: {
    rank: 0,
    file: squareSize * 6,
  },
  A3: {
    rank: 0,
    file: squareSize * 5,
  },
  A4: {
    rank: 0,
    file: squareSize * 4,
  },
  A5: {
    rank: 0,
    file: squareSize * 3,
  },
  A6: {
    rank: 0,
    file: squareSize * 2,
  },
  A7: {
    rank: 0,
    file: squareSize,
  },
  A8: {
    rank: 0,
    file: 0,
  },
  B1: {
    rank: squareSize,
    file: squareSize * 7,
  },
  B2: {
    rank: squareSize,
    file: squareSize * 6,
  },
  B3: {
    rank: squareSize,
    file: squareSize * 5,
  },
  B4: {
    rank: squareSize,
    file: squareSize * 4,
  },
  B5: {
    rank: squareSize,
    file: squareSize * 3,
  },
  B6: {
    rank: squareSize,
    file: squareSize * 2,
  },
  B7: {
    rank: squareSize,
    file: squareSize,
  },
  B8: {
    rank: squareSize,
    file: 0,
  },
  C1: {
    rank: squareSize * 2,
    file: squareSize * 7,
  },
  C2: {
    rank: squareSize * 2,
    file: squareSize * 6,
  },
  C3: {
    rank: squareSize * 2,
    file: squareSize * 5,
  },
  C4: {
    rank: squareSize * 2,
    file: squareSize * 4,
  },
  C5: {
    rank: squareSize * 2,
    file: squareSize * 3,
  },
  C6: {
    rank: squareSize * 2,
    file: squareSize * 2,
  },
  C7: {
    rank: squareSize * 2,
    file: squareSize,
  },
  C8: {
    rank: squareSize * 2,
    file: 0,
  },
  D1: {
    rank: squareSize * 3,
    file: squareSize * 7,
  },
  D2: {
    rank: squareSize * 3,
    file: squareSize * 6,
  },
  D3: {
    rank: squareSize * 3,
    file: squareSize * 5,
  },
  D4: {
    rank: squareSize * 3,
    file: squareSize * 4,
  },
  D5: {
    rank: squareSize * 3,
    file: squareSize * 3,
  },
  D6: {
    rank: squareSize * 3,
    file: squareSize * 2,
  },
  D7: {
    rank: squareSize * 3,
    file: squareSize,
  },
  D8: {
    rank: squareSize * 3,
    file: 0,
  },
  E1: {
    rank: squareSize * 4,
    file: squareSize * 7,
  },
  E2: {
    rank: squareSize * 4,
    file: squareSize * 6,
  },
  E3: {
    rank: squareSize * 4,
    file: squareSize * 5,
  },
  E4: {
    rank: squareSize * 4,
    file: squareSize * 4,
  },
  E5: {
    rank: squareSize * 4,
    file: squareSize * 3,
  },
  E6: {
    rank: squareSize * 4,
    file: squareSize * 2,
  },
  E7: {
    rank: squareSize * 4,
    file: squareSize,
  },
  E8: {
    rank: squareSize * 4,
    file: 0,
  },
  F1: {
    rank: squareSize * 5,
    file: squareSize * 7,
  },
  F2: {
    rank: squareSize * 5,
    file: squareSize * 6,
  },
  F3: {
    rank: squareSize * 5,
    file: squareSize * 5,
  },
  F4: {
    rank: squareSize * 5,
    file: squareSize * 4,
  },
  F5: {
    rank: squareSize * 5,
    file: squareSize * 3,
  },
  F6: {
    rank: squareSize * 5,
    file: squareSize * 2,
  },
  F7: {
    rank: squareSize * 5,
    file: squareSize,
  },
  F8: {
    rank: squareSize * 5,
    file: 0,
  },
  G1: {
    rank: squareSize * 6,
    file: squareSize * 7,
  },
  G2: {
    rank: squareSize * 6,
    file: squareSize * 6,
  },
  G3: {
    rank: squareSize * 6,
    file: squareSize * 5,
  },
  G4: {
    rank: squareSize * 6,
    file: squareSize * 4,
  },
  G5: {
    rank: squareSize * 6,
    file: squareSize * 3,
  },
  G6: {
    rank: squareSize * 6,
    file: squareSize * 2,
  },
  G7: {
    rank: squareSize * 6,
    file: squareSize,
  },
  G8: {
    rank: squareSize * 6,
    file: 0,
  },
  H1: {
    rank: squareSize * 7,
    file: squareSize * 7,
  },
  H2: {
    rank: squareSize * 7,
    file: squareSize * 6,
  },
  H3: {
    rank: squareSize * 7,
    file: squareSize * 5,
  },
  H4: {
    rank: squareSize * 7,
    file: squareSize * 4,
  },
  H5: {
    rank: squareSize * 7,
    file: squareSize * 3,
  },
  H6: {
    rank: squareSize * 7,
    file: squareSize * 2,
  },
  H7: {
    rank: squareSize * 7,
    file: squareSize,
  },
  H8: {
    rank: squareSize * 7,
    file: 0,
  },
};

const rook_black = new Piece({
  position: squares.A8,
  color: "black",
  imageSrc: "./pieces/rook_black.png",
});

const knight_black = new Piece({
  position: squares.B8,
  color: "black",
  imageSrc: "./pieces/knight_black.png",
});

const bishop_black = new Piece({
  position: squares.C8,
  color: "black",
  imageSrc: "./pieces/bishop_black.png",
});

const queen_black = new Piece({
  position: squares.D8,
  color: "black",
  imageSrc: "./pieces/queen_black.png",
});

const king_black = new Piece({
  position: squares.E8,
  color: "black",
  imageSrc: "./pieces/king_black.png",
});

const bishop_black2 = new Piece({
  position: squares.F8,
  color: "black",
  imageSrc: "./pieces/bishop_black.png",
});

const knight_black2 = new Piece({
  position: squares.G8,
  color: "black",
  imageSrc: "./pieces/knight_black.png",
});

const rook_black2 = new Piece({
  position: squares.H8,
  color: "black",
  imageSrc: "./pieces/rook_black.png",
});

const pawn_black = new Piece({
  position: squares.A7,
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black2 = new Piece({
  position: squares.B7,
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black3 = new Piece({
  position: squares.C7,
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black4 = new Piece({
  position: squares.D7,
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black5 = new Piece({
  position: squares.E7,
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black6 = new Piece({
  position: squares.F7,
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black7 = new Piece({
  position: squares.G7,
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black8 = new Piece({
  position: squares.H7,
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const rook_white = new Piece({
  position: squares.A1,
  color: "white",
  imageSrc: "./pieces/rook_white.png",
});

const knight_white = new Piece({
  position: squares.B1,
  color: "white",
  imageSrc: "./pieces/knight_white.png",
});

const bishop_white = new Piece({
  position: squares.C1,
  color: "white",
  imageSrc: "./pieces/bishop_white.png",
});

const queen_white = new Piece({
  position: squares.D1,
  color: "white",
  imageSrc: "./pieces/queen_white.png",
});

const king_white = new Piece({
  position: squares.E1,
  color: "white",
  imageSrc: "./pieces/king_white.png",
});

const bishop_white2 = new Piece({
  position: squares.F1,
  color: "white",
  imageSrc: "./pieces/bishop_white.png",
});

const knight_white2 = new Piece({
  position: squares.G1,
  color: "white",
  imageSrc: "./pieces/knight_white.png",
});

const rook_white2 = new Piece({
  position: squares.H1,
  color: "white",
  imageSrc: "./pieces/rook_white.png",
});

const pawn_white = new Piece({
  position: squares.A2,
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white2 = new Piece({
  position: squares.B2,
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white3 = new Piece({
  position: squares.C2,
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white4 = new Piece({
  position: squares.D2,
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white5 = new Piece({
  position: squares.E2,
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white6 = new Piece({
  position: squares.F2,
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white7 = new Piece({
  position: squares.G2,
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white8 = new Piece({
  position: squares.H2,
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

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
  rook_black.update();
  knight_black.update();
  bishop_black.update();
  queen_black.update();
  king_black.update();
  bishop_black2.update();
  knight_black2.update();
  rook_black2.update();
  pawn_black.update();
  pawn_black2.update();
  pawn_black3.update();
  pawn_black4.update();
  pawn_black5.update();
  pawn_black6.update();
  pawn_black7.update();
  pawn_black8.update();
  //
  rook_white.update();
  knight_white.update();
  bishop_white.update();
  queen_white.update();
  king_white.update();
  bishop_white2.update();
  knight_white2.update();
  rook_white2.update();
  pawn_white.update();
  pawn_white2.update();
  pawn_white3.update();
  pawn_white4.update();
  pawn_white5.update();
  pawn_white6.update();
  pawn_white7.update();
  pawn_white8.update();
}

animate();

const testsquare = document.querySelector(".Main");

testsquare.addEventListener(
  "click",
  (e) => {
    console.log(e.target);
    pawn_white.position = squares.H3;
  },
  { capture: true } //stops event bubbling :> !
);
