import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Chord from './Chord';


function App() {
  // const [correctNum, setCorrectNum] = useState(0);
  // const [num, setNum] = useState(0);
  // return (
  //   <div className="App">
  //     <button onClick={() => {setNum(num + 1);setCorrectNum(correctNum+1)}}>Right answer</button>
  //     <button onClick={() => {setNum(num + 1);}}>Wrong answer</button>
  //     <p>Stats: {correctNum} / {num} </p>
  //   </div>
  // );

  return(
    <div className='App'>
    <Home/>
      <Routes>
        <Route path = "/login" element = {<Login/>}/> 
        <Route path = "/chord" element = {<Chord/>}></Route>
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <nav>
        <Link to="/login">Login</Link>
        <Link to= "/chord">Chord</Link>
      </nav>
    </>
  );
}

export default App;