import React from "react";

export default function Tshirt({ details }) {
  return (
    <div className="tshirt">
      <div className="title">
        <h3>{details.name}</h3>
        <h5>{details.brand}</h5>
      </div>

      <img src={details.image} alt="img" />
      <p>{details.price} €</p>
    </div>
  );
}
