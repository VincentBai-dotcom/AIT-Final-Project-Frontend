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
            <button key = {key} onClick={() => submitAnswer(qualities[index])}> {qualities[index]}</button>
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
                console.log(res.data.stats);
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
            return (<p>Correct!</p>);
        }
        else {
            return (<p>Incorrect, the answer is {quality}!</p>)
        }
    }

    return(
        <>
            {showAnswer && <><button onClick= {playInterval}>Play Interval</button> <br></br></>}
            {showAnswer && getAnswer()}
            {!showAnswer && getResult()}
            {!showAnswer && <button onClick={getNewInterval}>Next</button>}
        </>
    );
}
export default Interval;

