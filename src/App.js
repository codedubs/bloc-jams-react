import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
<<<<<<< HEAD

=======
>>>>>>> assignment-4-routing

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <Link to='/'>Landing</Link>
            <Link to='/library'>Library</Link>
          </nav>
          <h1> Bloc Jams </h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
<<<<<<< HEAD
          <Route path="/album/:slug" component={Album} />
=======
          <Route path="/album" component={Album} />
>>>>>>> assignment-4-routing
        </main>
      </div>
    );
  }
}

export default App;
