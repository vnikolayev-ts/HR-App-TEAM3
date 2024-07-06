import React from 'react';

// Funktion zur Berechnung der Balkenstufen
export const getBarLevelsForScore = (score) => {
  const levels = [];
  const maxLevel = 10; // Maximal 10 Balkenstufen für den Verlauf
  const step = 5; 
  // Berechne die Balkenstufen bis zum Score oder bis zum Maximum von 10 Stufen
  for (let i = 0; i < maxLevel; i++) {
    if (score >= (i + 1) * step) {
      levels.push(10); // Jede Stufe ist 10%
    } else if (score > i * step) {
      levels.push(score - i * step); // Rest für die letzte Stufe
    } else {
      levels.push(0); // Keine Füllung für Stufen unter dem MA-Score
    }
  }

  return levels;
};

// Funktion zur Berechnung der Hintergrundfarbe der Balkenstufen mit Farbverlauf von Rot nach Grün basierend auf dem Index
export const getColorForLevel = (score, index) => {
  const maxLevel = 10; // Maximal 10 Balkenstufen für den Verlauf
  const gradientStop = Math.min(Math.floor(score / 10.1), maxLevel - 1); // Stopp des Farbverlaufs basierend auf dem Score

  if (index <= gradientStop) {
    // Farbverlauf von Rot nach Grün basierend auf dem Index
    const red = Math.round((1 - index / (maxLevel - 1)) * 255);
    const green = Math.round((index / (maxLevel - 1)) * 255);
    return `rgba(${red}, ${green}, 0, 1)`;
  } else {
    return 'white'; // Ab dem Stoppindex weiß
  }
};

// React-Komponente zur Anzeige des Scores
const ScoreComponent = ({ score }) => {
  return (
    <div className="score">
      {getBarLevelsForScore(score).map((level, index) => (
        <div
          className="scoreItem"
          key={index}
          style={{
            flex: `${level}%`,
            backgroundColor: getColorForLevel(score, index),
            borderRight: getColorForLevel(score, index) !== 'white' ? 'none' : 'none',
          }}
        ></div>
      ))}
    </div>
  );
};

export default ScoreComponent;
