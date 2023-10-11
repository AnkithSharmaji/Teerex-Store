import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import CartBox from "./CartBox";
import "./Cart.css";

const Cart = () => {
  const [sum, setSum] = useState();
  const { cartData } = useContext(UserContext);

  useEffect(() => {
    try {
      const temp = cartData.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      setSum(temp);
    } catch (error) {
      console.error("Error occurred in Cart component:", error);
      // Handle the error here (e.g., display an error message)
    }
  }, [cartData]);

  return (
    <div className="cart-container">
      <div className="cart-title">Shopping cart</div>
      {cartData.length === 0 ? (
        <p className="cart-message">No item found</p>
      ) : (
        <div className="cart-items">
          {cartData.map((item, i) => {
            return <CartBox info={item} key={i} />;
          })}
        </div>
      )}
      <div className={`cart-total ${cartData.length === 0 ? "hidden" : ""}`}>
        <span className="total-label">Total amount&nbsp;&nbsp;</span>
        Rs.{sum}
      </div>
    </div>
  );
};

export default Cart;
