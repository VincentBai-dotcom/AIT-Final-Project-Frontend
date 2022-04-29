import { useState } from 'react';
import api from './api';
import * as Tone from 'tone'

const notes = 
["C3", "Db3","D3", "Eb3","E3","F3", "Gb3","G3", "Ab3","A3", "Bb3","B3",
"C4", "Db4","D4", "Eb4","E4","F4", "Gb4","G4", "Ab4","A4", "Bb4","B4",
"C5", "Db5","D5", "Eb5","E5","F5", "Gb5","G5", "Ab5","A5", "Bb5","B5",
"C6", "Db6","D6", "Eb6","E6","F6", "Gb6","G6", "Ab6","A6", "Bb6","B6",
"C7", "Db7","D7", "Eb7","E7","F7", "Gb7","G7", "Ab7","A7", "Bb7","B7",];

const qualities = 
["Perfect Unison",
"Minor Second",
"Major Second",
"Minor Third",
"Major Third",
"Perfect Fourth",
"Tritone",
"Perfect Fifth",
"Minor Sixth",
"Major Sixth",
"Minor Seventh",
"Major seventh",
"Perfect octave"];

function Interval(){
    const [note, setNote] = useState(getRandomNote());
    const [quality, setQuality] = useState(getRandomQuality());
    const [answer, setAnswer] = useState("");
    const [showAnswer, setShowAnswer] = useState(true);

    function getRandomNote(){
        return  Math.floor(Math.random() * 32);
    }

    function getRandomQuality(){
        return qualities[Math.floor(Math.random() * 13)];
    }

    function getInterval(){
        for(let i = 0; i < 13; i++){
            if(quality === qualities[i]){
                return [notes[note], notes[note+i]];
            }
        }
    }

    async function playInterval(){
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        await Tone.start()
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
          }

        const [firstNote, secondNote] = getInterval(note,quality);
        synth.triggerAttackRelease(firstNote,"8n");
        synth.triggerAttackRelease(secondNote,"8n");
        console.log("correct answer "+quality);
    }

    function getNewInterval(){
        setNote(getRandomNote());
        setQuality(getRandomQuality());
        setShowAnswer(true);
    }

    function answerButtonGenerator(index,key){
        return( 
            <button key = {key} onClick={() => submitAnswer(qualities[index])} className="m-1 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"> {qualities[index]}</button>
        );
    }

    async function submitAnswer(userAnswer){
        setAnswer(userAnswer);
        if(localStorage.getItem('username')){
            api.post('stats/', {
                username: localStorage.getItem('username'),
                type: "interval",
                quality: quality,
                correct: userAnswer === quality
            })
            .then((res) =>{
                console.log("Submitted");
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        setShowAnswer(false);
    }

    function getAnswer(){
        return (
            <>
                {Array.from(Array(13).keys()).map((index,key) => {
                    return answerButtonGenerator(index,key);
                })}
            </>
        );
    }

    function getResult(){
        if(quality === answer){
            return (<div className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3" role="alert">
            {"Correct !"}
            </div>);
        }
        else {
            return (
                <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3" role="alert">
                {`Incorrect, the answer is ${quality}!`}
                </div>)
        }
    }

    return(
        <>
            {showAnswer && <><button onClick= {playInterval} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Play Interval</button> <br></br></>}
            <br></br>
            {showAnswer && getAnswer()}
            {!showAnswer && getResult()}
            {!showAnswer && <button onClick={getNewInterval }className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Next</button>}
        </>
    );
}
export default Interval;

