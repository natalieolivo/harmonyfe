import "./core.scss";
import Login from "./login/login";

const App = () => {    
    const Auth = Login();
    console.log("Auth", Auth.localStorage.getItem('token'));
}

App();