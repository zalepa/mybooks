import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom'
import Book from './Book';

class Search extends Component {
  state = {
    results: [],
    query: ''
  }

  // BUG: adding a search results clears the screen.
  searchAPI = (e, query) => {
    BooksAPI.search(e.target.value).then(results => {
      if (results.error) {
        // TODO: handle no search results
      } else {
        results = results.map(book => (book.shelf = 'none') && book)
        this.setState({ results });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => {
                e.preventDefault()
                this.searchAPI(e);
              }}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results && this.state.results.map(book => (
              <li key={book.id}>
                <Book book={book} onShelfChange={this.props.onShelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
