'use client';

import { useState } from 'react';
import styles from './Juegos.module.css';

const GRID = [
  ['H','O','T','E','L','*','*','*','*','*','*','*','*','*','*'], // 0
  ['U','*','*','*','*','*','*','*','*','*','*','*','*','*','*'], // 1
  ['E','*','*','*','*','*','*','*','*','*','*','*','*','*','*'], // 2
  ['S','E','R','V','I','C','I','O','*','*','*','*','*','*','*'], // 3
  ['P','*','*','A','*','*','*','*','*','*','*','*','*','*','*'], // 4
  ['E','*','*','L','I','D','E','R','A','Z','G','O','*','*','*'], // 5
  ['D','*','*','O','*','*','Q','*','*','*','*','*','*','*','*'], // 6
  ['*','*','*','R','*','*','U','*','*','*','*','*','*','*','*'], // 7
  ['*','*','*','*','*','*','I','*','*','*','*','*','*','*','*'], // 8
  ['*','*','*','*','*','*','P','R','O','P','O','S','I','T','O'], // 9
  ['*','*','*','*','*','*','O','*','*','*','*','*','*','*','*']  // 10
];

const NUMBERS: Record<string, number> = {
  '0-0': 1,
  '3-0': 2,
  '3-3': 3,
  '5-3': 4,
  '5-6': 5,
  '9-6': 6
};

export default function Crucigrama() {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [solved, setSolved] = useState(false);

  const handleChange = (r: number, c: number, val: string) => {
    const newVal = val.toUpperCase();
    const newInputs = { ...inputs, [`${r}-${c}`]: newVal };
    setInputs(newInputs);

    // Check if solved
    let isSolved = true;
    let hasEmpty = false;
    for (let row = 0; row < GRID.length; row++) {
      for (let col = 0; col < GRID[row].length; col++) {
        if (GRID[row][col] !== '*') {
          if (!newInputs[`${row}-${col}`]) {
             hasEmpty = true;
             isSolved = false;
          } else if (newInputs[`${row}-${col}`] !== GRID[row][col]) {
             isSolved = false;
          }
        }
      }
    }
    setSolved(!hasEmpty && isSolved);
  };

  return (
    <div className={styles.gameContainer}>
      <h3 className={styles.gameTitle}>Crucigrama: Cultura y Propósito</h3>
      <p className={styles.instructions}>Escribe en las casillas blancas para resolver el crucigrama gigante.</p>
      <div className={styles.crucigramaLayout}>
        <div className={styles.crucigramaGrid}>
          {GRID.map((row, r) => (
            <div key={r} className={styles.cruciRow}>
              {row.map((cell, c) => {
                if (cell === '*') {
                  return <div key={c} className={styles.cruciCellBlack} />;
                }
                const isCorrect = inputs[`${r}-${c}`] === cell;
                return (
                  <div key={c} className={styles.cruciCellWrap}>
                    {NUMBERS[`${r}-${c}`] && (
                      <span className={styles.cruciNumber}>{NUMBERS[`${r}-${c}`]}</span>
                    )}
                    <input
                      type="text"
                      maxLength={1}
                      className={`${styles.cruciInput} ${isCorrect && solved ? styles.cruciInputCorrect : ''}`}
                      value={inputs[`${r}-${c}`] || ''}
                      onChange={(e) => handleChange(r, c, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className={styles.crucigramaClues}>
          <div className={styles.clueGroup}>
            <h4>Horizontales</h4>
            <p><strong>1.</strong> Establecimiento base de nuestro propósito.</p>
            <p><strong>2.</strong> Lo que ofrecemos con pasión a nuestros clientes.</p>
            <p><strong>4.</strong> Inspirar y guiar a otros con propósito.</p>
            <p><strong>6.</strong> La razón de ser de nuestro trabajo diario.</p>
          </div>
          <div className={styles.clueGroup}>
            <h4>Verticales</h4>
            <p><strong>1.</strong> Persona a la que servimos con empatía y atención.</p>
            <p><strong>3.</strong> Principio fundamental de nuestra cultura corporativa.</p>
            <p><strong>5.</strong> Conjunto de embajadores trabajando juntos.</p>
          </div>
        </div>
      </div>
      {solved && (
        <div className={styles.successMessage}>¡Impresionante! Has resuelto este crucigrama gigante.</div>
      )}
    </div>
  );
}
