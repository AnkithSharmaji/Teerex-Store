import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import {AiFillCloseCircle} from "react-icons/ai";
import "./Sidebar.css";

const Sidebar = () => {
  const { setData, tempData, toggleButton, setToggleButton } =
    useContext(UserContext);

  const filterData = {
    Color: [
      "Red",
      "Blue",
      "Green",
      "Black",
      "Pink",
      "Grey",
      "White",
      "Purple",
      "Yellow",
    ],
    Gender: ["Men", "Women"],
    Price: ["0-Rs250", "Rs251-450", "Rs 451"],
    Type: ["Polo", "Hoodie", "Basic"],
  };

  const [selectedFilter, setSelectedFilter] = useState({
    Color: "",
    Gender: "",
    Price: "",
    Type: "",
  });

  useEffect(() => {
    let selectedItems = [...tempData];
    for (var key in selectedFilter) {
      if (selectedFilter[key] !== "") {
        switch (key) {
          case "Price":
            switch (selectedFilter[key]) {
              case "0-Rs250":
                selectedItems = selectedItems.filter(
                  (item) => item.price <= 250
                );
                break;
              case "Rs251-450":
                selectedItems = selectedItems.filter(
                  (item) => item.price >= 251 && item.price <= 450
                );
                break;
              case "Rs 451":
                selectedItems = selectedItems.filter(
                  (item) => item.price > 451
                );
                break;
              default:
                break;
            }
            break;
          default:
            selectedItems = selectedItems.filter(
              (item) => item[key.toLowerCase()] === selectedFilter[key]
            );
            break;
        }
      }
    }
    setData(selectedItems);
  }, [selectedFilter]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSelectedFilter((prevState) => {
      return { ...prevState, [name]: checked ? value : "" };
    });
  };

  return (
    <>
      {toggleButton && (
        <div className="sidebar-container">
          <div
            onClick={() => setToggleButton(false)}
            className="close-icon"
          >
            <AiFillCloseCircle className="cursor-pointer" />
          </div>
          <div className="filter-options">
            {Object.entries(filterData).map((data, i) => {
              return (
                <div className="filter-group" key={i}>
                  <h1 className="filter-label">{data[0]}</h1>
                  {data[1].map((option, index) => {
                    return (
                      <div className="filter-option" key={index}>
                        <input
                          type="checkbox"
                          name={data[0]}
                          value={option}
                          checked={selectedFilter[data[0]] === option}
                          onChange={handleChange}
                        />
                        <label className="filter-text">{option}</label>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="sidebar-container-desktop">
        {Object.entries(filterData).map((data, i) => {
          return (
            <div className="filter-group" key={i}>
              <h1 className="filter-label">{data[0]}</h1>
              {data[1].map((option, index) => {
                return (
                  <div className="filter-option" key={index}>
                    <input
                      type="checkbox"
                      name={data[0]}
                      value={option}
                      checked={selectedFilter[data[0]] === option}
                      onChange={handleChange}
                    />
                    <label className="filter-text">{option}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
