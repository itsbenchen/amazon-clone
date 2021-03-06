import React, {useState} from "react";
import "./Register.css";
import { auth } from "./firebase";
import {Link, useHistory} from "react-router-dom";

function Register() {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = e => {
        e.preventDefault(); // Prevents page from reloading due to <form> tag
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                // if it successfully created a new user with email and password
                // Could add a name field to the user
                if (auth) { // If authenticated...
                    alert("You've successfully made your account.");
                    history.push("/");
                }
            })
            .catch(error => alert(error.message));
    };

    return (
        <div class="register">
            <Link to="/">
                <img className="register_logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="Login logo"/>
            </Link> 

            <div className="register_container">
                <h3>Create account</h3>
                <form>

                    {/* Get name field */}
                    {/* <h5>Your name</h5>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}

                    <h5>E-mail</h5>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    {/* Could also add a Confirm Password */}
                </form>

                <button onClick={register} className="register_button">Create your Amazon Account</button>

                <p>By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</p>

            </div>

        </div>
    )
}

export default Register
