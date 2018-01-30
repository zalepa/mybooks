import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Search from './Search';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        shelves: {
          currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
          wantToRead: books.filter(book => book.shelf === 'wantToRead'),
          read: books.filter(book => book.shelf === 'read')
        }
      });
    })
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
