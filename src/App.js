import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css'

// Third-Party Dependencies
import { BrowserRouter, Route, Link } from 'react-router-dom'

// Components
import Search from './Search';
import Bookshelf from './Bookshelf';

class BooksApp extends React.Component {
  /*
    Component state:
      shelves // a shelf for each book, property name is shelf name (camelcase)
  */
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  // Sorts an array of books into shelves of `state`
  placeBooksToShelfState = (books) => {
    this.setState({
      shelves: {
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read')
      }
    });
  }

  componentWillMount() {
    BooksAPI.getAll().then(this.placeBooksToShelfState)
  }

  render() {

    return (
      <BrowserRouter>
          <div className="app">
            <Route exact path="/search" component={Search}/>
            <Route exact path="/" render={() => (
              <div className="list-books">
                <div className="list-books-title"><h1>MyReads</h1></div>
                <div className="list-books-content">
                  <div>
                    <Bookshelf title="Currently Reading" books={this.state.shelves.currentlyReading} />
                    <Bookshelf title="Want to Read" books={this.state.shelves.wantToRead} />
                    <Bookshelf title="Read" books={this.state.shelves.read} />
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
