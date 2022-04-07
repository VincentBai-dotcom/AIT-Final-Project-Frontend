import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [correctNum, setCorrectNum] = useState(0);
  const [num, setNum] = useState(0);
  return (
    <div className="App">
      <button onClick={() => {setNum(num + 1);setCorrectNum(correctNum+1)}}>Right answer</button>
      <button onClick={() => {setNum(num + 1);}}>Wrong answer</button>
      <p>Stats: {correctNum} / {num} </p>
    </div>
  );
}

export default App;
