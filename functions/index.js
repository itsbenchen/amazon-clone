const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
("sk_test_51IR7VZCm33n4epwh2WoZzhavq8bqfndugWn1PKEYCDtryXA7LJjUg7LLt5m4mUkPShVM8kpzctGKo3x9NqLpgXig00EJboP0Fj");

// API

// - App Configurations
const app = express();

// - Middlewares
app.use(cors({origin : true}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("You've successfully connected!"));

    // Refer to url in Payment.js: /payments/create?total
app.post("/payments/create", async (request, response) =>{
    const total = request.query.total; // ?total part
    console.log("Payment Request Received for this amount >> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Subunits of the currency
        currency: "usd"
    });

    // OK - but created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});

// - Listen Command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-f7a06/us-central1/api