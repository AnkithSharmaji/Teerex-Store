import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Header.css";

const Header = () => {
  const { cartData } = useContext(UserContext) || { cartData: [] };
  const [sumOfQuantity, setSumOfQuantity] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const temp = cartData.reduce((acc, item) => acc + item.quantity, 0);
      setSumOfQuantity(temp);
    } catch (error) {
      console.error("Error occurred while calculating the sum of quantity:", error);
    }
  }, [cartData]);

  const navigateTo = (path) => {
    try {
      navigate(path);
    } catch (error) {
      console.error("Error occurred while navigating:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsHeaderVisible(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isHeaderVisible ? "" : "hidden"}`}>
      <div className="navbar-content">
        <h2 className="logo">TeeRex Store</h2>
        <div className="nav-items">
          <h3 className="nav-item" onClick={() => navigateTo("/")}>
            Products
          </h3>
          <div className="cart-icon" onClick={() => navigateTo("/cart")}>
            <AiOutlineShoppingCart />
            <span className={`cart-quantity ${sumOfQuantity === 0 ? "hidden" : ""}`}>
              {sumOfQuantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
