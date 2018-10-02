
import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';




class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
        return album.slug === this.props.match.params.slug
      }
    );

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      currentTime: 0,
      duration: album.songs[0].duration,
      hover: true,
      showButtons: true


    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);


  }



  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
      this.setState(state => ({
        showButtons: !this.state.showButtons
      }));
    } else if (!isSameSong) {
      this.setSong(song);

    } else {
      this.play();
      this.setState(state => ({
        showButtons: !this.state.showButtons
      }));
    }
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }


  handlePrevClick() {
    const currentIndex  = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();

  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, 4);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();

  }


  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }


  componentDidMount() {
    this.eventListeners = {
      timeupdate: (e) => {
        this.setState({ currentTime: this.state.currentTime });
      },

      duration: (e) => {
        this.setState({ duration: this.state.duration });
      }
    };

    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }


  render() {

    const play = <span className="ion-md-play"></span>
    const pause = <span className="ion-md-pause"></span>

    return(
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={ this.state.album.albumCover } alt={ this.state.album.title }/>
          <div className="album-details">
            <h1 id="album-title">{ this.state.album.title }</h1>
            <h2 className="artist">{ this.state.album.artist }</h2>
            <div id="release-info">{ this.state.album.releaseInfo }</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onMouseEnter={ () => this.onMouseEnter() } onMouseLeave={ () => this.onMouseLeave() } onClick={ () => this.handleSongClick(song) }>
                  <td>
                    <span className="index"> { index+1 } </span>

                    <button className="buttons">
                      { this.state.showButtons ? play : pause }
                    </button>

                    <span className="song-title"> { this.state.album.songs[index].title } </span>
                    <span className="song-duration"> { this.state.album.songs[index].duration } </span>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={ this.state.isPlaying }
          currentSong={ this.state.currentSong }
          currentTime={ this.audioElement.currentTime }
          duration={ this.audioElement.duration }
          handleSongClick={ () => this.handleSongClick(this.state.currentSong) }
          handlePrevClick={ () => this.handlePrevClick() }
          handleNextClick={ () => this.handleNextClick() }
          handleTimeChange={ (e) => this.handleTimeChange(e) }


        />

      </section>

    );
  }
}


export default Album;
