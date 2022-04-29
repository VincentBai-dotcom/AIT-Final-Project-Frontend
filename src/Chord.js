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
["Major Triad",
"Minor Triad",
"Augmented Triad",
"Diminished Triad",
"Major Seventh",
"Minor Seventh",
"Dominant Seventh",
"Half Diminished Seventh",
"Diminished Seventh"];



function Chord(){
    
    const [note, setNote] = useState(getRandomNote());
    const [quality, setQuality] = useState(getRandomQuality());
    const [answer, setAnswer] = useState("");
    const [showAnswer, setShowAnswer] = useState(true);

    function getRandomQuality(){
        return qualities[Math.floor(Math.random() * 9)];
    }

    function getRandomNote(){
        return  Math.floor(Math.random() * 32);
    }
    
    function getChord(){
        if(quality === "Major Triad"){
            return [notes[note],notes[note+4], notes[note+7]];
        }
        else if(quality === "Minor Triad"){
            return [notes[note],notes[note+3], notes[note+7]];
        }
        else if(quality === "Augmented Triad"){
            return [notes[note],notes[note+4], notes[note+8]];
        }
        else if(quality === "Diminished Triad"){
            return [notes[note],notes[note+3], notes[note+6]];
        }
        else if(quality === "Major Seventh"){
            return [notes[note],notes[note+4], notes[note+7],notes[note+11]];
        }
        else if(quality === "Minor Seventh"){
            return [notes[note],notes[note+3], notes[note+7],notes[note+10]];
        }
        else if(quality === "Dominant Seventh"){
            return [notes[note],notes[note+4], notes[note+7],notes[note+10]];
        }
        else if(quality === "Half Diminished Seventh"){
            return [notes[note],notes[note+3], notes[note+6],notes[note+10]];
        }
        else if(quality === "Diminished Seventh"){
            return [notes[note],notes[note+3], notes[note+6],notes[note+9]];
        }
    }

    async function playChord(){
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        await Tone.start()
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
          }
        synth.triggerAttackRelease(getChord(note,quality),"8n");
        console.log("correct answer "+quality);
    }
    function getNewChord(){
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
                type: "chord",
                quality: quality,
                correct: userAnswer === quality
            })
            .then((res) =>{
                console.log("submitted");
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
                {Array.from(Array(9).keys()).map((index,key) => {
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
            {showAnswer && <><button onClick= {playChord} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Play Chord</button> <br></br></>}
            <br></br>
            {showAnswer && getAnswer()}
            {!showAnswer && getResult()}
            {!showAnswer && <button onClick={getNewChord} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Next</button>}
        </>
    );
}

export default Chord;