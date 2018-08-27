import React from "react";
import BookShelf from "./BookShelf";

const BookCase = ({ bookcase, updateBookShelf }) => {
  return (
    <div className="list-books-content">
      {bookcase.map(shelf => (
        <BookShelf
          key={shelf.shelfName}
          title={shelf.shelfName}
          books={shelf.books}
          update={updateBookShelf}
        />
      ))}
    </div>
  );
};

export default BookCase;
