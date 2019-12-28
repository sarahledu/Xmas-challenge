import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./../styles/navbar.css";

export default function NavMainLink() {
  return (
    <div>
      <div className="navBar">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/create">
          Add a T-shirt
        </NavLink>
        <NavLink exact to="/manage">
          Manage T-shirts
        </NavLink>
      
      </div>
      <hr />
    </div>
  );
}
