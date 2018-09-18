<<<<<<< HEAD
import React, { Component } from 'react';



class Album extends Component {
  render() {
    return(
      <section className="album">
        { this.props.match.params.slug } Album will go here
      </section>
    );
  }
}
=======
import React from 'react';



const Album = () => (
  <section className="album">
    Album will go here
  </section>
);
>>>>>>> assignment-4-routing


export default Album;
