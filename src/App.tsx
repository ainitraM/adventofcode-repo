import React, { useState, useEffect } from 'react';

import './App.css';
import logo from './assets/tree.svg';

type Member = {
  global_score: number;
  id: number;
  last_star_ts: string;
  local_score: number;
  name: string;
  stars: number;
}

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchLeaderboard = async () => {
    const response = await fetch('https://adventofcode-api.vercel.app/api/leaderboard');
    const responseData = await response.json();
    let leaderboard = [];
    const keys = Object.keys(responseData.members);
    for (let i = 0; i < keys.length; i++) {
      const record = responseData.members[keys[i]];
      leaderboard.push(record);
    }
    leaderboard.sort((a, b) => (a.local_score < b.local_score) ? 1 : -1);
    /*
    leaderboard.sort(function (a, b) {
      if (a.stars === b.stars) {
        return b.local_score - a.local_score;
      }
      return a.stars < b.stars ? 1 : -1;
    }); */
    // @ts-ignore
    setLeaderboard(leaderboard);
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 10000); // refreshing leaderboard every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a className="logo-container" href="https://adventofcode.com/" target="_blank" rel="noreferrer">
          <img src={logo} className="logo" alt="AoC Logo" />
        </a>
        <p>
          Klarna's internal <b>Advent Of Code</b> leaderboard.
        </p>
      </header>
      <div className="card">
        <button onClick={() => console.log(leaderboard)}>
          Print leaderboard
        </button>
        <div className="score-table-wrapper">
          {isLoaded &&
		        <table className="score-table">
			        <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Global Score</th>
                  <th>Local Score</th>
                  <th>Starts</th>
                </tr>
			        </thead>
			        <tbody>
                {leaderboard.map((member: Member, index) => {
                  return  <tr key={ index }>
                    <th> { index } </th>
                    <th>{ member.name === null ? 'Anonymous ' + member.id : member.name } </th>
                    <th> {member.global_score } </th>
                    <th> {member.local_score } </th>
                    <th> {member.stars } </th>
                  </tr>;
                })}
			        </tbody>
		        </table>
          }
        </div>
        <div className="leader-board-link">
          Visit <a href="https://adventofcode.com/" target="_blank" rel="noreferrer">
            AoC site</a> and join the Leaderboard of Klarna with the code <code>2243249-81a30f2c</code>.
        </div>
      </div>
    </div>
  );
}

export default App;
