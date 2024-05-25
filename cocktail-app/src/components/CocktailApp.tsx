import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';

const BACKEND_API_URL = 'http://localhost:5000/api/generate';

const CocktailApp: React.FC = () => {
  const [result, setResult] = useState<string>('');

  const fetchFromBackend = async (prompt: string) => {
    try {
      const response = await axios.post(BACKEND_API_URL, { prompt });

      if (response.status === 200) {
        setResult(response.data.choices[0].text);
      } else {
        setResult(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching from backend:', error);
      setResult(`Error: ${error}`);
    }
  };

  const handleMakeCocktail = () => {
    const cocktailName = prompt('Enter the cocktail name:');
    if (cocktailName) {
      fetchFromBackend(`How to make a ${cocktailName} cocktail? Provide the recipe in JSON format with fields "name", "ingredients", and "steps". Use up to 150 tokens. For the "ingredients" values, put name and quantity in the same string.`);
    }
  };

  const handleFindCocktails = () => {
    const ingredients = prompt('Enter the ingredients (comma separated):');
    if (ingredients) {
      fetchFromBackend(`What cocktail can I make with ${ingredients}? Provide five cocktail recipes. Provide the recipe in JSON format with fields "name", "ingredients", and "steps". Use up to 150 tokens. For the "ingredients" values, put name and quantity in the same string.`);
    }
  };

  return (
    <div className="app-container">
      <Button label="How to make a [_] ?" onClick={handleMakeCocktail} />
      <Button label="What to make with [_]?" onClick={handleFindCocktails} />
      {result && <div className="result">
        <pre>{result}</pre>
      </div>}
    </div>
  );
};

export default CocktailApp;
