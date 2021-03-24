import React, {useEffect} from "react";
import "./App.css";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"; // React Router

import Header from "./Header";  // Navigation bar
import Home from "./Home"; // Home
import Login from "./Login"; // Login 
import Checkout from "./Checkout";
import Payment from "./Payment";
import Orders from "./Orders";
import Register from "./Register";

import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

// Public API key from Stripe 
const promise = loadStripe("pk_test_51IR7VZCm33n4epwhXAT3YGWBXkVOtXkMX1ZyFzVYBYxsi8F0SQ7F6RZCRk1YlCifiL8wUvkeg6DveeJZPgougbcE00Fu8zLDAp");

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    // Runs once when the app component loads
    auth.onAuthStateChanged((authUser) => {
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

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            {/* Wraps the Payment element using Stripe's Elements*/}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
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
