import React from "react";
import { Link } from "react-router-dom";

const SearchButton = props => (
  <div className="open-search">
    <Link to="/search" className="open-search">
      {props.children}
    </Link>
  </div>
);

export default SearchButton;
