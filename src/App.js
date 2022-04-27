import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Chord from './Chord';
import Stats from './Stats';
import { useEffect, useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';
import Interval from './Interval';
import "./App.css";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const history = useNavigate();


  function home(){
    return(
      <>
        
        <div >
          <Link to= "/chord" className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-lg leading-tight rounded hover:bg-gray-100 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out">Practice Chord</Link> <br></br>
          <Link to= "/interval" className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-lg leading-tight rounded hover:bg-gray-100 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out">Practice Interval</Link><br></br>
          <Link to= "/stats" className='inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-lg leading-tight rounded hover:bg-gray-100 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out'>Stats</Link><br></br>
          {!username && <Link to="/login" className='inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-lg leading-tight rounded hover:bg-gray-100 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out'>Login</Link>}
          {username && <button onClick={handleLogOut} className = "inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-lg leading-tight rounded hover:bg-gray-100 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out">Log out</button>}
        </div>
        
      </>
    )
  }

  function nav(){
    return (
      <>
        <nav>
          <Link to = "" className='font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600'> Home</Link>
          <h1 className='text-blue-600 text-3xl font-bold '>{username ? `Hey ${username}!` : "Hey guest!"}</h1>
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
    <div className='container mx-auto px-20'>
    {nav()}
      <div className='py-2.5'>
        <Routes>
          <Route path = "/" element = {home()}/>
          <Route path = "/login" element = {<Login/>}/> 
          <Route path = "/chord" element = {<Chord/>}/>
          <Route path = "/interval" element = {<Interval/>}></Route>
          <Route path = "/stats" element = {<Stats/>}/>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;