import React, { useState, useEffect } from "react";
import Header from "../header/header";
import "./welcome.scss";
import "../assets/icons/user";
import USERSVG from "../assets/icons/user";

export default (props) => {
    let diagnostic;
    let recognition;
    let SpeechRecognition;


    // Similar to using componentDidMount in a class based component
    // this will run on first render
    useEffect(()=> {
        SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
        diagnostic = document.querySelector('.output');
        recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = event => {
            // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
            // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
            // It has a getter so it can be accessed like an array
            // The [last] returns the SpeechRecognitionResult at the last position.
            // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
            // These also have getters so they can be accessed like arrays.
            // The [0] returns the SpeechRecognitionAlternative at position 0.
            // We then return the transcript property of the SpeechRecognitionAlternative object            
            let last = event.results.length - 1;
            let spokenText = event.results[last][0].transcript;            
            console.log('Confidence: ' + event.results[0][0].confidence);                         

            diagnostic.textContent = spokenText + '.';                    
            diagnostic.classList.remove("start");

            setTimeout(() => {                
                diagnostic.classList.add("start");
            }, 1000)
        }

    }, [])

    const onRecordAudio = event => {        
        recognition.start();
        console.log('Ready to receive a command.');
    };

    const onStopRecording = event => {
        recognition.abort();
        console.log('Stop recieving commands.');
    };    

    return (
        <section className="welcome-section">
             <div className="welcome-user">
                <USERSVG />                
                <div>{props.email}</div>                
            </div>            
            <Header />
            <section>
                <div className="output">This will be replaced</div>                
                
            </section>
            <div className="welcome-controls">
                <button onClick={onRecordAudio} className="welcome-button button">Record Audio</button>
                <button onClick={onStopRecording} className="welcome-button button">Stop Recording</button>
                <a href="/logout">logout</a>
            </div>            
        </section>
    );

}