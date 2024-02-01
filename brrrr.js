export const randomColor = () => {
	const arr = ['rgb(166, 188, 143)', 'rgb(143, 188, 147)', 'rgb(188, 143, 143)', 'rgb(143, 188, 188)'];
	return arr[Math.floor(Math.random() * arr.length)];
};

export const bitBoardToFileWhite = (index, squareSize) => {
	return (index % 8) * squareSize;
};

export const bitBoardToFileBlack = (index, squareSize) => {
  return (7 - (index % 8)) * squareSize;
};

export const bitBoardToRankWhite = (index, squareSize) => {
	return (8 - 1 - Math.floor(index / 8)) * squareSize;
};

export const bitBoardToRankBlack = (index, squareSize) => {
  return (Math.floor(index / 8)) * squareSize;
};

export const toBitBoardWhite = (file, rank) => {
	return (7 - rank) * 8 + file;
};

export const toBitBoardBlack = (file, rank) => {
	return rank * 8 + (7 - file);
};

export const squareOnEdge = (square, offset) => {
	switch (offset) {
		case 7:
			return TOP[square] || LEFT[square]; // NW
		case 9:
			return TOP[square] || RIGHT[square]; // NE
		case -7:
			return BOTTOM[square] || RIGHT[square]; // SE
		case -9:
			return BOTTOM[square] || LEFT[square]; // SW
		case 8:
			return TOP[square]; // N
		case -8:
			return BOTTOM[square]; // S
		case 1:
			return RIGHT[square]; // E
		case -1:
			return LEFT[square]; // W
	}
};

export const castSlidingRays = (originSquare, offsets, forWhite, { occupiedSquaresWhite, occupiedSquaresBlack }) => {
	let moves = [];

	offsets.forEach((offset) => {
		// stop of piece is already on edge based on its offset;
		if (squareOnEdge(originSquare, offset)) return;

		// cast sliding ray in offsets direction
		for (let i = 1; i < 8; i++) {
			const newMove = originSquare + offset * i;

			// add new move if no friendly occupance
			if ((forWhite && !occupiedSquaresWhite[newMove]) || (!forWhite && !occupiedSquaresBlack[newMove])) {
				moves.push(newMove);
			} else break;

			// stop further ray casting if new move hits edge
			if (squareOnEdge(newMove, offset)) break;

			// stop further ray casting if new move hits enemy
			if ((forWhite && occupiedSquaresBlack[newMove]) || (!forWhite && occupiedSquaresWhite[newMove])) {
				break;
			}
		}
	});

	return moves;
};

export const OFFSETS_BISHOP = [7, -7, 9, -9];

export const OFFSETS_ROOK = [8, -8, 1, -1];

export const OFFSETS_QUEEN = [7, -7, 9, -9, 8, -8, 1, -1];

export const OFFSETS_KING = [7, -7, 9, -9, 8, -8, 1, -1];

export const BOTTOM = [ 
	1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const TOP = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1
];

export const LEFT = [
	1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 0
];

export const RIGHT = [
	0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 1
];

export const OCCUPIED_SQUARES_WHITE_INIT = [
	1, 1, 1, 1, 1, 1, 1, 1, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const OCCUPIED_SQUARES_BLACK_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  1, 1, 1, 1, 1, 1, 1, 1
];

export const OCCUPIED_SQUARES_ALL_INIT = [
	1, 1, 1, 1, 1, 1, 1, 1, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  1, 1, 1, 1, 1, 1, 1, 1
];

export const CONTESTED_SQUARES_WHITE_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const CONTESTED_SQUARES_BLACK_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const WHITE_DEATH_RAYS_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const BLACK_DEATH_RAYS_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const WHITE_KING_INIT = [
	0, 0, 0, 0, 1, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const WHITE_QUEENS_INIT = [
	0, 0, 0, 1, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const WHITE_BISHOPS_INIT = [
	0, 0, 1, 0, 0, 1, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const WHITE_KNIGHTS_INIT = [
	0, 1, 0, 0, 0, 0, 1, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const WHITE_ROOKS_INIT = [
	1, 0, 0, 0, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const WHITE_PAWNS_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const BLACK_KING_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 1, 0, 0, 0
];

export const BLACK_QUEENS_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 1, 0, 0, 0, 0
];

export const BLACK_BISHOPS_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 1, 0, 0, 1, 0, 0
];

export const BLACK_KNIGHTS_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 1, 0, 0, 0, 0, 1, 0
];

export const BLACK_ROOKS_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 0, 0, 0, 0, 0, 0, 1
];

export const BLACK_PAWNS_INIT = [
	0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  1, 1, 1, 1, 1, 1, 1, 1, 
  0, 0, 0, 0, 0, 0, 0, 0
];

export const PIECE_INDEX_INIT = [
  "R", "N", "B", "Q", "K", "B", "N", "R",
  "P", "P", "P", "P", "P", "P", "P", "P",
  " ", " ", " ", " ", " ", " ", " ", " ",
  " ", " ", " ", " ", " ", " ", " ", " ",
  " ", " ", " ", " ", " ", " ", " ", " ",
  " ", " ", " ", " ", " ", " ", " ", " ",
  "p", "p", "p", "p", "p", "p", "p", "p",
  "r", "n", "b", "q", "k", "b", "n", "r",
];


