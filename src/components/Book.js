import React from "react";
import BookShelfChanger from "./BookShelfChanger";

const Book = props => {
  const changeShelfHandler = e => {
    const newShelf = e.target.value;
    props.updateShelf(props.bookRef, newShelf);
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${props.coverUrl})`
            }}
          />
          <BookShelfChanger
            updateShelf={changeShelfHandler}
            currentShelf={props.shelf}
          />
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.authors.join(", ")}</div>
      </div>
    </li>
  );
};

export default Book;
