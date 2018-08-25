import React from "react";
import Book from "./Book";

const BookShelf = ({ title, books, update }) => (
  <div>
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book
              key={book.id}
              coverUrl={book.imageLinks.thumbnail}
              title={book.title}
              authors={book.authors}
              shelf={book.shelf}
              updateShelf={update}
              bookRef={book}
            />
          ))}
        </ol>
      </div>
    </div>
  </div>
);

export default BookShelf;
