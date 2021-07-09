import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Components/Shelf";
import Search from "./Components/Search";
import SearchButton from "./Components/SearchButton";
import Header from "./Components/Header";
import { Route } from 'react-router-dom'


class BooksApp extends Component {

  
  state = {
    booksByShelf: {},
    shelves: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  };

  updateSearchPageState = (state) => {
    // instead of updating state, use navigation to nav to search page and update url displayed
    this.setState({ showSearchPage: state });
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    BooksAPI.getAll().then((resp) => {
      const shelves = Array.from(new Set(resp.map((x) => x.shelf)));
      const booksByShelf = {};
      shelves.forEach((shelf) => {
        booksByShelf[shelf] = resp.filter((book) => book.shelf === shelf);
      });
      this.setState({
        book: resp,
        shelves: shelves,
        booksByShelf: booksByShelf,
      });
    });
  }
  getShelfText = (shelf) => {
    let shelfName = "";

    switch (shelf) {
      case "currentlyReading":
        shelfName = "Currently Reading";
        break;
      case "wantToRead":
        shelfName = "Want to Read";
        break;
      case "read":
        shelfName = "Read";
        break;
      default:
        break;
    }

    return shelfName;
  };

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.fetchBooks());
  };

  render() {
    return (
      <div className="app">
       
         
          <Route path='/search'><Search
          showSearchPage={this.updateSearchPageState}
          changeShelf={this.changeBookShelf}
        /></Route>
        
          <Route path='/' exact>
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              {this.state.shelves.map((shelf) => (
                <Shelf
                  key={shelf}
                  title={this.getShelfText(shelf)}
                  books={this.state.booksByShelf[shelf]}
                  changeShelf={this.changeBookShelf}
                />
              ))}
            </div>
           

            <SearchButton  />
          </div>
          </Route>
        
      </div>
    );
  }
}

export default BooksApp;
