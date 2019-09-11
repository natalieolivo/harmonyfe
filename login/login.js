import "./login-copy.scss";
import React from "react";
import Header from "../header/header";

import { RenderErrors } from "../error/error";

const Login = function(props) {
    const localStorage = window.localStorage;
    const harmonyAPIPort = 9999;
    const usersEndpoint = '/auth';     
    const errorBuffer = [];    
    let jsonFormData;
    
    // I borrowed this ...
    // It's basically just mapping reduce function to an object. Need to explore if I can just
    // use forEach here. What I gain is that third param that I can pass in and reduce to a fully formed
    // JSON form data, but not sure if that is sensible use of reduce.
    // update to self: isn't crawling the DOM an antipattern in react?
    let formToJSON = (formElements) => [].reduce.call(formElements, (data, element) => {
        data[element.name] = element.value;
        return data;
    }, {});    

    const onCreateUserAccount = (event) => {
        event.preventDefault();
        props.handleisUserUpdate(false);        
    };

    const onSubmit = (event) => {
        const userform = document.querySelector('#userForm');
        
        event.preventDefault();        
        jsonFormData = formToJSON(userform.elements);
        console.log("data", jsonFormData);
        fetch(`http://localhost:${harmonyAPIPort}${usersEndpoint}`, {
            method: 'POST',
            body: JSON.stringify(jsonFormData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {            
                return response.json();
        }).then((responseBody)=> {
            if(responseBody.errors) {
                errorBuffer.push(responseBody.errors);
                
                RenderErrors(responseBody.errors);
                console.error(responseBody.errors);
            } else {                  
                localStorage.setItem('token', responseBody.accessToken)
            }                
        });
    };    
        
    //  userform.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     jsonFormData = formToJSON(form.elements);
    //     console.log("data", jsonFormData);
    //     fetch(`http://localhost:${harmonyAPIPort}${usersEndpoint}`, {
    //         method: 'POST',
    //         body: JSON.stringify(jsonFormData),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(function(response) {            
    //             return response.json();
    //     }).then((responseBody)=> {
    //         if(responseBody.errors) {
    //             errorBuffer.push(responseBody.errors);
                
    //             RenderErrors(responseBody.errors);
    //             console.error(responseBody.errors);
    //         } else {                    
    //             localStorage.setItem('token', responseBody.accessToken)
    //         }                
    //     });
    // });

    return (
        <section className="login-section">                        
            <Header />
            <h2>Please... Login</h2>
            <form onSubmit={onSubmit} className="login-form" id="userForm" method="POST" action="http://localhost:9999/users">            
                <fieldset>
                    <input name="email" id="email" className="login-input" type="text"></input>
                    <label htmlFor="email" className="login-label">
                        <span className="login-label-text" data-text="email">email</span>
                    </label>
                </fieldset>
                <fieldset>
                    <input name="password" type="password" id="password" className="login-input" type="text"></input>
                    <label htmlFor="password" className="login-label">
                        <span className="login-label-text" data-text="password">password</span>
                    </label>
                </fieldset>
                <button className="login-button">Login</button>
                <section className="error-container"></section>          
            </form>
            <a onClick={onCreateUserAccount}>Create User Account</a>
        </section>
        )   
    // Return reference of localStorage created in login module, which as auth token set when a random user was created
    // return { localStorage: localStorage, errors: errorBuffer };

};

export default Login;