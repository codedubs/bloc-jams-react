import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';


class Carousel extends Component {

  constructor(props) {
    super(props);

    const albumTitle = albumData.map( (album, index) => {
        return album.title
      }
    );

    const albumArtist = albumData.map( (album, index) => {
        return album.artist
      }
    );

    const albumSongs = albumData.map( (album, index) => {
        return album.songs.length
      }
    );

    const albumSlug = albumData.map( (album, index) => {
        return album.slug
      }
    );

    this.state = {
      albumTitle: albumTitle,
      albumArtist: albumArtist,
      albumSongs: albumSongs,
      albumSlug: albumSlug
    };

  }


  render() {
    return(
      <div className="carocontainer">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="/assets/images/album_covers/01.jpg" alt="First slide" />
              <div className="carousel-caption d-none d-md-block">
                <Link to={`/album/${this.state.albumSlug[0]}`} className="link">
                  <div> {this.state.albumTitle[0]} </div>
                  <div> {this.state.albumArtist[0]} </div>
                  <div> {this.state.albumSongs[0]} Songs </div>
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/assets/images/album_covers/02.jpg" alt="Second slide" />
              <div className="carousel-caption d-none d-md-block">
                <Link to={`/album/${this.state.albumSlug[1]}`} className="link">
                  <div> {this.state.albumTitle[1]} </div>
                  <div> {this.state.albumArtist[1]} </div>
                  <div> {this.state.albumSongs[1]} Songs </div>
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/assets/images/album_covers/01.jpg" alt="First slide" />
              <div className="carousel-caption d-none d-md-block">
                <Link to={`/album/${this.state.albumSlug[0]}`} className="link">
                  <div> {this.state.albumTitle[0]} </div>
                  <div> {this.state.albumArtist[0]} </div>
                  <div> {this.state.albumSongs[0]} Songs </div>
                </Link>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      );
    }
  }


export default Carousel;
