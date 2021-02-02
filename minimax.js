// console.log(cells);
// let scores = {
//   X: 1,
//   O: -1,
//   tie: 0,
// };

// const minimax = (board, isMax) => {
//   let result = winnerStateChecker();
//   if (result != null) {
//     return scores[result];
//   }

//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       if (board[i][j] == "") {
//         if (isMax) {
//           let bestScore = -Infinity;
//           board[i][j] = human;
//           let score = minimax(board, true);
//           board[i][j] = "";
//           bestScore = max(score, bestScore);
//         } else {
//           let bestScore = Infinity;
//           board[i][j] = ai;
//           let score = minimax(board, true);
//           board[i][j] = "";
//           bestScore = min(score, bestScore);
//         }
//       }
//     }
//   }
// };

console.log(human);

const aiBestMove = (board) => {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == "") {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
  return;
};

let scores = {
  X: 1,
  O: -1,
  tie: 0,
};

const minimax = (board, depth, isMaximizing) => {
  let result = winnerStateChecker();
  if (result != null) {
    console.log(depth);
    console.log(result);
    return result;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
};
