import React, { Component } from "react";
import Book from "./Book";

import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    searchedBooks: [],
  };

  render() {
    const updateSearchTerm = (evt) => {
      if (evt.target.value.length > 0) {
        BooksAPI.search(evt.target.value).then((books) => {
          this.setState({ searchedBooks: books });
        });
      } else {
        this.setState({ searchedBooks: [] });
      }
    };

    const addShelf = (book) => {
      book["shelf"] = "none";
      return book;
    };
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={updateSearchTerm}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.length > 0 ? (
              this.state.searchedBooks.map((book) => (
                <li key={book.id}>
                  <Book
                    book={addShelf(book)}
                    changeShelf={this.props.changeShelf}
                  />
                </li>
              ))
            ) : (
              <h2>No Books Found!</h2>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
