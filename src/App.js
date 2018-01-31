import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css'

// Third-Party Dependencies
import { BrowserRouter, Route, Link } from 'react-router-dom'

// Components
import Search from './components/Search';
import Bookshelf from './components/Bookshelf';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  // Moves a `book` object to a new `newShelf`
  updateBookShelf = (book, newShelf) => {
    this.setState(prevState => {
      if (newShelf === 'none') { // remove item
        prevState.books = prevState.books.filter(b => b.id !== book.id)
      } else { // map through books and find the matching one, update shelf
        prevState.books = prevState.books.map(b => {
          if (b.id === book.id) {
            b.shelf = newShelf
          }
          return b
        })
        BooksAPI.update(book, newShelf);
      }
    })
  }

  render() {

    return (
      <BrowserRouter>
          <div className="app">

            <Route exact path="/search" component={() => (
                <Search books={this.state.books} onShelfChange={this.updateBookShelf} />
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
