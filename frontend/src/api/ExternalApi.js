// ExternalApi.js

const categories = [
    "flachwitze",
    "lehrerwitze",
    "programmierwitze",
    "scherzfragen",
    "chuck-norris-witze",
    "antiwitze",
    "blondinenwitze",
    "schulwitze",
    "ddr-witze",
    "arztwitze"
  ];
  
  const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  
  const getRandomLimit = () => {
    return Math.floor(Math.random() * 3) + 1;
  };
  
  export const fetchRandomJokes = async () => {
    const limit = getRandomLimit();
    const category = getRandomElement(categories);
    const language = 'de'; // Default-Sprache
  
    const apiUrl = `https://witzapi.de/api/joke/?limit=${limit}&category=${category}&language=${language}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const jokes = await response.json();
      return jokes;
    } catch (error) {
      console.error('Error fetching jokes:', error);
      return [];
    }
  };
  