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

//PROTOTYPE TIL BLACK PAWN A7
const A7 = {
  rank: 0,
  file: squareSize,
};
/*
const squares = {
  A7 {
    rank: 0,
    file: squareSize,
  },
  A6 {
    rank: 0,
    file: squareSize * 2,
  },
};


*/

const rook_black = new Piece({
  position: {
    rank: 0,
    file: 0,
  },
  color: "black",
  imageSrc: "./pieces/rook_black.png",
});

const knight_black = new Piece({
  position: {
    rank: squareSize,
    file: 0,
  },
  color: "black",
  imageSrc: "./pieces/knight_black.png",
});

const bishop_black = new Piece({
  position: {
    rank: squareSize * 2,
    file: 0,
  },
  color: "black",
  imageSrc: "./pieces/bishop_black.png",
});

const queen_black = new Piece({
  position: {
    rank: squareSize * 3,
    file: 0,
  },
  color: "black",
  imageSrc: "./pieces/queen_black.png",
});

const king_black = new Piece({
  position: {
    rank: squareSize * 4,
    file: 0,
  },
  color: "black",
  imageSrc: "./pieces/king_black.png",
});

const bishop_black2 = new Piece({
  position: {
    rank: squareSize * 5,
    file: 0,
  },
  color: "black",
  imageSrc: "./pieces/bishop_black.png",
});

const knight_black2 = new Piece({
  position: {
    rank: squareSize * 6,
    file: 0,
  },
  color: "black",
  imageSrc: "./pieces/knight_black.png",
});

const rook_black2 = new Piece({
  position: {
    rank: squareSize * 7,
    file: 0,
  },
  color: "black",
  imageSrc: "./pieces/rook_black.png",
});

const pawn_black = new Piece({
  position: A7,
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black2 = new Piece({
  position: {
    rank: squareSize,
    file: squareSize,
  },
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black3 = new Piece({
  position: {
    rank: squareSize * 2,
    file: squareSize,
  },
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black4 = new Piece({
  position: {
    rank: squareSize * 3,
    file: squareSize,
  },
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black5 = new Piece({
  position: {
    rank: squareSize * 4,
    file: squareSize,
  },
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black6 = new Piece({
  position: {
    rank: squareSize * 5,
    file: squareSize,
  },
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black7 = new Piece({
  position: {
    rank: squareSize * 6,
    file: squareSize,
  },
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const pawn_black8 = new Piece({
  position: {
    rank: squareSize * 7,
    file: squareSize,
  },
  color: "black",
  imageSrc: "./pieces/pawn_black.png",
});

const rook_white = new Piece({
  position: {
    rank: 0,
    file: squareSize * 7,
  },
  color: "white",
  imageSrc: "./pieces/rook_white.png",
});

const knight_white = new Piece({
  position: {
    rank: squareSize,
    file: squareSize * 7,
  },
  color: "white",
  imageSrc: "./pieces/knight_white.png",
});

const bishop_white = new Piece({
  position: {
    rank: squareSize * 2,
    file: squareSize * 7,
  },
  color: "white",
  imageSrc: "./pieces/bishop_white.png",
});

const queen_white = new Piece({
  position: {
    rank: squareSize * 3,
    file: squareSize * 7,
  },
  color: "white",
  imageSrc: "./pieces/queen_white.png",
});

const king_white = new Piece({
  position: {
    rank: squareSize * 4,
    file: squareSize * 7,
  },
  color: "white",
  imageSrc: "./pieces/king_white.png",
});

const bishop_white2 = new Piece({
  position: {
    rank: squareSize * 5,
    file: squareSize * 7,
  },
  color: "white",
  imageSrc: "./pieces/bishop_white.png",
});

const knight_white2 = new Piece({
  position: {
    rank: squareSize * 6,
    file: squareSize * 7,
  },
  color: "white",
  imageSrc: "./pieces/knight_white.png",
});

const rook_white2 = new Piece({
  position: {
    rank: squareSize * 7,
    file: squareSize * 7,
  },
  color: "white",
  imageSrc: "./pieces/rook_white.png",
});

const pawn_white = new Piece({
  position: {
    rank: 0,
    file: squareSize * 6,
  },
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white2 = new Piece({
  position: {
    rank: squareSize,
    file: squareSize * 6,
  },
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white3 = new Piece({
  position: {
    rank: squareSize * 2,
    file: squareSize * 6,
  },
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white4 = new Piece({
  position: {
    rank: squareSize * 3,
    file: squareSize * 6,
  },
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white5 = new Piece({
  position: {
    rank: squareSize * 4,
    file: squareSize * 6,
  },
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white6 = new Piece({
  position: {
    rank: squareSize * 5,
    file: squareSize * 6,
  },
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white7 = new Piece({
  position: {
    rank: squareSize * 6,
    file: squareSize * 6,
  },
  color: "white",
  imageSrc: "./pieces/pawn_white.png",
});

const pawn_white8 = new Piece({
  position: {
    rank: squareSize * 7,
    file: squareSize * 6,
  },
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

const A2square = document.querySelector("#A2square");

A2square.addEventListener("click", () => {
  console.log("yeehaw");
});
