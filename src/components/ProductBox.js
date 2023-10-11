import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import "./ProductBox.css";

const ProductBox = (props) => {
  const { cartData, setCartData } = useContext(UserContext);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCartData([...cartData, { ...props.info, quantity: 1 }]);
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    try {
      setCartData(
        count > 0 && cartData.find((item) => item.id === props.info.id)
          ? cartData.map((item) =>
              item.id === props.info.id ? { ...item, quantity: count } : item
            )
          : cartData.filter((item) => item.id !== props.info.id)
      );
    } catch (error) {
      console.error("Error occurred in ProductBox component:", error);
      
    }
  }, [count]);

  useEffect(() => {
    try {
      const itemInCart = cartData.find((item) => item.id === props.info.id);
      if (itemInCart) {
        setCount(itemInCart.quantity);
      }
    } catch (error) {
      console.error("Error occurred in ProductBox component:", error);
      
    }
  }, [cartData]);

  const addProduct = (task) => {
    try {
      task === "add"
        ? count === props.info.quantity
          ? window.alert("Maximum quantity limit reached")
          : count < props.info.quantity && setCount((prevCount) => prevCount + 1)
        : count > 1
        ? setCount((prevCount) => prevCount - 1)
        : count === 1 && setCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error occurred in ProductBox component:", error);
      
    }
  };

  return (
    <div className="product-box">
      <img
        src={props.info.imageURL}
        className="product-image"
        alt={props.info.name}
      />
      <div className="product-details">
        <h1 className="product-price">Rs {props.info.price}</h1>
        {count > 0 ? (
          <div className="product-quantity">
            <span
              className="quantity-button"
              onClick={() => addProduct("remove")}
            >
              -
            </span>
            <span>{count}</span>
            <span
              className="quantity-button"
              onClick={() => addProduct("add")}
            >
              +
            </span>
          </div>
        ) : (
          <div onClick={handleClick} className="add-to-cart-button">
            Add to cart
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductBox;
