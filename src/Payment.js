import React, {useState, useEffect} from "react";
import "./Payment.css";
import {useStateValue} from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {Link, useHistory} from "react-router-dom";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "./reducer";
import axios from "./axios";
import {database} from "./firebase";

function Payment() {
    const [{cart, user}, dispatch] = useStateValue();
    const history = useHistory();

    // Hooks
    const stripe = useStripe();
    const elements = useElements();

    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [error, setError] = useState(null);
    
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        /* Generates a new stripe secret when the cart changes IMPORTANT if user decides to remove stuff from cart */

        // Generate special stripe secret that allows us to charge a customer
        const getClientSecret = async () => {
            // axios is a request (good api)
            const response = await axios({
              method: "post",
              // Stripe expects the total in a currencies subunits; 1000 -> would mean $10 so multiplying by 100 is necessary (2 decimal places)
              url: `/payments/create?total=${getCartTotal(cart) * 100}` // Backticks; not ' or "
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();

    }, [cart])

    console.log("THE SECRET IS >>> ", clientSecret);

    const handleSubmit = async (event) => {
        // Do stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card: elements.getElement(CardElement)
                }
            }).then(({ paymentIntent }) => {
                // paymentIntent = payment confirmation & order ID

                database
                    .collection("users")
                    .doc(user?.uid)
                    .collection("orders")
                    .doc(paymentIntent.id)
                    .set({
                        cart: cart,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created // Timestamp for when order was made
                    })

                setSucceeded(true);
                setError(null);
                setProcessing(false);
                
                dispatch({
                    type: "EMPTY_CART"
                })

                history.replace("/orders"); // Swap with the /payment page (we don't want user to go back to payment page)
            })

    }

    const handleChange = (event) => {
        // Listen for changes in CardElements and display errors as the customer types their card details
        setDisabled(event.empty); // If empty, disable the button
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment_container">

                <h1>
                    Checkout (<Link to="/checkout">{cart?.length} items</Link>)
                </h1>

                {/* Payment - delivery address */}
                <div className="payment_section">
                    
                    <div className="payment_title">
                        <h3>Delivery Address</h3> 
                    </div>

                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 Test Avenue</p> 
                        <p>Los Angeles, CA</p>
                    </div>

                </div>
                {/* Payment - Review items */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3> 
                    </div>
                    <div className="payment_items">
                        {cart.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* Payment - Payment method */}
                <div className="payment_section">

                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="payment_details">
                        {/* Stripe stuff */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getCartTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span> { processing ? <p>Processing</p> : "Buy Now" } </span>
                                </button>
                            </div>
                            
                            {/* Errors if any */}
                            {error && <div>{error}</div>}

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Payment
