import React, { Component } from "react";
import BooksLoader from "../components/BooksLoader";
import * as BooksAPI from "../utils/BooksAPI";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import BooksHeader from "../components/BooksHeader";

class searchBooks extends Component {
  state = {
    isLoading: false
  };

  componentWillUnmount() {
    this.props.updateSearchResults([]);
  }

  queryBooksHandler = query => {
    const { updateSearchResults } = this.props;

    if (!query) {
      updateSearchResults([]);
      this.setState({ isResults: false });
      return;
    }
    this.setState({ isLoading: true });

    BooksAPI.search(query).then(results => {
      this.setState({ isLoading: false });

      if (!results || results.error) {
        return;
      } else {
        this.setState({
          isResults: true
        });
      }
      updateSearchResults(results);
    });
  };

  update = (book, shelf) => {
    const { updateSearchResults, searchResults, updateBookShelf } = this.props;
    updateBookShelf(book, shelf);
    updateSearchResults(searchResults);
  };

  render() {
    const { isLoading } = this.state;

    const renderResults = (
      <SearchResults
        books={this.props.books}
        searchResults={this.props.searchResults}
        update={this.update}
      />
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
