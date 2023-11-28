import React, { useState, useEffect } from 'react';

import { Base64 } from 'js-base64';

import './App.css';
import logo from './assets/klarna-banner-4-3.png';
import Form from "./components/Form";
import useForm from "./hooks/useForm";
import {leaderboardAPI, leaderboardCode, Member} from "./consts";

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isOpen, toggle } = useForm();
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState('');

  const fetchLeaderboard = async () => {
    const response = await fetch(leaderboardAPI, {
      headers: {
        authorization: 'Basic ' + Base64.encode(process.env.REACT_APP_API_USER + ":" + process.env.REACT_APP_API_PASS )
  }
    });
    const responseData = await response.json();
    let leaderboard = [];
    const keys = Object.keys(responseData.members);
    for (let i = 0; i < keys.length; i++) {
      const record = responseData.members[keys[i]];
      leaderboard.push(record);
    }
    //leaderboard.sort((a, b) => (a.local_score < b.local_score) ? 1 : -1);

    leaderboard.sort(function (a, b) {
      if (a.stars === b.stars) {
        return b.local_score - a.local_score;
      }
      return a.stars < b.stars ? 1 : -1;
    });
    // @ts-ignore
    setLeaderboard(leaderboard);
    setIsLoaded(true);
  };

  useEffect(() => {
    setIsVerified(localStorage.getItem( 'isVerified' ) === 'true');
    fetchLeaderboard();
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 10000); // refreshing leaderboard every 10s in case something is wrong with api
    return () => clearInterval(interval);
  }, []);

  const checkPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if ( password === process.env.REACT_APP_PASS ) {
      setIsVerified(true);
      localStorage.setItem( 'isVerified','true');
    }
  };

  const renderForm = (
    <div className="app">
      <div className="login-form">
        <div className="form">
          <form onSubmit={ checkPassword }>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="button-container">
              <input className="confirm-password" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isVerified ? renderForm :
      <div className="App">
        <header className="App-header">
          <a className="logo-container" href="https://adventofcode.com/" target="_blank" rel="noreferrer">
            <img src={logo} alt="AoC Logo"/>
          </a>
          <p>
            Klarna's internal <b>Advent Of Code</b> leaderboard.
          </p>
          <small>
            y.2023 | Dec 1st - Dec 25th
          </small>
        </header>
        <div className="card">
          <div className="leader-board-link">
            To participate in Klarna's internal competition, you need to sign up in 2 steps:
            1. <u>Join</u> the AoC leaderboard using the following ID: <u>{leaderboardCode}</u>
            2. <u onClick={toggle}>Register</u> yourself in the Klarna internal leaderboard.
          </div>
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
                  return <tr key={index + 1}>
                    <th> {index + 1} </th>
                    <th>{member.name === null ? 'Anonymous ' + member.id : member.name} </th>
                    <th> {member.stars} </th>
                  </tr>;
                })}
                </tbody>
              </table>
            }
          </div>
        </div>
        {isOpen &&
          <Form isOpen={isOpen} toggle={toggle}/>
        }
      </div>
      }
    </>
  );
}

export default App;