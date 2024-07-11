import React, { useState, useEffect, useRef } from 'react';
import { fetchRandomJokes } from '../../api/ExternalApi';

const JokeComponent = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const countdownIntervalRef = useRef(null); // Ref für das Interval-Objekt
  const [countdown, setCountdown] = useState(60);

  // Funktion zum Abrufen und Setzen neuer Witze
  const getNewJokes = async () => {
    setLoading(true);
    const newJokes = await fetchRandomJokes();
    setJokes(newJokes);
    setLoading(false);
    resetCountdown(); // Countdown zurücksetzen nach manuellem Klick auf "Sync Jokes"
  };

  // Funktion zum Zurücksetzen des Countdowns
  const resetCountdown = () => {
    setCountdown(60);
  };

  // Funktion zum Starten des Intervals
  const startCountdown = () => {
    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          clearInterval(countdownIntervalRef.current); // Interval stoppen, wenn Countdown bei 1 ist
          getNewJokes(); // Neue Witze abrufen
          resetCountdown(); // Countdown zurücksetzen
        }
        return prevCountdown - 1; // Countdown um 1 reduzieren
      });
    }, 1000); // Alle 1000ms = 1 Sekunde
  };

  // useEffect zum Starten und Beenden des Intervals
  useEffect(() => {
    startCountdown(); // Interval beim ersten Laden starten

    return () => {
      clearInterval(countdownIntervalRef.current); // Interval beim Unmount der Komponente stoppen
    };
  }, []); // Leeres Abhängigkeits-Array sorgt dafür, dass useEffect nur einmal ausgeführt wird

  // Countdown-Text generieren
  const countdownText = `New Joke in ${countdown}s`;

  return (
    <div>
      <h3 className='dashTitle'>You`re best dressed with a smile!</h3>
      <div>
        <p>{countdownText}</p>
        {loading ? (
          <p>Loading...</p>
        ) : jokes.length > 0 ? (
          jokes.map((joke, index) => (
            <p key={index}>{joke.text}</p>
          ))
        ) : (
          <p>No jokes available</p>
        )}
        <button onClick={getNewJokes}>New Jokes from api</button>
      </div>
    </div>
  );
};

export default JokeComponent;
