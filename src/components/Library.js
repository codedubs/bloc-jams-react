import React, { Component } from 'react';
import albumData from './../data/albums';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';


class Library extends Component {

  constructor(props) {
    super(props);

    this.state = {
      albums: albumData
    };
  }

  render() {
    return(
      
      <section className="library">

        <Carousel />

      </section>
    );
  }
}



export default Library;
