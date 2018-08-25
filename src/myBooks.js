import React, { Component } from "react";
import * as BooksApi from "./BooksAPI";
import BookShelf from "./BookShelf";

class myBooks extends Component {
  state = {
    bookcase: [],
    myBooks: []
  };

  componentDidMount() {
    BooksApi.getAll().then(books => {
      this.setState({ myBooks: books });
      this.setBookcase(this.state.myBooks);
    });
  }

  setBookcase = books => {
    this.setState({
      bookcase: [
        {
          shelfName: "Currently Reading",
          books: books.filter(book => book.shelf === "currentlyReading")
        },
        {
          shelfName: "Want to Read",
          books: books.filter(book => book.shelf === "wantToRead")
        },
        {
          shelfName: "Read",
          books: books.filter(book => book.shelf === "read")
        }
      ]
    });
  };

  updateBookShelfHandler = (book, newShelf) => {
    const newBookObj = book;
    newBookObj["shelf"] = newShelf;
    this.setState(prevState => ({
      myBooks: prevState.myBooks.map(bookObj => {
        if (bookObj.id !== book.id) {
          return bookObj;
        }
        return newBookObj;
      })
    }));
    this.setBookcase(this.state.myBooks);
  };

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
              update={this.updateBookShelfHandler}
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
