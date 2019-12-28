import React, { useState } from "react";
import "./../styles/form.css";
import axios from "axios";

export default function CreateTshirt() {
  const [tshirt, setTshirt] = useState({});
  const handleChange = e => {
    console.log(e.target.checked);
    const copy = { ...tshirt };
    e.target.type === "checkbox"
      ? (copy[e.target.name] = e.target.checked)
      : (copy[e.target.name] = e.target.value);
    setTshirt(copy);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (tshirt.name && tshirt.brand) {
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/create", tshirt)
        .then(dbRes => console.log("sent"))
        .catch(dbErr => console.log("il y a une erreur"));
    }
  };

  return (
    <div className="main-content">
      <h1>Sell your T-shirt !</h1>
      <form className="create" onChange={handleChange} onSubmit={handleSubmit}>
        <input className="form-input" name="name" type="text" placeholder="Title" />
        <input className="form-input" name="brand" type="text" placeholder="Brand" />
        <select className="form-input" name="color" id="color-select">
          <option value="">--Main color--</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="pink">Pink</option>
          <option value="red">Red</option>
          <option value="grey">Grey</option>
        </select>
        <input className="form-input" name="price" type="number" placeholder="Price"/>
        <input className="form-input"
          type="text"
          id="image"
          name="image"
          placeholder= "Copy the link of your tshirt here"
        />
        <div>
        <img className="tshirt-image" src={tshirt.image ? tshirt.image:"./img/noimage.gif"} alt="img"/>
        </div>
        <select className="form-input" name="size" id="size-select">
          <option value="">--Size-</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <div className="checkbox-wrapper form-input">
          <input name="embroidery" type="checkbox" />
          <label htmlFor="embroidery">Embroidered</label>
        </div>
        <div className="checkbox-wrapper form-input">
          <input name="madeIn" type="checkbox" />
          <label htmlFor="MadeIn">Made in France</label>
        </div>

        <button>Save</button>
      </form>
      {/* {JSON.stringify(tshirt)} */}
    </div>
  );
}
