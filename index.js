import "./core.scss";
import React from "react";
import ReactDOM from "react-dom";
import Account from "./account/account";
import Login from "./login/login";
import Welcome from "./welcome/welcome";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleisUserUpdate = this.handleisUserUpdate.bind(this);

        this.state = {            
            isUser: window.localStorage.getItem("userAccessToken") ? true : false,
            isLoggedIn: window.localStorage.getItem("userAccessToken") ? true : false
        };
    }

    handleisUserUpdate(state) {       
        event.preventDefault();                
        this.setState({ 
            isUser: state
        })
    }        

    render() {        
        if(this.state.isUser) {
            if (this.state.isLoggedIn) {
                return <Welcome email={window.localStorage.getItem("userName") || null} />
            }
            return (                           
                <Login handleisUserUpdate={this.handleisUserUpdate} />            
            )
        }
        return <Account handleisUserUpdate={this.handleisUserUpdate} />
    }
}

ReactDOM.render(<App />, document.querySelector("#harmonyApp"));