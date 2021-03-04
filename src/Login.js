import React, {useState} from "react";
import "./Login.css";
import {Link, useHistory} from "react-router-dom";
import {auth} from "./firebase";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = e => {
        e.preventDefault(); // Prevents page from reloading due to <form> tag
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {   // If success, returns a promise
                history.push("/")
            })
            .catch(error =>alert(error.message)); // Fails and throws an error
    };

    const register = e => {
        e.preventDefault(); // Prevents page from reloading due to <form> tag
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // if it successfully created a new user with email and password
                if (auth) {
                    history.push("/")
                }
            })
            .catch(error => alert(error.message));
    };

    return (
        <div className="login">
            <Link to="/">
                <img className="login_logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="Login logo"/>
            </Link> 
            
            <div className="login_container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button type="submit" className="login_signInButton" onClick={signIn}>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the Conditions of Use & Sale. Please see our privacy notice, our Cookies Notice, and our Interest-Based Ad Notice.
                </p>

                <button onClick={register} className="login_registerButton">Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
