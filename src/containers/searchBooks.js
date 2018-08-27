import React, { Component } from "react";
import BooksLoader from "../components/BooksLoader";
import * as BooksAPI from "../utils/BooksAPI";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import BooksHeader from "../components/BooksHeader";

class searchBooks extends Component {
  state = {
    books: [],
    isLoading: false,
    isResults: false
  };

  queryBooksHandler = query => {
    console.log(query);
    if (!query) {
      this.setState({
        books: [],
        isResults: false
      });
      return;
    }
    this.setState({ isLoading: true });
    BooksAPI.search(query).then(books => {
      this.setState({ isLoading: false });
      console.log(books);

      if (!books || books.error) {
        return;
      } else {
        this.setState({
          isResults: true
        });
      }

      this.setState({
        books: books
      });
    });
  };

  update = (book, newShelf) => {
    book["shelf"] = newShelf;
    this.setState(prevState => ({
      books: prevState.books.map(myBook => {
        if (myBook.id !== book.id) {
          return myBook;
        }
        return book;
      })
    }));
    BooksAPI.update(book, newShelf).then(data => {
      console.log(data);
    });
  };

  render() {
    const { isLoading, isResults } = this.state;

    const renderResults = isResults ? (
      <SearchResults books={this.state.books} update={this.update} />
    ) : (
      <h1>No Results</h1>
    );

    return (
      <div className="search-books">
        <BooksHeader title="bookcase" />
        <SearchBar queryBooks={this.queryBooksHandler} />
        {isLoading ? <BooksLoader isLoading={isLoading} /> : renderResults}
      </div>
    );
  }
}

export default searchBooks;
