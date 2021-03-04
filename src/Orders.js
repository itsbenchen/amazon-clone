import React, {useState, useEffect} from "react";
import {database} from "./firebase";
import "./Orders.css";
import Order from "./Order";
import {useStateValue} from "./StateProvider";

function Orders() {
    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect( () => {
        if (user) {
            database
            .collection("users")
            .doc(user?.uid)
            .collection("orders")
            .orderBy("created", "desc")
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
        else {
            setOrders([])
        }
    }, [user])


    return (
        <div className="orders">
            <h1>Your Orders</h1>

            {/* Get orders from database */}
            <div className="orders_order">
                {orders?.map(order=> (
                    <Order order={order} />
                ))}
            </div>

        </div>
    );
}

export default Orders