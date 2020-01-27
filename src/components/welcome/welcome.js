import React, { useEffect } from "react";
import Header from "../header/header";
import "./welcome.scss";
import USERSVG from "../icons/user";

const API_KEY = `13646643-69d7342a1c7c2731dfefc4fee`;
const IMAGE_SEARCH_API = `https://pixabay.com/api/?key=${API_KEY}`;

export default (props) => {
    let diagnostic;
    let recognition;
    let SpeechRecognition;
    let speechBuffer = "";

    // Similar to using componentDidMount in a class based component
    // this will run on first render
    useEffect(()=> {
        SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        diagnostic = document.querySelector('.output');
        recognition = new SpeechRecognition();
        // recognition.interimResults = true;
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
            speechBuffer += event.results[last][0].transcript;
            console.log('Confidence: ' + event.results[0][0].confidence);                         

            diagnostic.textContent = spokenText + '.';                    
            diagnostic.classList.remove("start");

            setTimeout(() => {                
                diagnostic.classList.add("start");
            }, 500)
            getImageForText(spokenText).then((imageResults) => {
                let container = document.createElement("div");         
                container.setAttribute("class", "results");
                console.log(imageResults);
                imageResults.hits.forEach((result) => {
                    let image = document.createElement("img");
                    image.src = result.previewURL;
                    container.appendChild(image);
                })
                diagnostic.appendChild(container);
            });
        }

    }, []);

    const getImageForText = (spokenText) => {        
        return new Promise((resolve, reject) => {               
            fetch(`${IMAGE_SEARCH_API}&q=${spokenText}&per_page=5`)
                .then((response) => {
                    return response.json();
                })
                .then((results)=> {
                    resolve(results);
                })
                .catch((error) => {
                    console.log("ayoooo", error);
                    reject();
                })                
            });
    };

    const onLogout = event => {
        event.preventDefault();
        props.handleisUserLoggedIn(false);
    };

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
                <a onClick={onLogout} href="/logout">logout</a>
            </div>            
        </section>
    );

}