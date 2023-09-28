import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Settings() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Define the API URL with your API key
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    // Fetch movie data from the API
    fetch(API_URL)
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        // Update the movies state with the fetched data
        setMovies(data.results);

        // Log the fetched movie data
        console.log('Fetched movie datas:', data.results);
      })
      .catch((error) => {
        // Log any errors that occur during the fetch
        console.error('Error fetching movies:', error);
      });
  }, []); 

  return (
    <div className="App">
  
    </div>
  );
}

export default Settings;
