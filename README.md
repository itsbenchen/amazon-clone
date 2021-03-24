# Amazon Clone

This is an Amazon clone that's made with ReactJS with the use of React-Bootstrap, Stripe, Axios, Moment, and Express libraries. Google Firebase is used to help with the backend and deployment testing. 

Here is a previous version of the deployed site: https://clone-f7a06.firebaseapp.com/

To install all dependencies: use "npm install"

npm installs (/amazon-clone):
 - npm i react-router-dom
 - npm i @stripe/stripe-js
 - npm i @stripe/react-stripe-js
 - npm i axios
 - npm i moment
 - npm i react-bootstrap

npm installs (/amazon-clone/functions):
 - npm i stripe
 - npm i express
 - nmp i cors

The app also has core features that allows sites like Amazon to have a full E-Commerce functionality.

The src folder contains all the front-end, and the functions folder contains the backend things.

Here are the functionalities that were implemented:
1) Accounts with login
2) Ability to see products with image, name, price, and rating in front page
3) Cart and Checkout features
4) Payment feature (Used the stripe and axios API to implement; use 42 repeatedly for Card info)
5) Order history page

Updates:
- (3/4/2021) Changed certain links that should only be accessed if you're login (redirects users to login)
- (3/5/2021) Added bottom half of Amazon's header
- (3/5/2021) Added a seperate register page

Things that could be added:
- Toast notifications when an item is added to Cart
- Group items with same product id and have a quantity counter instead
- Add Search functionality
- Add drop-down menus for certain options in the header
