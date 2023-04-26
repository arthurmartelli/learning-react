import { useState } from "react";
import "./App.css";

const SQUARES_COLUMNS: number = 3;

/**
 * # Square Component
 *
 * @param value The value to be displayed on the button
 * @param onClick The function to be called when the button is clicked
 * @returns JSX.Element representing the Square component
 */
function Square({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

/**
 * # Board Component
 * @param turn The current turn in the game (either 'X' or 'O')
 * @param squares The current state of the game board
 * @param winner The winner of the game (either 'X', 'O', or '')
 * @param onPlay The function to be called when a square is clicked, passing in a new state of the game board
 * @returns The JSX.Element representing the Board component
 */
function Board({
  turn,
  squares,
  onPlay,
  winner,
}: {
  turn: string;
  squares: Array<string>;
  winner: string;
  onPlay: (newSquares: Array<string>) => void;
}): JSX.Element {
  /**
   *Handles a click on a square of the game board.

   *If the game has already ended or the square is already taken, it does nothing.

   *Otherwise, it creates a new array with the updated squares
   and calls the onPlay function
   with the updated squares as argument.

   *@param i - The index of the clicked square.
   */
  function handleClick(i: number) {
    if (winner || squares[i]) return;
    const newSquares = [...squares];
    newSquares[i] = turn;
    console.log(newSquares);
    onPlay(newSquares);
  }

  // Generate all squares for the board.
  let board = squares.map((value, i) => {
    return <Square key={i} value={value} onClick={() => handleClick(i)} />;
  });

  // Create the board, specifying the number of columns.
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${SQUARES_COLUMNS}, auto)`,
      }}
    >
      {board}
    </div>
  );
}

/**

React component representing the main Tic Tac Toe game.
@returns JSX element
*/
export default function Game() {
  // Initialize the game state with an empty board.
  const initialState = [Array<string>(SQUARES_COLUMNS ** 2).fill("")];

  const [record, setRecord] = useState(initialState);
  const [currentMove, setCurrentMove] = useState(0);

  // Calculate the current turn based on the current move number.
  const turn = currentMove % 2 === 0 ? "X" : "O";
  const currentState: Array<string> = record[currentMove];

  const winner = calculateWinner(currentState) || "";
  const status = winner ? `Winner: ${winner}` : `Next: ${turn}`;

  /**
   *Callback function to handle a play made by the current player.
   *@param nextState - the next board state to record in the game history
   */
  function handlePlay(nextState: Array<string>) {
    const nextRecord = [...record.slice(0, currentMove + 1), nextState];
    setRecord(nextRecord);
    setCurrentMove(nextRecord.length - 1);
  }

  /**
   *Callback function to jump to a specific move in the game history.
   *@param move - the move number to jump to
   */
  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  // Generate the list of moves in the game history as a series of clickable buttons.
  const moves = record.map((_, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <h1> {status} </h1>
        <Board
          turn={turn}
          squares={currentState}
          onPlay={handlePlay}
          winner={winner}
        />
      </div>

      <div className="game-info">
        <h1>Moves</h1>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/**
 * Calculate the winner of a Tic-Tac-Toe game
 * @param squares An array of values representing the current state of the game board
 * @returns The value of the winning player, or null if there is no winner yet
 *
 * @template T The type of value stored in the squares array
 */
function calculateWinner<T>(squares: Array<T>): T | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
