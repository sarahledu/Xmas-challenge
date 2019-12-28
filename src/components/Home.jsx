import React, { useState, useEffect } from "react";
import axios from "axios";
import Tshirt from "./Tshirt";
import "./../styles/home.css";

export default function Home() {
  const [tshirts, setTshirts] = useState([]);
  const [brandTags, setBrandTags] = useState([]);
  const [colorTags, setColorTags] = useState([]);
  const [priceFilter, setPriceFilter] = useState(200);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleChange = e => {
    console.log(e.target.type);
    const copyBrands = [...selectedBrands];
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        copyBrands.push(e.target.name);
      } else copyBrands.splice(copyBrands.indexOf(e.target.name), 1);
    } else if (e.target.type === "range") {
      setPriceFilter(e.target.value);
    }
    setSelectedBrands(copyBrands);
  };

  const brandFilter = () =>
    selectedBrands.length > 0 ? "displayFiltered" : "displayAll";

  const colorFilter = () =>
    selectedColors.length > 0 ? "displayFiltered" : "displayAll";

  const handleClick = e => {
    const copyColors = [...selectedColors];
    if (e.target.className.includes("selected")) {
      e.target.classList.remove("selected");
      copyColors.splice(copyColors.indexOf(e.target.id), 1);
    } else {
      e.target.classList.add("selected");
      copyColors.push(e.target.id);
    }
    setSelectedColors(copyColors);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/all-tshirts")
      .then(dbRes => {
        setTshirts(dbRes.data);
        const copyBrands = [...brandTags];
        const copyColors = [...colorTags];
        dbRes.data.map((tshirt, i) => {
          !copyBrands.includes(tshirt.brand) && copyBrands.push(tshirt.brand);
          !copyColors.includes(tshirt.color) && copyColors.push(tshirt.color);
        });
        setBrandTags(copyBrands);
        setColorTags(copyColors);
      })
      .catch(dbErr => console.log(dbErr));
  }, []);

  return (
    <div className="main-wrapper">
      <div className="tagBar">
        <div className="range tags">
          <h4>Price</h4>
          <input
            className="slider"
            type="range"
            min="0"
            max="200"
            onChange={handleChange}
            defaultValue="200"
          />
          <div className="range-values">
            <p className="range-value">0</p>
            <p className="range-value">
              {priceFilter === 200 ? "-" : priceFilter + " €"}
            </p>
            <p className="range-value">200€ +</p>
          </div>
        </div>
        <div className="brands tags">
          <h4>Brands</h4>
          {brandTags.map((brand, i) => (
            <div key={i} className="tag-wrapper">
              <input type="checkbox" onClick={handleChange} name={brand} />
              <label htmlFor="">{brand}</label>
            </div>
          ))}
        </div>
        <div className="colors tags">
          <h4>Colors</h4>
          <div className="colors-container"> 
          {colorTags.map((color, i) => (
            <div
              onClick={handleClick}
              key={i}
              className="color-box"
              id={color}
              style={{ backgroundColor: color }}
            ></div>
          ))}
          </div>
          
        </div>
      </div>
      <div className="tshirts-display">
        {tshirts.map((tshirt, i) =>
          brandFilter() === "displayAll"
            ? colorFilter() === "displayAll"
              ? Number(tshirt.price) <= Number(priceFilter) && (
                  <Tshirt key={i} details={tshirt}></Tshirt>
                )
              : selectedColors.map(
                  (color, i) =>
                    color === tshirt.color &&
                    Number(tshirt.price) <= Number(priceFilter) && (
                      <Tshirt key={i} details={tshirt}></Tshirt>
                    )
                )
            : selectedBrands.map((brand, i) =>
                colorFilter() === "displayAll"
                  ? brand === tshirt.brand &&
                    Number(tshirt.price) <= Number(priceFilter) && (
                      <Tshirt key={i} details={tshirt}></Tshirt>
                    )
                  : selectedColors.map(
                      (color, i) =>
                        color === tshirt.color &&
                        brand === tshirt.brand &&
                        Number(tshirt.price) <= Number(priceFilter) && (
                          <Tshirt key={i} details={tshirt}></Tshirt>
                        )
                    )
              )
        )}
      </div>
    
    </div>
  );
}
