export function generateSudoku(difficulty) {
  // Difficulty settings
  const difficulties = {
    easy: { min: 35, max: 45 },
    medium: { min: 44, max: 54 },
    hard: { min: 53, max: 63 }
  };

  // Cache valid numbers for each cell
  const getValidNumbers = (board, row, col) => {
    const used = new Set();
    
    // Check row
    for (let c = 0; c < 9; c++) {
      used.add(board[row][c]?.value);
    }
    
    // Check column
    for (let r = 0; r < 9; r++) {
      used.add(board[r][col]?.value);
    }
    
    // Check box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        used.add(board[r][c]?.value);
      }
    }

    return Array.from({ length: 9 }, (_, i) => i + 1)
      .filter(num => !used.has(num));
  };

  // Generate complete board with backtracking
  const generateCompleteBoard = () => {
    const board = Array(9).fill().map(() => 
      Array(9).fill().map(() => ({ value: null, isFixed: false }))
    );

    const solve = (row = 0, col = 0) => {
      if (col === 9) {
        row++;
        col = 0;
      }
      if (row === 9) return true;

      const validNumbers = getValidNumbers(board, row, col);
      for (let i = validNumbers.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [validNumbers[i], validNumbers[randomIndex]] = 
          [validNumbers[randomIndex], validNumbers[i]];
        
        board[row][col].value = validNumbers[i];
        if (solve(row, col + 1)) return true;
      }
      
      board[row][col].value = null;
      return false;
    };

    solve();
    return board;
  };

  // Generate puzzle by removing numbers
  const board = generateCompleteBoard();
  const { min, max } = difficulties[difficulty];
  const cellsToRemove = Math.floor(Math.random() * (max - min + 1)) + min;
  
  const cells = Array.from({ length: 81 }, (_, i) => ({
    row: Math.floor(i / 9),
    col: i % 9
  }));

  // Shuffle cells to remove
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  // Remove numbers and mark fixed cells
  for (let i = 0; i < cellsToRemove; i++) {
    const { row, col } = cells[i];
    board[row][col].value = null;
  }

  // Mark remaining cells as fixed
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value !== null) {
        board[row][col].isFixed = true;
      }
    }
  }

  return board;
}

// findEmptyCell()
// Used In: Solver/Generator
// Purpose: Next cell logic
// User Interaction: Part of recursion engine
export function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col]?.value === null) {
        return [row, col];
      }
    }
  }
  return null; // No empty cells
}

// isValid()
// Used In: Every cell input
// Purpose: Enforce Sudoku rules
// User Interaction: Validate user moves
export function isValid(board, row, col, num) {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i]?.value === num) {
      return false;
    }
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col]?.value === num) {
      return false;
    }
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c]?.value === num) {
        return false;
      }
    }
  }

  return true; // Safe to place
}

// hasUniqueSolution()
// Used In: Generator
// Purpose: Verify uniqueness
// User Interaction: Ensures fair puzzles
export function hasUniqueSolution(board) {
  let count = 0;
  const cloned = cloneBoard(board);

  function countSolutions(b) {
    const cell = findEmptyCell(b);
    if (!cell) {
      count++;
      return count > 1;  // early exit
    }
    const [row, col] = cell;
    for (let num = 1; num <= 9; num++) {
      if (isValid(b, row, col, num)) {
        b[row][col] = { value: num, isFixed: false };
        if (countSolutions(b)) return true;
        b[row][col] = { value: null, isFixed: false };
      }
    }
    return false;
  }

  countSolutions(cloned);
  return count === 1;
}

// cloneBoard()
// Used In: Solve, Validate
// Purpose: Preserve board state
// User Interaction: Avoid UI mutation
export function cloneBoard(board) {
  return board.map(row => row.map(cell => cell ? { ...cell } : null));
}

// getRandomizedNumbers()
// Used In: Generator/Solver
// Purpose: Introduce randomness
// User Interaction: Makes puzzles unique
export function getRandomizedNumbers() {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return nums;
}

// getFilledCells()
// Used In: Difficulty setting
// Purpose: Count filled cells
// User Interaction: Adjust/remove values
export function getFilledCells(board) {
  const positions = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col]?.value !== null) {
        positions.push([row, col]);
      }
    }
  }
  return positions;
}