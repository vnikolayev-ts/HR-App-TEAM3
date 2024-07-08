import React, { useState, useEffect } from 'react';
import './AnalogClock.css'; // Stil für die analoge Uhr

const AnalogClock = () => {
  const [time, setTime] = useState(new Date()); // Aktuelle Zeit als State

  // Funktion zum Aktualisieren der Zeit
  const updateClock = () => {
    setTime(new Date());
  };

  // useEffect zum Starten des Intervals beim ersten Laden
  useEffect(() => {
    const clockInterval = setInterval(() => {
      updateClock(); // Uhrzeit aktualisieren
    }, 1000); // Alle 1000 Millisekunden = 1 Sekunde

    // Cleanup-Funktion für useEffect
    return () => clearInterval(clockInterval); // Interval beim Unmount der Komponente stoppen
  }, []); // Leeres Abhängigkeits-Array sorgt dafür, dass useEffect nur einmal ausgeführt wird

  // Aktuelle Zeitwerte
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Berechnung der Rotationswinkel für Stunden-, Minuten- und Sekundenzeiger
  const hourAngle = (hours % 12) * 30 + minutes / 2; // Jede Stunde 30 Grad, jede Minute 0.5 Grad
  const minuteAngle = minutes * 6; // Jede Minute 6 Grad
  const secondAngle = seconds * 6; // Jede Sekunde 6 Grad

  return (
    <div className="analog-clock">
      <div className="clock-face">
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${hourAngle}deg)` }}
        ></div>
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        ></div>
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${secondAngle}deg)` }}
        ></div>
        <div className="center-circle"></div>
      </div>
    </div>
  );
};

export default AnalogClock;
