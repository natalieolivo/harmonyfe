import React from "react";
import Header from "../header/header";

const account = function(props) {
    const createUserForm = document.querySelector('#createUserForm');    
    const localStorage = window.localStorage;
    const endpoint = "http://localhost";
    const port = 9999;       
    
    const onCreateAccount = event => {
        console.log("go display some auth");
    }

    const onLogInUser = event => {
        event.preventDefault();
        props.handleisUserUpdate(true);
    }

    return (
        <section className="account-create-section">
            <Header />                      
            <form onSubmit={onCreateAccount} className="create-account-form" id="createUserForm" method="POST" action="http://localhost:9999/users">
                <fieldset>
                    <input name="firstName" id="createFirstName" className="login-input" type="text"></input>
                    <label htmlFor="firstName" className="login-label">
                        <span className="login-label-text" data-text="first name">first name</span>
                    </label>
                </fieldset>
                <fieldset>
                    <input name="lastName" id="createLastName" className="login-input" type="text"></input>
                    <label htmlFor="lastName" className="login-label">
                        <span className="login-label-text" data-text="last name">last name</span>
                    </label>
                </fieldset>
                <fieldset>
                    <input name="email" id="createEmail" className="login-input" type="text"></input>
                    <label htmlFor="email" className="login-label">
                        <span className="login-label-text" data-text="email">email</span>
                    </label>
                </fieldset>    
                <fieldset>
                    <input name="password" id="createPassword" className="login-input" type="text"></input>
                    <label htmlFor="password" className="login-label">
                        <span className="login-label-text" data-text="password">password</span>
                    </label>
                </fieldset>
                <button className="login-button">Create an Account</button>            
            </form>
            <a onClick={onLogInUser}>Already a user</a>
        </section>
    )
};
export default account;