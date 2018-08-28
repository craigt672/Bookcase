import React from "react";
import Book from "./Book";

const SearchResults = ({ searchResults, update }) => (
  <div className="search-books-results">
    <ol className="books-grid">
      {searchResults.map(book => (
        <Book
          key={book.id}
          coverUrl={book.imageLinks ? book.imageLinks.thumbnail : ""}
          title={book.title}
          authors={book.authors}
          shelf={book.shelf}
          updateShelf={update}
          bookRef={book}
        />
      ))}
    </ol>
  </div>
);

export default SearchResults;
