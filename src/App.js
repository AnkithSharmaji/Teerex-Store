import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Header from "./components/Header";

const UserContext = createContext();

const App = () => {
  const [Data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [toggleButton, setToggleButton] = useState(false);

  useEffect(() => {
    try {
      fetch(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((item) => {
          setTempData(item);
          setData(item);
        })
        .catch((error) => {
          window.alert("There was an error.", error.message);
        });

      if (window.location.pathname !== "/") {
        window.location.pathname = "/";
      }
    } catch (error) {
      console.error("Error occurred in App component:", error);
      // Handle the error here (e.g., display an error message)
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        Data,
        setData,
        cartData,
        setCartData,
        tempData,
        setTempData,
        toggleButton,
        setToggleButton,
      }}
    >
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <div className="content">
                  <Sidebar />
                  <ProductList />
                </div>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export { UserContext };
export default App;
