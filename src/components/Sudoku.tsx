'use client';

import { useState } from 'react';
import styles from './Juegos.module.css';

const INITIAL_BOARD = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

export default function Sudoku() {
  const [board, setBoard] = useState<number[][]>(() => 
    INITIAL_BOARD.map(row => [...row])
  );
  const [solved, setSolved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (r: number, c: number, val: string) => {
    if (INITIAL_BOARD[r][c] !== 0) return; // Cannot edit fixed cells
    
    // Allow empty or 1-9
    if (val !== '' && !/^[1-9]$/.test(val)) return;

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = val === '' ? 0 : parseInt(val, 10);
    setBoard(newBoard);
    
    if (val !== '') {
      checkWin(newBoard);
    } else {
      setErrorMsg('');
    }
  };

  const checkWin = (currentBoard: number[][]) => {
    let isFull = true;
    let isValid = true;

    // Validate rows and cols
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set();
      const colSet = new Set();
      for (let j = 0; j < 9; j++) {
        const rVal = currentBoard[i][j];
        if (rVal === 0) isFull = false;
        else {
          if (rowSet.has(rVal)) isValid = false;
          rowSet.add(rVal);
        }

        const cVal = currentBoard[j][i];
        if (cVal !== 0) {
          if (colSet.has(cVal)) isValid = false;
          colSet.add(cVal);
        }
      }
    }

    // Validate 3x3 grids
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const boxSet = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const val = currentBoard[boxRow * 3 + i][boxCol * 3 + j];
            if (val !== 0) {
              if (boxSet.has(val)) isValid = false;
              boxSet.add(val);
            }
          }
        }
      }
    }

    if (!isValid) {
      setErrorMsg('Hay números duplicados en fila, columna o bloque.');
      setSolved(false);
    } else {
      setErrorMsg('');
      if (isFull) {
        setSolved(true);
      }
    }
  };

  return (
    <div className={styles.gameContainer}>
      <h3 className={styles.gameTitle}>Sudoku: Nivel Medio</h3>
      <p className={styles.instructions}>Rellena las casillas vacías con números del 1 al 9. No repitas números en la misma fila, columna o bloque de 3x3.</p>
      
      <div className={styles.sudokuWrapper}>
        <div className={styles.sudokuGrid}>
          {board.map((row, r) => (
            <div key={r} className={styles.sudokuRow}>
              {row.map((cell, c) => {
                const isFixed = INITIAL_BOARD[r][c] !== 0;
                const isRightThick = c === 2 || c === 5;
                const isBottomThick = r === 2 || r === 5;
                
                return (
                  <input
                    key={c}
                    type="text"
                    maxLength={1}
                    className={`${styles.sudokuCell} ${isFixed ? styles.sudokuCellFixed : ''} ${isRightThick ? styles.sudokuCellRightThick : ''} ${isBottomThick ? styles.sudokuCellBottomThick : ''}`}
                    value={cell === 0 ? '' : cell}
                    onChange={(e) => handleChange(r, c, e.target.value)}
                    readOnly={isFixed}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}
      {solved && <div className={styles.successMessage}>¡Genial! Has completado el Sudoku correctamente.</div>}
    </div>
  );
}
