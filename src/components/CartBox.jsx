import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import "./CartBox.css";

const CartBox = (props) => {
  const { cartData, setCartData, Data } = useContext(UserContext);
  const [optionValue, setOptionValue] = useState();

  const onDeleteClicked = () => {
    try {
      const tempCartData = cartData.filter((item) => item.id !== props.info.id);
      setCartData(tempCartData);
    } catch (error) {
      console.error("Error occurred while deleting item:", error);
      
    }
  };

  const optionSelected = (event) => {
    try {
      const selectedQuantity = parseInt(event.target.value);
      const updatedCartData = cartData.map((item) => {
        if (item.id === props.info.id) {
          item.quantity = selectedQuantity;
        }
        return item;
      });
      setCartData(updatedCartData);
    } catch (error) {
      console.error("Error occurred while updating quantity:", error);
      
    }
  };

  useEffect(() => {
    try {
      const itemOfOption = Data.find((item) => item.id === props.info.id);
      setOptionValue(itemOfOption.quantity);
    } catch (error) {
      console.error("Error occurred in CartBox component:", error);
      
    }
  }, []);

  const cartItem = props.info;

  return (
    <div className="cart-box">
      <img
        src={cartItem.imageURL}
        className="cart-box-image"
        alt={cartItem.name}
      />
      <div className="cart-box-info">
        <span className="cart-box-name">{cartItem.name}</span>
        <span className="cart-box-price">Rs {cartItem.price}</span>
      </div>
      <select
        className="cart-box-select"
        value={cartItem.quantity}
        onChange={(event) => optionSelected(event)}
      >
        {Array(optionValue)
          .fill()
          .map((_, index) => (
            <option className="cart-box-option" value={index + 1} key={index}>
              Qty: {index + 1}
            </option>
          ))}
      </select>
      <button
        className="cart-box-delete-button"
        onClick={() => onDeleteClicked()}
      >
        Delete
      </button>
    </div>
  );
};

export default CartBox;
