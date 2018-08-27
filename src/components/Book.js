import React from "react";
import BookShelfChanger from "./BookShelfChanger";

const Book = ({ coverUrl, shelf, title, authors, bookRef, updateShelf }) => {
  const changeShelfHandler = e => {
    const newShelf = e.target.value;
    updateShelf(bookRef, newShelf);
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${coverUrl})`
          }}
        />
        <BookShelfChanger
          updateShelf={changeShelfHandler}
          currentShelf={shelf}
        />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors ? authors.join(", ") : ""}</div>
    </div>
  );
};

export default Book;
