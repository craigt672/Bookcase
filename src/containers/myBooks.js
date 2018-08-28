import React, { Component } from "react";
import BooksHeader from "../components/BooksHeader";
import * as BooksApi from "../utils/BooksAPI";
import BooksLoader from "../components/BooksLoader";
import BookCase from "../components/BookCase";
import SearchButton from "../components/SearchButton";

class myBooks extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    BooksApi.getAll().then(books => {
      this.setState({ isLoading: false });
      this.props.updateMyBooks(books);
      this.props.updateMyBookCase(books);
    });
  }

  update = (book, shelf) => {
    const { updateMyBookCase, books, updateBookShelf } = this.props;
    updateBookShelf(book, shelf);
    updateMyBookCase(books);
  };

  render() {
    const { isLoading } = this.state;

    const renderBookcase = (
      <BookCase bookcase={this.props.bookcase} updateBookShelf={this.update} />
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
