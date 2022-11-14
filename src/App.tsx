import React, { useState, useEffect } from 'react';

import './App.css';
import logo from './assets/tree.svg';

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:5050/leaderboard');

      const responseData = await response.json();

      setLeaderboard(responseData);
      setIsLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a className="logo-container" href="frontend/src/App" target="_blank">
          <img src={logo} className="logo" alt="AoC Logo" />
        </a>
        <p>
          Klarna's internal <b>Advent Of Code</b> leaderboard.
        </p>
      </header>
      <div className="card">
        <button onClick={() => console.log(leaderboard)}>
          Update leaderboard
        </button>
      </div>
    </div>
  );
}

export default App;
