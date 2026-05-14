'use client';

import { useState, useEffect } from 'react';
import styles from './Juegos.module.css';

const DAILY_WORDS_LISTS = [
  ['EMPATIA', 'SERVICIO', 'EQUIPO', 'LIDER', 'PROPOSITO', 'CALIDAD', 'SONRISA', 'ACOGIDA', 'EXCELENCIA', 'VALOR'],
  ['INNOVACION', 'FUTURO', 'VISION', 'IMPACTO', 'TRANSFORMAR', 'MOTIVACION', 'CRECER', 'METAS', 'LOGROS', 'AVANCE'],
  ['COMUNIDAD', 'RESPETO', 'CONFIANZA', 'SINCERIDAD', 'HONESTIDAD', 'APOYO', 'UNIDAD', 'FUERZA', 'INSPIRAR', 'GUIAR'],
  ['TALENTO', 'PASION', 'ENTREGA', 'COMPROMISO', 'ESFUERZO', 'DEDICACION', 'ACCION', 'CAMBIO', 'EJEMPLO', 'VALENTIA']
];
const SIZE = 14;

function seededRandom(seed: number) {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

interface WordCoord {
  word: string;
  start: [number, number];
  end: [number, number];
}

function generateSopa(wordsList: string[], size: number, daySeed: number) {
  const random = seededRandom(daySeed);
  const grid = Array(size).fill(null).map(() => Array(size).fill(''));
  const wordCoords: WordCoord[] = [];
  const dirs = [
    [0, 1], [1, 0], [1, 1], [-1, 1] // Only forward and down directions to make it slightly easier to read
  ];

  wordsList.forEach(word => {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 500) {
      attempts++;
      const dir = dirs[Math.floor(random() * dirs.length)];
      const startR = Math.floor(random() * size);
      const startC = Math.floor(random() * size);
      
      const endR = startR + dir[0] * (word.length - 1);
      const endC = startC + dir[1] * (word.length - 1);
      
      if (endR >= 0 && endR < size && endC >= 0 && endC < size) {
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const r = startR + dir[0] * i;
          const c = startC + dir[1] * i;
          if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
            canPlace = false;
            break;
          }
        }
        
        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const r = startR + dir[0] * i;
            const c = startC + dir[1] * i;
            grid[r][c] = word[i];
          }
          wordCoords.push({ word, start: [startR, startC], end: [endR, endC] });
          placed = true;
        }
      }
    }
  });

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = alphabet[Math.floor(random() * alphabet.length)];
      }
    }
  }

  return { grid, wordCoords };
}

export default function SopaDeLetras() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<WordCoord[]>([]);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [currentWordsList, setCurrentWordsList] = useState<string[]>([]);

  useEffect(() => {
    const dayIndex = Math.floor(Date.now() / 86400000);
    const dayWords = DAILY_WORDS_LISTS[dayIndex % DAILY_WORDS_LISTS.length];
    setCurrentWordsList(dayWords);
    const { grid: newGrid, wordCoords } = generateSopa(dayWords, SIZE, dayIndex);
    setGrid(newGrid);
    setWords(wordCoords);
  }, []);

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
    words.forEach(w => {
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

  const isCellFound = (r: number, c: number) => {
    return foundWords.some(w => {
      const wordObj = words.find(x => x.word === w)!;
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

  if (grid.length === 0) return <div>Cargando juego...</div>;

  return (
    <div className={styles.gameContainer} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <h3 className={styles.gameTitle}>Sopa de Letras: Cultura</h3>
      <p className={styles.instructions}>Encuentra las palabras en vertical, horizontal o diagonal.</p>
      
      <div className={styles.sopaGrid}>
        {grid.map((row, r) => (
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
        {currentWordsList.map(w => (
          <span key={w} className={`${styles.wordItem} ${foundWords.includes(w) ? styles.wordFound : ''}`}>
            {w}
          </span>
        ))}
      </div>
      {foundWords.length > 0 && foundWords.length === currentWordsList.length && (
        <div className={styles.successMessage}>¡Felicidades! Has encontrado todas las palabras en diagonal, vertical y horizontal.</div>
      )}
    </div>
  );
}
