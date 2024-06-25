  // Funktion zur Berechnung der Balkenstufen basierend auf dem MA-Score mit 5 Farbstufen
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
    const gradientStop = Math.min(Math.floor(score / 10), maxLevel - 1); // Stopp des Farbverlaufs basierend auf dem Score
  
    if (index <= gradientStop) {
      // Farbverlauf von Rot nach Grün basierend auf dem Index
      const red = Math.round((1 - index / (maxLevel - 1)) * 255);
      const green = Math.round((index / (maxLevel - 1)) * 255);
      return `rgba(${red}, ${green}, 0, 1)`;
    } else {
      return 'white'; // Ab dem Stoppindex weiß
    }
  };

    // Funktion zur Erstellung der Sterne für einen Wert von 0 bis 10
   export  const renderStars = (value) => {
      const stars = [];
      for (let i = 1; i <= 10; i++) {
        if (i <= value) {
          stars.push(<span class="star_full" key={i} style={{ color: 'gold', fontSize: 45 }}  onmouseover="this.style.backgroundColor='red';">★</span>);
        } else {
          stars.push(<span class="star_empty" key={i} style={{ color: '#ccc', fontSize: 45 }}>★</span>);
        }
      }
      return stars;
    };