export const generatePawnMovesBlack = (s: number, { occupiedSquaresAll, occupiedSquaresWhite }: any) => {
  let moves: number[] = [];

  //moving downward once and twice
  if (!occupiedSquaresAll[s + -8] && !BOTTOM[s]) {
    moves.push(s + -8);
    if (whitePawnsInitState[s] && !occupiedSquaresAll[s - 16]) {
      moves.push(s + -16);
    }
  }
  //moving (attacking) right
  if (occupiedSquaresWhite[s + -7] && !RIGHT[s]) {
    moves.push(s + -7);
  }
  //moving (attacking) left
  if (occupiedSquaresWhite[s + -9] && !LEFT[s]) {
    moves.push(s + -9);
  }

  return moves;
};
