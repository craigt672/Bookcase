import React from "react";
import { GridLoader } from "react-spinners";

const BooksLoader = ({ isLoading }) => (
  <div className="search-books-results loader">
    <GridLoader
      sizeUnit={"px"}
      size={25}
      color={"#dd9c19"}
      loading={isLoading}
    />
  </div>
);

export default BooksLoader;
