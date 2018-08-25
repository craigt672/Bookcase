import React, { Component } from "react";
import * as BooksApi from "./BooksAPI";
import BookShelf from "./BookShelf";

class myBooks extends Component {
  state = {
    bookcase: []
  };

  componentDidMount() {
    BooksApi.getAll().then(books => {
      console.log(books.filter(book => book.shelf === "currentlyReading"));
      this.setState({
        bookcase: [
          {
            shelfName: "Currently Reading",
            books: books.filter(book => book.shelf === "wantToRead")
          },
          {
            shelfName: "Want to Read",
            books: books.filter(book => book.shelf === "currentlyReading")
          },
          {
            shelfName: "Read",
            books: books.filter(book => book.shelf === "read")
          }
        ]
      });
    });
  }
  render() {
    const { bookcase } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="list-books-content">
          {bookcase.map(shelf => (
            <BookShelf
              key={shelf.shelfName}
              title={shelf.shelfName}
              books={shelf.books}
            />
          ))}
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </a>
        </div>
      </div>
    );
  }
}

export default myBooks;
