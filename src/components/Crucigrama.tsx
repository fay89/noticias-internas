'use client';

import { useState, useEffect } from 'react';
import styles from './Juegos.module.css';

interface CrucigramaData {
  grid: string[][];
  numbers: Record<string, number>;
  words: { answer: string; cells: string[] }[];
  clues: {
    horizontales: { num: number; text: string }[];
    verticales: { num: number; text: string }[];
  };
}

const DAILY_CRUCIGRAMAS: CrucigramaData[] = [
  {
    grid: [
      ['H','O','T','E','L','*','*','*','*','*','*','*','*','*','*'],
      ['U','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
      ['E','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
      ['S','E','R','V','I','C','I','O','*','*','*','*','*','*','*'],
      ['P','*','*','A','*','*','*','*','*','*','*','*','*','*','*'],
      ['E','*','*','L','I','D','E','R','A','Z','G','O','*','*','*'],
      ['D','*','*','O','*','*','Q','*','*','*','*','*','*','*','*'],
      ['*','*','*','R','*','*','U','*','*','*','*','*','*','*','*'],
      ['*','*','*','*','*','*','I','*','*','*','*','*','*','*','*'],
      ['*','*','*','*','*','*','P','R','O','P','O','S','I','T','O'],
      ['*','*','*','*','*','*','O','*','*','*','*','*','*','*','*']
    ],
    numbers: { '0-0': 1, '3-0': 2, '3-3': 3, '5-3': 4, '5-6': 5, '9-6': 6 },
    words: [
      { answer: 'HOTEL', cells: ['0-0','0-1','0-2','0-3','0-4'] },
      { answer: 'HUESPED', cells: ['0-0','1-0','2-0','3-0','4-0','5-0','6-0'] },
      { answer: 'SERVICIO', cells: ['3-0','3-1','3-2','3-3','3-4','3-5','3-6','3-7'] },
      { answer: 'VALOR', cells: ['3-3','4-3','5-3','6-3','7-3'] },
      { answer: 'LIDERAZGO', cells: ['5-3','5-4','5-5','5-6','5-7','5-8','5-9','5-10','5-11'] },
      { answer: 'EQUIPO', cells: ['5-6','6-6','7-6','8-6','9-6','10-6'] },
      { answer: 'PROPOSITO', cells: ['9-6','9-7','9-8','9-9','9-10','9-11','9-12','9-13','9-14'] },
    ],
    clues: {
      horizontales: [
        { num: 1, text: "Establecimiento base de nuestro propósito." },
        { num: 2, text: "Lo que ofrecemos con pasión a nuestros clientes." },
        { num: 4, text: "Inspirar y guiar a otros con propósito." },
        { num: 6, text: "La razón de ser de nuestro trabajo diario." }
      ],
      verticales: [
        { num: 1, text: "Persona a la que servimos con empatía y atención." },
        { num: 3, text: "Principio fundamental de nuestra cultura corporativa." },
        { num: 5, text: "Conjunto de embajadores trabajando juntos." }
      ]
    }
  },
  {
    grid: [
      ['V','A','L','O','R','E','S','*','*','*','*','*'],
      ['*','*','*','*','*','*','I','*','*','*','*','*'],
      ['*','*','F','U','T','U','R','O','*','*','*','*'],
      ['*','*','*','*','*','*','E','*','*','*','*','*'],
      ['*','E','M','P','A','T','I','A','*','*','*','*'],
      ['*','*','*','*','*','*','N','*','*','*','*','*'],
      ['*','*','*','*','M','E','T','A','S','*','*','*'],
      ['*','*','*','*','*','*','E','*','*','*','*','*']
    ],
    numbers: { '0-0': 1, '0-6': 2, '2-2': 3, '4-1': 4, '6-4': 5 },
    words: [
      { answer: 'VALORES', cells: ['0-0','0-1','0-2','0-3','0-4','0-5','0-6'] },
      { answer: 'SIRENTE', cells: ['0-6','1-6','2-6','3-6','4-6','5-6','6-6','7-6'] },
      { answer: 'FUTURO', cells: ['2-2','2-3','2-4','2-5','2-6','2-7'] },
      { answer: 'EMPATIA', cells: ['4-1','4-2','4-3','4-4','4-5','4-6','4-7'] },
      { answer: 'METAS', cells: ['6-4','6-5','6-6','6-7','6-8'] }
    ],
    clues: {
      horizontales: [
        { num: 1, text: "Principios que nos guían." },
        { num: 3, text: "Hacia donde miramos con innovación." },
        { num: 4, text: "Ponerse en el lugar del otro." },
        { num: 5, text: "Objetivos a alcanzar." }
      ],
      verticales: [
        { num: 2, text: "Nuestra marca (anograma)." }
      ]
    }
  },
  {
    grid: [
      ['M','O','T','I','V','A','R','*','*','*'],
      ['*','*','*','*','*','C','*','*','*','*'],
      ['*','P','A','S','I','O','N','*','*','*'],
      ['*','*','*','*','*','G','*','*','*','*'],
      ['*','*','G','U','I','A','R','*','*','*'],
      ['*','*','*','*','*','D','*','*','*','*'],
      ['*','*','*','A','L','M','A','*','*','*'],
      ['*','*','*','*','*','A','*','*','*','*']
    ],
    numbers: { '0-0': 1, '0-5': 2, '2-1': 3, '4-2': 4, '6-3': 5 },
    words: [
      { answer: 'MOTIVAR', cells: ['0-0','0-1','0-2','0-3','0-4','0-5','0-6'] },
      { answer: 'ACOGIDA', cells: ['0-5','1-5','2-5','3-5','4-5','5-5','6-5','7-5'] },
      { answer: 'PASION', cells: ['2-1','2-2','2-3','2-4','2-5','2-6'] },
      { answer: 'GUIAR', cells: ['4-2','4-3','4-4','4-5','4-6'] },
      { answer: 'ALMA', cells: ['6-3','6-4','6-5','6-6'] }
    ],
    clues: {
      horizontales: [
        { num: 1, text: "Dar motivos para el entusiasmo." },
        { num: 3, text: "Energía vital que ponemos en el trabajo." },
        { num: 4, text: "Dirigir el camino." },
        { num: 5, text: "Espíritu de nuestra marca." }
      ],
      verticales: [
        { num: 2, text: "El arte de recibir con los brazos abiertos." }
      ]
    }
  }
];

export default function Crucigrama() {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const [dayIndex, setDayIndex] = useState(0);

  // Initialize strictly on client to avoid hydration mismatch
  useEffect(() => {
    setDayIndex(Math.floor(Date.now() / 86400000) % DAILY_CRUCIGRAMAS.length);
  }, []);

  const current = DAILY_CRUCIGRAMAS[dayIndex];

  const handleChange = (r: number, c: number, val: string) => {
    const newVal = val.toUpperCase();
    const newInputs = { ...inputs, [`${r}-${c}`]: newVal };
    setInputs(newInputs);

    // Check words
    const completed: string[] = [];
    current.words.forEach(w => {
      let isWordComplete = true;
      w.cells.forEach((cell, idx) => {
        if (newInputs[cell] !== w.answer[idx]) {
          isWordComplete = false;
        }
      });
      if (isWordComplete) completed.push(w.answer);
    });
    setCorrectWords(completed);
  };

  const solved = correctWords.length === current.words.length;

  return (
    <div className={styles.gameContainer}>
      <h3 className={styles.gameTitle}>Crucigrama: Cultura y Propósito</h3>
      <p className={styles.instructions}>Escribe en las casillas blancas. ¡Las palabras correctas se iluminarán en verde!</p>
      <div className={styles.crucigramaLayout}>
        <div className={styles.crucigramaGrid}>
          {current.grid.map((row, r) => (
            <div key={r} className={styles.cruciRow}>
              {row.map((cell, c) => {
                if (cell === '*') {
                  return <div key={c} className={styles.cruciCellBlack} />;
                }
                const isGreen = correctWords.some(w => 
                  current.words.find(x => x.answer === w)?.cells.includes(`${r}-${c}`)
                );
                return (
                  <div key={c} className={styles.cruciCellWrap}>
                    {current.numbers[`${r}-${c}`] && (
                      <span className={styles.cruciNumber}>{current.numbers[`${r}-${c}`]}</span>
                    )}
                    <input
                      type="text"
                      maxLength={1}
                      className={`${styles.cruciInput} ${isGreen ? styles.cruciInputCorrect : ''}`}
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
            {current.clues.horizontales.map(h => (
               <p key={h.num}><strong>{h.num}.</strong> {h.text}</p>
            ))}
          </div>
          <div className={styles.clueGroup}>
            <h4>Verticales</h4>
            {current.clues.verticales.map(v => (
               <p key={v.num}><strong>{v.num}.</strong> {v.text}</p>
            ))}
          </div>
        </div>
      </div>
      {solved && (
        <div className={styles.successMessage}>¡Impresionante! Has resuelto este crucigrama gigante.</div>
      )}
    </div>
  );
}
