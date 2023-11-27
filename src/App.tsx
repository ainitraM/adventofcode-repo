import React, { useState, useEffect } from 'react';

import './App.css';
import logo from './assets/klarna-banner-4-3.png';
import Form from "./components/Form";
import useForm from "./hooks/useForm";
import {leaderboardAPI, leaderboardCode, Member} from "./consts";

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isOpen, toggle } = useForm();

  const fetchLeaderboard = async () => {
    const response = await fetch(leaderboardAPI);
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
    }, 10000); // refreshing leaderboard every 10s in case something is wrong with api
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a className="logo-container" href="https://adventofcode.com/" target="_blank" rel="noreferrer">
          <img src={logo} alt="AoC Logo" />
        </a>
        <p>
          Klarna's internal <b>Advent Of Code</b> leaderboard.
        </p>
        <small>
          y.2023 | Dec 1st - Dec 25th
        </small>
      </header>
      <div className="card">
        <div className="score-table-wrapper">
          {isLoaded &&
		        <table className="score-table">
			        <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Stars &#11088;</th>
                </tr>
			        </thead>
			        <tbody>
                {leaderboard.map((member: Member, index) => {
                  return  <tr key={ index+1 }>
                    <th> { index+1 } </th>
                    <th>{ member.name === null ? 'Anonymous ' + member.id : member.name } </th>
                    <th> {member.stars } </th>
                  </tr>;
                })}
			        </tbody>
		        </table>
          }
        </div>
        <div className="leader-board-link">
          <u onClick={toggle}>Register</u> yourself and <a href="https://adventofcode.com/" target="_blank" rel="noreferrer">
             join the Leaderboard of Klarna</a> using the code <code>{ leaderboardCode }</code>.
        </div>
      </div>
      {isOpen &&
        <Form isOpen={isOpen} toggle={toggle}/>
      }
    </div>
  );
}

export default App;
