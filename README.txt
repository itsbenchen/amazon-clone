This is an Amazon clone that's made with ReactJS with the use of Stripe, Axios, and Moment libraries. NodeJS and Google Firebase is used to help with the backend and deployment testing. 

Stripe was used for building payment flows
Axios to help with the HTTP requests
Moment library to format dates
NodeJS for the backend server
Firebase for the real-time database usage

npm installs (/amazon-clone):
    npm i @stripe/stripe-js
    npm i @stripe/react-stripe-js
    npm i axios
    npm install moment

npm installs (/amazon-clone/functions):
    npm install stripe

The app also has core features that allows sites like Amazon to have a full E-Commerce functionality.

The src folder contains all the front-end, and the functions folder contains the backend things.

Here are the functionalities that were implemented:
1) Accounts with login
2) Ability to see products with image, name, price, and rating in front page
3) Cart and Checkout features
4) Payment feature (Used the stripe and axios API to implement; use 42 repeatedly for Card info)
5) Order history page