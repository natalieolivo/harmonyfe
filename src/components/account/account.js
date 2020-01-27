import React from "react";
import Header from "../header/header";
import { RenderErrors } from "../error/error";

const account = function(props) {
        
    const harmonyAPIPort = process.env.PORT || 9999;
    // const endpoint = `http://localhost:${harmonyAPIPort}`;
    const endpoint = `https://harmonyapi.herokuapp.com/`;
    const resource = `/users`;
    
    const onCreateAccount = event => {
        event.preventDefault();
        const createUserForm = document.querySelector('#createUserForm');
        let JSONFormData = (formElements) => [].reduce.call(formElements, (data, element) => {        
            data[element.name] = element.value;            
            return data;
        }, {});                

        fetch(`${endpoint}${resource}`, {
                method: 'POST',
                body: JSON.stringify(JSONFormData(createUserForm.elements)),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            }).then((responseBody) => {
                if(responseBody) {
                    console.log(`user created ${responseBody}`);
                } else {
                    RenderErrors(responseBody.errors);
                }                
            })
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
                <button className="button">Create an Account</button>            
            </form>
            <a onClick={onLogInUser}>Already a user</a>
        </section>
    )
};
export default account;