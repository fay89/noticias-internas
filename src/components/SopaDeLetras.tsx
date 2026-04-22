'use client';

import { useState } from 'react';
import styles from './Juegos.module.css';

const GRID = [
  ['E','M','P','A','T','I','A','Q','W','E','R','T'],
  ['X','C','A','L','I','D','A','D','Y','U','I','O'],
  ['P','A','S','D','F','G','H','J','K','L','Z','X'],
  ['R','E','S','E','R','V','I','C','I','O','C','V'],
  ['O','B','N','M','Q','W','E','R','T','Y','U','I'],
  ['P','O','L','I','D','E','R','A','S','D','F','G'],
  ['O','H','J','K','L','Z','X','C','V','B','N','M'],
  ['S','Q','W','E','R','E','Q','U','I','P','O','T'],
  ['I','Y','U','I','O','P','A','S','D','F','G','H'],
  ['T','J','K','L','Z','X','C','V','B','N','M','Q'],
  ['O','W','E','R','T','Y','U','I','O','P','A','S'],
  ['D','F','G','H','J','K','L','Z','X','C','V','B']
];

const WORDS = [
  { word: 'EMPATIA', start: [0, 0], end: [0, 6] },
  { word: 'CALIDAD', start: [1, 1], end: [1, 7] },
  { word: 'SERVICIO', start: [3, 2], end: [3, 9] },
  { word: 'LIDER', start: [5, 2], end: [5, 6] },
  { word: 'EQUIPO', start: [7, 5], end: [7, 10] },
  { word: 'PROPOSITO', start: [2, 0], end: [10, 0] }
];

export default function SopaDeLetras() {
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const toggleCell = (r: number, c: number) => {
    const key = `${r}-${c}`;
    if (selectedCells.includes(key)) return;
    
    const newSelected = [...selectedCells, key];
    setSelectedCells(newSelected);
    checkWord(newSelected);
  };

  const handleMouseDown = (r: number, c: number) => {
    setIsDragging(true);
    setSelectedCells([`${r}-${c}`]);
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (isDragging) {
      toggleCell(r, c);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    checkWord(selectedCells);
    setSelectedCells([]); // clear current selection drag
  };

  const checkWord = (cells: string[]) => {
    // Basic check: just see if selected cells exactly match any word's coordinates
    WORDS.forEach(w => {
      if (foundWords.includes(w.word)) return;
      
      const wordCells: string[] = [];
      const [sr, sc] = w.start;
      const [er, ec] = w.end;
      
      let currR = sr;
      let currC = sc;
      const dr = er > sr ? 1 : (er < sr ? -1 : 0);
      const dc = ec > sc ? 1 : (ec < sc ? -1 : 0);
      
      while (true) {
        wordCells.push(`${currR}-${currC}`);
        if (currR === er && currC === ec) break;
        currR += dr;
        currC += dc;
      }
      
      // If the currently selected cells contain all the cells of this word
      const allFound = wordCells.every(c => cells.includes(c));
      // For a better UX, if we found it, mark it
      if (allFound && wordCells.length === cells.length) {
        setFoundWords([...foundWords, w.word]);
        setSelectedCells([]);
      }
    });
  };

  // Helper to determine if a cell is permanently highlighted (found)
  const isCellFound = (r: number, c: number) => {
    return foundWords.some(w => {
      const wordObj = WORDS.find(x => x.word === w)!;
      const [sr, sc] = wordObj.start;
      const [er, ec] = wordObj.end;
      let currR = sr; let currC = sc;
      const dr = er > sr ? 1 : (er < sr ? -1 : 0);
      const dc = ec > sc ? 1 : (ec < sc ? -1 : 0);
      while(true) {
        if (currR === r && currC === c) return true;
        if (currR === er && currC === ec) break;
        currR += dr; currC += dc;
      }
      return false;
    });
  };

  return (
    <div className={styles.gameContainer} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <h3 className={styles.gameTitle}>Sopa de Letras: Liderazgo</h3>
      <p className={styles.instructions}>Arrastra el ratón o mantén el dedo pulsado para seleccionar las palabras.</p>
      
      <div className={styles.sopaGrid}>
        {GRID.map((row, r) => (
          <div key={r} className={styles.sopaRow}>
            {row.map((letter, c) => {
              const isSelected = selectedCells.includes(`${r}-${c}`);
              const isFound = isCellFound(r, c);
              return (
                <div 
                  key={c} 
                  className={`${styles.sopaCell} ${isSelected ? styles.cellSelected : ''} ${isFound ? styles.cellFound : ''}`}
                  onMouseDown={() => handleMouseDown(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                  // Touch support
                  onTouchStart={() => handleMouseDown(r, c)}
                  onTouchMove={(e) => {
                     const touch = e.touches[0];
                     const element = document.elementFromPoint(touch.clientX, touch.clientY);
                     if (element && element.getAttribute('data-r')) {
                        toggleCell(parseInt(element.getAttribute('data-r')!), parseInt(element.getAttribute('data-c')!));
                     }
                  }}
                  onTouchEnd={handleMouseUp}
                  data-r={r}
                  data-c={c}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.wordList}>
        {WORDS.map(w => (
          <span key={w.word} className={`${styles.wordItem} ${foundWords.includes(w.word) ? styles.wordFound : ''}`}>
            {w.word}
          </span>
        ))}
      </div>
      {foundWords.length === WORDS.length && (
        <div className={styles.successMessage}>¡Felicidades! Has encontrado todas las palabras.</div>
      )}
    </div>
  );
}
