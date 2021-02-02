const cells = document.getElementsByTagName("button");
const statusTag = document.getElementById("status-tag");
let status = "O turn";

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let ai = "X";
let human = "O";
let currentPlayer = human;
let isGameEnded = false;

let scores = {
  X: 1,
  O: -1,
  tie: 0,
};

const boardFiller = () => {
  Array.from(cells).forEach((cell) => {
    cell.innerText = board[Math.floor(cell.id / 3)][Math.floor(cell.id % 3)];
  });
};
bestMove();

function equals3(a, b, c) {
  return a == b && b == c && a != "";
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
}

Array.from(cells).forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!isGameEnded) {
      if (cell.innerText == "") {
        if (currentPlayer == human) {
          board[Math.floor(cell.id / 3)][Math.floor(cell.id % 3)] = human;
          currentPlayer = ai;
        }
        boardFiller();
        bestMove();
        boardFiller();
        let winner = checkWinner();
        if (winner != null) {
          isGameEnded = true;
          if (winner != "tie") {
            statusTag.innerText = `${winner} has won!`;
          } else {
            statusTag.innerText = winner;
          }
        }
      }
    }
  });
});

function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
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
  boardFiller();
}

function minimax(board, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, false);
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
          let score = minimax(board, true);
          board[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
