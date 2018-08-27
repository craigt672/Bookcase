import React from "react";

const BookShelfChanger = ({ updateShelf, currentShelf }) => (
  <div className="book-shelf-changer">
    <select onChange={updateShelf} value={currentShelf ? currentShelf : "none"}>
      <option value="move" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
);

export default BookShelfChanger;
