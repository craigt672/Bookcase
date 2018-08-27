import React, { Component } from "react";
import BooksHeader from "../components/BooksHeader";
import { GridLoader } from "react-spinners";
import * as BooksApi from "../utils/BooksAPI";
import BooksLoader from "../components/BooksLoader";
import BookCase from "../components/BookCase";
import SearchButton from "../components/SearchButton";

class myBooks extends Component {
  state = {
    books: [],
    bookcase: [],
    isLoading: true
  };

  componentDidMount() {
    BooksApi.getAll().then(books => {
      this.setState({ books });
      this.setBookcase(this.state.books);
      this.setState({ isLoading: false });
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
      books: prevState.books.map(myBook => {
        if (myBook.id !== book.id) {
          return myBook;
        }
        return book;
      })
    }));
    this.setBookcase(this.state.books);
    BooksApi.update(book, newShelf);
  };

  render() {
    const { bookcase, isLoading } = this.state;
    const renderBookcase = (
      <BookCase
        bookcase={bookcase}
        updateBookShelf={this.updateBookShelfHandler}
      />
    );
    return (
      <div className="list-books">
        <BooksHeader title="bookcase" />
        {isLoading ? <BooksLoader isLoading={isLoading} /> : renderBookcase}
        <SearchButton>Add a book</SearchButton>
      </div>
    );
  }
}

export default myBooks;
