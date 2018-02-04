import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book';

class Search extends Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={e => {
                this.props.onQueryChange(e.target.value)
              }}/>
          </div>
        </div>
        <div className="search-books-results">
          {this.props.searchResults.length > 0 &&
            <ol className="books-grid">
              {this.props.searchResults.map(book => (
                <li key={book.id}>
                  <Book book={book} onShelfChange={this.props.onShelfChange} />
                </li>
              ))}
            </ol>
          }
        </div>
      </div>
    )
  }
}

export default Search;
