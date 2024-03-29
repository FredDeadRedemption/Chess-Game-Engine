const clickGrid = document.querySelector('.clickGrid');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Board
const boardSize = 900; //Changable (900x900 standard)
const squareSize = boardSize / 8;
canvas.width = boardSize;
canvas.height = boardSize;
clickGrid.style.height = boardSize + 'px';
clickGrid.style.width = boardSize + 'px';
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

//Color Settings
const lightSquareColor = 'wheat'; //lightsquare
const darkSquareColor = 'red'; //darksquare

const colorMoves = 'rgba(255, 140, 0, 0.5)'; // alt --> "rgba(135, 206, 235, 0.6)";
const colorAttacks = 'rgba(255, 0, 0, 0.5)';

//FX
const fx_move = new Audio('./fx/fx_move.mp3');
const fx_capture = new Audio('./fx/fx_capture.mp3');

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

document.getElementById('56').style.color = darkSquareColor;
document.getElementById('40').style.color = darkSquareColor;
document.getElementById('24').style.color = darkSquareColor;
document.getElementById('8').style.color = darkSquareColor;
document.getElementById('0').style.color = lightSquareColor;
document.getElementById('16').style.color = lightSquareColor;
document.getElementById('32').style.color = lightSquareColor;
document.getElementById('48').style.color = lightSquareColor;

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
		ctx.drawImage(this.image, arrayOfSquares[this.position].rank, arrayOfSquares[this.position].file, squareSize, squareSize);
	}

	update() {
		this.draw();
	}
}

function animateChessboard() {
	for (let file = 0, fileCount = 0; file < canvas.width, fileCount < 8; file += squareSize, fileCount++) {
		for (let rank = 0, rankCount = 0; rank < canvas.width, rankCount < 8; rank += squareSize, rankCount++) {
			if (fileCount % 2 == 0) {
				if (rankCount % 2 == 0) {
					ctx.fillStyle = lightSquareColor;
				} else ctx.fillStyle = darkSquareColor;
			} else if (fileCount % 2 !== 0) {
				if (rankCount % 2 == 0) {
					ctx.fillStyle = darkSquareColor;
				} else ctx.fillStyle = lightSquareColor;
			}

			ctx.fillRect(rank, file, squareSize, squareSize);
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

function animateLegalSquares(legalSquares, startSquare) {
	//initial fillstyle
	ctx.fillStyle = colorMoves;
	for (let i = 0; i < legalSquares.length; i++) {
		//highligth enemy squares
		if (hasEvilOccupance(legalSquares[i])) {
			ctx.fillStyle = colorAttacks;
		}

		//highlight legal moves
		ctx.fillRect(arrayOfSquares[legalSquares[i]].rank, arrayOfSquares[legalSquares[i]].file, squareSize, squareSize);
		ctx.fillStyle = colorMoves;
	}
	//highlight selected square
	if (startSquare != undefined) {
		ctx.fillStyle = colorAttacks;
		ctx.fillRect(arrayOfSquares[startSquare].rank, arrayOfSquares[startSquare].file, squareSize, squareSize);
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
	'click',
	(event) => {
		let piece;

		//first click
		if (!hasClicked) {
			//load square
			startSquare = parseInt(event.target.id);

			//load piece
			piece = getPieceFromSquare(startSquare);

			//first click is valid
			if (piece != undefined && checkTurn(piece)) {
				legalSquares = generateLegalMoves(piece);
				legalSquares = filterMovesThatUncheck(legalSquares, piece);
				animateLegalSquares(legalSquares, startSquare);
				hasClicked = true;
			} else resetClick();
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
				legalSquares = filterMovesThatUncheck(legalSquares, piece);
				animateChessboard();
				animateLegalSquares(legalSquares, startSquare);
				hasClicked = true;
			}
			//second click valid
			else if (legalSquares.includes(targetSquare)) {
				//load piece
				piece = getPieceFromSquare(startSquare);

				move(targetSquare, piece);
				resetClick();
			}
			//second click invalid
			else {
				resetClick();
			}
		}
	},
	{ captureOn: true } //stop event bubbling
);

function resetClick() {
	startSquare = undefined;
	targetSquare = undefined;
	hasClicked = false;
	animateChessboard();
}

function getPieceFromSquare(square) {
	for (i = 0; i < arrayOfPieces.length; i++) {
		if (arrayOfPieces[i].position == square) {
			return arrayOfPieces[i];
		} //piece can be undefined
	}
}

function move(targetSquare, piece) {
	//capture
	if (hasEvilOccupance(targetSquare)) {
		captureOn(targetSquare);
		fx_capture.play();
	}

	//move execution
	piece.position = targetSquare; //Move

	//promote
	if (piece.type == 'p' || piece.type == 'P') {
		promote(piece);
	}
	//castle
	if (piece.type == 'k' || piece.type == 'K') {
		castle(piece);
	}
	//update board
	piece.hasMoved = true;
	animateChessboard();
	fx_move.play();
	whiteToMove = !whiteToMove; //Turn switch
	moveCounter++;
	updateAllMoves();

	if (whiteInCheck()) console.log('%cwhite king in check!', 'color: orange');
	if (blackInCheck()) console.log('%cblack king in check!', 'color: orange');
}

function captureOn(square) {
	let evilPiece = getPieceFromSquare(square);
	evilPiece.hasBeenCaptured = true;
	evilPiece.position = null;
}

function promote(piece) {
	//Promotion white
	if (piece.position > 55 && piece.color == 'white') {
		piece.type = 'Q';
		piece.worth = 9;
		piece.image = new Image();
		piece.imageSrc = './pieces/queen_white.png';
		piece.hasMoved = false;

		piece.image.src = piece.imageSrc;
	}
	//Promotion Black
	if (piece.position < 8 && piece.color == 'black') {
		piece.type = 'q';
		piece.worth = 9;
		piece.image = new Image();
		piece.imageSrc = './pieces/queen_black.png';
		piece.hasMoved = false;

		piece.image.src = piece.imageSrc;
	}
}

function castle(piece) {
	//castle white
	if (!king_white.hasMoved) {
		//castle short
		if (piece.position == 6 && !rook_white2.hasMoved) {
			rook_white2.position = 5;
		}
		//castle long
		if (piece.position == 2 && !rook_white.hasMoved) {
			rook_white.position = 3;
		}
	}
	//castle black
	if (!king_black.hasMoved) {
		//castle short
		if (piece.position == 62 && !rook_black2.hasMoved) {
			rook_black2.position = 61;
		}
		//castle long
		if (piece.position == 58 && !rook_black.hasMoved) {
			rook_black.position = 59;
		}
	}
}
var count = 0;
function isStillInCheckAfterMove(startSquare, targetSquare, piece) {
	let evilPiece = getPieceFromSquare(targetSquare);
	let captureTookPlace = false;
	if (hasEvilOccupance(targetSquare)) {
		captureOn(targetSquare);
		captureTookPlace = true;
	}
	piece.position = targetSquare;

	count++;
	console.log(`%c ${count}`, 'color: red;');
	//update opposing moves
	whiteToMove ? updateBlackMoves(false) : updateWhiteMoves(false);

	if (whiteToMove && whiteInCheck()) {
		piece.position = startSquare;
		if (captureTookPlace) {
			evilPiece.position = targetSquare;
			evilPiece.hasBeenCaptured = false;
		}
		//updateBlackMoves(true);
		return true;
	} else if (!whiteToMove && blackInCheck()) {
		piece.position = startSquare;
		if (captureTookPlace) {
			evilPiece.position = targetSquare;
			evilPiece.hasBeenCaptured = false;
		}
		//updateWhiteMoves(true);
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
				return true;
			}
		}
	}
	return false;
}

function generateLegalMoves(piece) {
	let legalSquares = [];

	switch (piece.type) {
		case 'R':
		case 'r':
			legalSquares = generateRookMoves(piece);
			break;
		case 'P':
		case 'p':
			legalSquares = generatePawnMoves(piece);
			break;
		case 'B':
		case 'b':
			legalSquares = generateBishopMoves(piece);
			break;
		case 'Q':
		case 'q':
			legalSquares = generateQueenMoves(piece);
			break;
		case 'N':
		case 'n':
			legalSquares = generateKnightMoves(piece);
			break;
		case 'K':
		case 'k':
			legalSquares = generateKingMoves(piece);
			break;
	}

	//console.log(`%cLegal moves for ${piece.type} starting on square ${startSquare} is: \n${legalSquares.join("\n")}`, `color : orange; font-size: 20px`);

	return legalSquares;
}

function generateAllLegalMovesFor(color, filter) {
	let allLegalMoves = [];
	let resetTurn;

	switch (color) {
		case 'white':
			if (!whiteToMove) {
				whiteToMove = true;
				resetTurn = true;
			}
			for (let i = 16; i < 32; i++) {
				if (!arrayOfPieces[i].hasBeenCaptured) {
					if (filter) {
						let legalMoves = generateLegalMoves(arrayOfPieces[i]);
						let filteredMoves = filterMovesThatUncheck(legalMoves, arrayOfPieces[i]);

						allLegalMoves.push(filteredMoves);
					} else {
						if (!arrayOfPieces[i].hasBeenCaptured) {
							allLegalMoves.push(generateLegalMoves(arrayOfPieces[i]));
						}
					}
				}
			}
			if (resetTurn) {
				whiteToMove = false;
			}
			break;
		case 'black':
			if (whiteToMove) {
				whiteToMove = false;
				resetTurn = true;
			}
			for (let i = 0; i < 16; i++) {
				if (!arrayOfPieces[i].hasBeenCaptured) {
					if (filter) {
						let legalMoves = generateLegalMoves(arrayOfPieces[i]);
						let filteredMoves = filterMovesThatUncheck(legalMoves, arrayOfPieces[i]);

						allLegalMoves.push(filteredMoves);
					} else {
						if (!arrayOfPieces[i].hasBeenCaptured) {
							allLegalMoves.push(generateLegalMoves(arrayOfPieces[i]));
						}
					}
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
	updateWhiteMoves(true);

	console.log('whiteMoves:');
	console.table(allWhiteMoves);

	updateBlackMoves(true);

	console.log('blackMoves:');
	console.table(allBlackMoves);
}

function updateWhiteMoves(filter) {
	allWhiteMoves = generateAllLegalMovesFor('white', filter);
}

function updateBlackMoves(filter) {
	allBlackMoves = generateAllLegalMovesFor('black', filter);
}

function checkTurn(piece) {
	if (piece.color == 'white' && whiteToMove == true) {
		return true;
	} else if (piece.color == 'black' && whiteToMove == false) {
		return true;
	} else return false;
}

function hasFriendlyOccupance(square) {
	let piece = getPieceFromSquare(square);
	let color;
	if (whiteToMove) {
		color = 'white';
	} else color = 'black';

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
		color = 'white';
	} else color = 'black';

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
		case 'P':
			pawnAttackLeft = 7;
			pawnAttackRight = 9;
			pawnMoveFoward = 8;
			fileLeft = 0;
			fileRight = 7;
			break;
		//black pawn offsets
		case 'p':
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
	if (
		piece.color == 'white' &&
		!king_white.hasMoved &&
		!rook_white2.hasMoved &&
		!rook_white2.hasBeenCaptured &&
		hasNoOccupance(5) &&
		hasNoOccupance(6)
	) {
		legalSquares[8] = piece.position + 2;
	}
	//castle long white
	if (
		piece.color == 'white' &&
		!king_white.hasMoved &&
		!rook_white.hasMoved &&
		!rook_white.hasBeenCaptured &&
		hasNoOccupance(1) &&
		hasNoOccupance(2) &&
		hasNoOccupance(3)
	) {
		legalSquares[9] = piece.position - 2;
	}
	//castle short black
	if (
		piece.color == 'black' &&
		!king_black.hasMoved &&
		!rook_black2.hasMoved &&
		!rook_black2.hasBeenCaptured &&
		hasNoOccupance(61) &&
		hasNoOccupance(62)
	) {
		legalSquares[10] = piece.position + 2;
	}
	//castle long black
	if (
		piece.color == 'black' &&
		!king_black.hasMoved &&
		!rook_black.hasMoved &&
		!rook_black.hasBeenCaptured &&
		hasNoOccupance(57) &&
		hasNoOccupance(58) &&
		hasNoOccupance(59)
	) {
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
	filtered = legalSquares.filter((element) => element !== '');

	return filtered;
}

function filterMovesThatUncheck(legalSquares, piece) {
	for (let i = legalSquares.length - 1; i >= 0; i--) {
		if (isStillInCheckAfterMove(piece.position, legalSquares[i], piece)) {
			legalSquares.splice(i, 1);
		}
	}
	return legalSquares;
}
