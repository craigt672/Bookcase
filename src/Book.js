import React, { Component } from "react";
import BookShelfChanger from "./BookShelfChanger";

class Book extends Component {
  state = {
    shelf: this.props.shelf
  };

  changeShelfHandler = e => {
    this.setState({
      shelf: e.target.value
    });
  };

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${this.props.coverUrl})`
              }}
            />
            <BookShelfChanger
              updateShelf={this.changeShelfHandler}
              currentShelf={this.state.shelf}
            />
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors.join(", ")}</div>
        </div>
      </li>
    );
  }
}

export default Book;
