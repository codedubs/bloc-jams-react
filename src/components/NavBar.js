import React from 'react';





const NavBar = () => (

      <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
        <a className="ion-md-funnel"></a>
        <a className="navbar-brand">Bloc Jams</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href='/'> Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/library'> Library </a>
            </li>
          </ul>
          <span className="navbar-text">
            Log In
          </span>
        </div>
      </nav>

    );


export default NavBar;
