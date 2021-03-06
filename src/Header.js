import React from "react";
import "./Header.css";

import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {Link} from "react-router-dom";
import {useStateValue} from "./StateProvider";
import {auth} from "./firebase";

function Header() {
    const [{cart, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            alert("You've successfully logged out.")
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <div className="header_top">
            
            <Link to="/">
                <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon logo" />
            </Link>
            
            
            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon" />
            </div>

            <div className="header_nav">
                <Link to={!user && "/login"}>
                    <div className="header_option" onClick={handleAuthentication}>
                        <span className="header_optionLineOne">Hello, {user ? user.email : "Guest"}</span>
                        <span className="header_optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
                    </div>
                </Link>
                
                <Link to={user ? "/orders" : "/login"}>
                    <div className="header_option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div>
                </Link>

                {/* TODO: Add a my account page to view prime? */}
                <Link to={user ? "/" : "/login"}> 
                    <div className="header_option">
                        <span className="header_optionLineOne">Your</span>
                        <span className="header_optionLineTwo">Prime</span>
                    </div>
                </Link>

                <Link to={user ? "/checkout" : "/login"} >
                    <div className="header_optionCart">
                        <ShoppingCartIcon />
                        <span className="header_optionLineTwo header_cartCount">{cart?.length}</span>
                    </div>
                </Link>

            </div>

        </div>
            <div className="header_bottom">
                {/* Could each of these functionalities in the future */}
                <button className="header_optionMenu">
                    <MenuIcon />
                    <span>All</span>
                </button>
                <button className="header_option">Best Sellers</button>
                <button className="header_option">Today's Deals</button>
                <button className="header_option">Prime</button>
                <button className="header_option">Customer Service</button>
                <button className="header_option">New Releases</button>
                <button className="header_option">Books</button>
                <button className="header_option">Fashion</button>
                <button className="header_option">Kindle Books</button>
                <button className="header_option">Gift Cards</button>
                <button className="header_option">Find a Gift</button>
                <button className="header_option">Toys & Games</button>
                <button className="header_option">Amazon Home</button>
                <button className="header_option">Pharmacy</button>
                <button className="header_option">Computers</button>
                <button className="header_option">Sell</button>
                <button className="header_option">Video Games</button>
                <button className="header_option">Coupons</button>
            </div>
        </div>
        
    );
}

export default Header
