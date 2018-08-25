import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "../utils/BooksAPI";
import BookShelf from "../components/BookShelf";

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
    book["shelf"] = newShelf;
    this.setState(prevState => ({
      myBooks: prevState.myBooks.map(myBook => {
        if (myBook.id !== book.id) {
          return myBook;
        }
        return book;
      })
    }));
    this.setBookcase(this.state.myBooks);
    BooksApi.update(book, newShelf);
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
          {/* <a onClick={this.props.showSearchPage}>Add a book</a> */}
          <Link to="/search" className="open-search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default myBooks;
