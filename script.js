// Get the board element from the DOM where the game will be rendered
const board = document.getElementById('board');

// Get the winner display element to show the game result
const winnerDisplay = document.getElementById('winner');

// Set the initial player to 'X'
let currentPlayer = 'X';

// Boolean to track if the game is active
let gameActive = true;

// Array to represent the state of the game board (9 cells, initially empty)
let gameState = Array(9).fill(null);

// Function to render the game board dynamically
function renderBoard() {
  // Clear the board's inner HTML to reset it
  board.innerHTML = '';

  // Loop through each cell in the gameState array
  gameState.forEach((cell, index) => {
    // Create a new div element for each cell
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell'); // Add the 'cell' class for styling

    // If the cell is not empty, display its value ('X' or 'O') and disable it
    if (cell) {
      cellElement.textContent = cell;
      cellElement.classList.add('disabled'); // Prevent further clicks
    }

    // Add a click event listener to handle cell clicks
    cellElement.addEventListener('click', () => handleCellClick(index));

    // Append the cell element to the board
    board.appendChild(cellElement);

      // Update the current player display
  const currentPlayerDisplay = document.getElementById('currentPlayer');
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
  });
}

// Function to handle a cell click
function handleCellClick(index) {
  // If the game is inactive or the cell is already filled, do nothing
  if (!gameActive || gameState[index]) return;

  // Update the gameState with the current player's mark ('X' or 'O')
  gameState[index] = currentPlayer;

  // Check if the current move results in a win or draw
  checkWinner();

  // Switch to the other player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  // Re-render the board to reflect the updated state
  renderBoard();
}

// Function to check if there is a winner or a draw
function checkWinner() {
  // Define all possible winning patterns (rows, columns, diagonals)
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Loop through each winning pattern
  winningPatterns.forEach(pattern => {
    const [a, b, c] = pattern; // Destructure the indices of the pattern

    // Check if all three cells in the pattern are the same and not null
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      // If a winner is found, set the game as inactive and display the winner
      gameActive = false;
    
      // Bootstrap alert for the winner
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-success mt-3'; 
      alertDiv.role = 'alert';
      alertDiv.textContent = `Congratulations! Player ${gameState[a]} Wins!`;

      // Append the alert to the winner display container
      winnerDisplay.appendChild(alertDiv);
    }
  });

  // If all cells are filled and no winner is found, declare a draw
  if (!gameState.includes(null) && gameActive) {
    gameActive = false;
  
    // Bootstrap alert for the draw
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-warning mt-3'; 
    alertDiv.role = 'alert';
    alertDiv.textContent = "It's a draw! Try again.";

    // Append the alert to the winner display container
    winnerDisplay.appendChild(alertDiv);
  }
}

// Add the event listener for the reset button
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetGame);

// Update resetGame to handle the reset logic
function resetGame() {
  gameState = Array(9).fill(null); // Reset the game state
  currentPlayer = 'X'; // Reset to player 'X'
  gameActive = true; // Set the game as active
  winnerDisplay.innerHTML = ''; // Clear the winner display
  renderBoard(); // Re-render the board
}

// Initial call to render the board
renderBoard();