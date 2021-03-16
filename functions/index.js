const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51IR7VZCm33n4epwh2WoZzhavq8bqfndugWn1PKEYCDtryXA7LJjUg7LLt5m4mUkPShVM8kpzctGKo3x9NqLpgXig00EJboP0Fj");

const app = express();

app.use(cors({ origin: true} ));
app.use(express.json());

app.get('/', (request, response) => response.status(200).send("You've connected!"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
  
    console.log("Payment Request Recieved for this amount: ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });
  
  // - Listen command
  exports.api = functions.https.onRequest(app);

exports.api = functions.https.onRequest(app);