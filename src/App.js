import React, {useEffect} from "react";
import "./App.css";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"; // React Router

import Header from "./Header";  // Navigation bar
import Home from "./Home"; // Home
import Login from "./Login"; // Login 
import Checkout from "./Checkout";

import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // Runs once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);
    
    if (authUser) {
      // User is logged in
      dispatch({
        type: "SET_USER",
        user: authUser
      });
    }
    else {
      // User is logged out
      dispatch({
        type: "SET_USER",
        user: null
      });
    }
    
    });

  }, []);

  return (
    <div className="app"> 
      <Router>
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
