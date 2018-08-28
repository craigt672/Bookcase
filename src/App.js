import React from "react";
import * as BooksApi from "./utils/BooksAPI";
import { Route } from "react-router-dom";
import SearchBooks from "./containers/searchBooks";
import MyBooks from "./containers/myBooks";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    bookcase: [],
    searchResults: []
  };

  updateMyBooks = newBooks => {
    this.setState({ myBooks: newBooks });
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
    BooksApi.update(book, newShelf);
  };

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

  updateSearchResults = results => {
    this.setState({
      searchResults: results.map(bookResult => {
        let book = bookResult;
        this.state.myBooks.forEach(myBook => {
          if (myBook.id === bookResult.id) {
            book = myBook;
          }
        });
        return book;
      })
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MyBooks
              title="MyReads"
              updateBookShelf={this.updateBookShelfHandler}
              books={this.state.myBooks}
              bookcase={this.state.bookcase}
              updateMyBookCase={this.setBookcase}
              updateMyBooks={this.updateMyBooks}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBooks
              updateBookShelf={this.updateBookShelfHandler}
              books={this.state.myBooks}
              searchResults={this.state.searchResults}
              updateSearchResults={this.updateSearchResults}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
