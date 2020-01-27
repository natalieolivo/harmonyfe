import React from 'react';
import Account from "./components/account/account";
import Login from "./components/login/login";
import Welcome from "./components/welcome/welcome";

class App extends React.Component {
  constructor(props) {
      super(props);

      this.handleisUserUpdate = this.handleisUserUpdate.bind(this);
      this.handleisUserLoggedIn = this.handleisUserLoggedIn.bind(this);

      this.state = {            
          isUser: window.localStorage.getItem("userAccessToken") ? true : false,
          isLoggedIn: window.localStorage.getItem("userAccessToken") ? true : false
      };
  }

  handleisUserUpdate(state) {    
      this.setState({ 
          isUser: state
      })
  }    

  handleisUserLoggedIn(state) {
      this.setState({
          isLoggedIn: state
      });
  }

  render() {        
      if(this.state.isUser) {
          if (this.state.isLoggedIn) {
              return <Welcome email={window.localStorage.getItem("userName") || null} handleisUserLoggedIn={this.handleisUserLoggedIn} />
          }
          return (                           
              <Login handleisUserUpdate={this.handleisUserUpdate} />            
          )
      }
      return <Account handleisUserUpdate={this.handleisUserUpdate} />
  }
}

export default App;
