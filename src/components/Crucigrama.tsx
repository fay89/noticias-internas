'use client';

import { useState } from 'react';
import styles from './Juegos.module.css';

const GRID = [
  ['H','O','T','E','L'],
  ['U','*','*','*','*'],
  ['E','*','*','*','*'],
  ['S','*','*','*','*'],
  ['P','L','A','T','O'],
  ['E','I','*','*','*'],
  ['D','D','*','*','*'],
  ['*','E','*','*','*'],
  ['*','R','*','*','*']
];

const NUMBERS: Record<string, number> = {
  '0-0': 1,
  '4-0': 2,
  '4-1': 3
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
    for (let row = 0; row < GRID.length; row++) {
      for (let col = 0; col < GRID[row].length; col++) {
        if (GRID[row][col] !== '*') {
          if (newInputs[`${row}-${col}`] !== GRID[row][col]) {
            isSolved = false;
          }
        }
      }
    }
    setSolved(isSolved);
  };

  return (
    <div className={styles.gameContainer}>
      <h3 className={styles.gameTitle}>Crucigrama: Hostelería</h3>
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
            <p><strong>2.</strong> Lo que preparamos con amor para el cliente.</p>
          </div>
          <div className={styles.clueGroup}>
            <h4>Verticales</h4>
            <p><strong>1.</strong> Persona a la que servimos con empatía.</p>
            <p><strong>3.</strong> Guía a su equipo inspirando a los demás.</p>
          </div>
        </div>
      </div>
      {solved && (
        <div className={styles.successMessage}>¡Excelente! Has resuelto el crucigrama.</div>
      )}
    </div>
  );
}
