import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Search from './components/Search';
import Bookshelf from './components/Bookshelf';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  componentWillMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  updateBookShelf = (book, newShelf) => {
    this.setState(prevState => {
      if (newShelf === 'none') { // remove item
        prevState.books = prevState.books.filter(b => b.id !== book.id);
      } else {
        if (book.shelf === 'none') {
          book.shelf = newShelf;
          prevState.books = prevState.books.concat([book]);
        } else {
          prevState.books = prevState.books.map(b => {
            if (b.id === book.id) {
              b.shelf = newShelf;
            }
            return b;
          })
        }
        BooksAPI.update(book, newShelf);
      }
    })
  }

  searchAPI = (q) => {
    BooksAPI.search(q).then(searchResults => {
      if (!searchResults.error) {
        searchResults.map(book => {
          book.shelf = 'none';
          const match = this.state.books.find(b => b.id === book.id);
          if (match) {
            book.shelf = match.shelf;
          }
          return book;
        })
        this.setState({ searchResults });
      }
    })
  }

  render() {
    return (
      <BrowserRouter>
          <div className="app">

            <Route exact path="/search" render={(route) => (
                <Search history={route.history}
                        searchResults={this.state.searchResults}
                        onShelfChange={this.updateBookShelf}
                        onQueryChange={this.searchAPI}/>
              )}/>

          <Route exact path="/" render={() => (

                <div className="list-books">
                <div className="list-books-title"><h1>MyReads</h1></div>
                <div className="list-books-content">
                  <div>
                    <Bookshelf title="Currently Reading"
                               books={this.state.books.filter(b => b.shelf === 'currentlyReading')}
                               onShelfChange={this.updateBookShelf} />
                    <Bookshelf title="Want to Read"
                               books={this.state.books.filter(b => b.shelf === 'wantToRead')}
                               onShelfChange={this.updateBookShelf} />
                    <Bookshelf title="Read"
                               books={this.state.books.filter(b => b.shelf === 'read')}
                               onShelfChange={this.updateBookShelf} />
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>

            )} />
          </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
