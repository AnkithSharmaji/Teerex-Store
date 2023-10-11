import React, { useContext, useState } from "react";
import ProductBox from "./ProductBox";
import { AiOutlineSearch } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import { UserContext } from "../App";
import "./ProductList.css";

const ProductList = () => {
  const { Data, tempData, setData, setToggleButton } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    const searchData = tempData.filter((item) => {
      return (
        (item.name || "").toLowerCase().includes(inputValue.toLowerCase()) ||
        (item.color || "").toLowerCase().includes(inputValue.toLowerCase()) ||
        (item.type || "").toLowerCase().includes(inputValue.toLowerCase()) ||
        (item.gender || "").toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    setData(searchData);
  };

  try {
    return (
      <div className="product-container">
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Search for products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="search-button" onClick={() => handleSearch({ target: { value: searchInput } })}>
            <AiOutlineSearch className="search-icon" />
          </button>
          <button className="filter-button" onClick={() => setToggleButton(true)}>
            <FiFilter className="filter-icon" />
          </button>
        </div>
        <div className="product-list">
          {Data &&
            Data.map((product, i) => {
              return <ProductBox info={product} key={i} />;
            })}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error occurred in ProductList component:", error);
    
    return null; 
  }
};

export default ProductList;
