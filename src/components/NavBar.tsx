import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

function NavBar() {
  return (
    <div className="header">
      <Link className="homeBtn"to="/HomeLower">Home</Link>
    </div>
  );
}
export default NavBar;
