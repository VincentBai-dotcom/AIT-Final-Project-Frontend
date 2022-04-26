import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Chord from './Chord';
import Stats from './Stats';
import { useEffect, useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';
import Interval from './Interval';

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const history = useNavigate();


  function home(){
    return(
      <>
        <p>{username ? `Hey ${username}!` : "Hey guest!"}</p>
      </>
    )
  }

  function nav(){
    return (
      <>
        <nav>
          <Link to = ""> Home</Link>
          {!username && <Link to="/login">Login</Link>}
          <Link to= "/chord">Chord</Link>
          <Link to= "/stats"> Stats</Link>
          <Link to= "/interval">Interval</Link>
          {username && <button onClick={handleLogOut}>Log out</button>}
        </nav>
      </>
    );
  }

  function handleLogOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername("");
    history('/');
  }


  return(
    <div className='App'>
    {nav()}
      <Routes>
        <Route path = "/" element = {home()}/>
        <Route path = "/login" element = {<Login/>}/> 
        <Route path = "/chord" element = {<Chord/>}/>
        <Route path = "/interval" element = {<Interval/>}></Route>
        <Route path = "/stats" element = {<Stats/>}/>
        
      </Routes>
    </div>
  );
}

export default App;