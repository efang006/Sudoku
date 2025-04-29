// findEmptyCell()
// Used In: Solver/Generator
// Purpose: Next cell logic
// User Interaction: Part of recursion engine
export function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null || board[row][col].value === null) {
        return [row, col];
      }
    }
  }
  return null;
}

// isValid()
// Used In: Every cell input
// Purpose: Enforce Sudoku rules
// User Interaction: Validate user moves
export function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i]?.value === num || board[i][col]?.value === num) {
      return false;
    }
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c]?.value === num) {
        return false;
      }
    }
  }
  return true;
}

// solveSudoku()
// Used In: Solve Button
// Purpose: Find full solution
// User Interaction: Validate/check input
export function solveSudoku(board) {
  const cell = findEmptyCell(board);
  if (!cell) return true;

  const [row, col] = cell;
  for (let num of getRandomizedNumbers()) {
    if (isValid(board, row, col, num)) {
      board[row][col] = { value: num, isFixed: false };
      if (solveSudoku(board)) return true;
      board[row][col] = { value: null, isFixed: false };
    }
  }
  return false;
}
