import React, { useState, useEffect, useRef } from 'react';
import { fetchRandomJokes } from '../../api/ExternalApi';

const JokeComponent = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const countdownIntervalRef = useRef(null); // Ref für das Interval-Objekt
  const [countdown, setCountdown] = useState(60);
  const [retryCount, setRetryCount] = useState(0);
  const divRef = useRef(null); // Ref für das div-Element

  // Funktion zum Abrufen und Setzen neuer Witze
  const getNewJokes = async (retry = true) => {
    setLoading(true);
    try {
      const newJokes = await fetchRandomJokes();
      if (newJokes.length > 0 || retryCount >= 3) {
        setJokes(newJokes);
        setRetryCount(0);
      } else if (retry) {
        setRetryCount((prevRetryCount) => prevRetryCount + 1);
        getNewJokes();
      }
    } catch (error) {
      console.error('Error fetching jokes:', error);
      if (retry && retryCount < 3) {
        setRetryCount((prevRetryCount) => prevRetryCount + 1);
        getNewJokes();
      }
    } finally {
      setLoading(false);
    }
  };

  // Funktion zum Zurücksetzen des Countdowns
  const resetCountdown = () => {
    setCountdown(60);
  };

  // Funktion zum Starten des Countdowns
  const startCountdown = () => {
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(countdownIntervalRef.current); // Interval stoppen, wenn Countdown bei 1 ist
          getNewJokes(); // Neue Witze abrufen
          resetCountdown(); // Countdown zurücksetzen
        }
        return prevCountdown - 1; // Countdown um 1 reduzieren
      });
    }, 1000); // Alle 1000ms = 1 Sekunde
  };

  // useEffect zum Starten und Beenden des Countdowns
  useEffect(() => {
    startCountdown(); // Interval beim ersten Laden starten

    return () => {
      clearInterval(countdownIntervalRef.current); // Interval beim Unmount der Komponente stoppen
    };
  }, [jokes, startCountdown]); // Leeres Abhängigkeits-Array sorgt dafür, dass useEffect nur einmal ausgeführt wird

  // useEffect, um eine Funktion aufzurufen, wenn das div-Element geladen wird
  useEffect(() => {
    if (divRef.current) {
      console.log('div element has loaded');
      getNewJokes(false);
      // Hier die gewünschte Funktion aufrufen
    }
  }, [loading, jokes]); // Abhängig von loading und jokes

  // Countdown-Text generieren
  const countdownText = `New Joke in ${countdown}s`;

  return (
    <div ref={divRef}>
      <h3 className='dashTitle'>You're best dressed with a smile!</h3>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : jokes.length > 0 ? (
          jokes.map((joke, index) => (
            <p key={index}>{joke.text}</p>
          ))
        ) : (
          <p  ref={divRef}>No jokes available</p>
        )}
        <button onClick={() => getNewJokes(false)}>New Jokes from API</button>
      </div>
      <p>{countdownText}</p>
    </div>
  );
};

export default JokeComponent;


