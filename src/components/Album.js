
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
      volume: 0.8,
      duration: album.songs[0].duration,
      hover: true,
      showButtons: true

    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

    this.audioElement.title = album.songs[0].title;

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
    this.audioElement.title = song.title;

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
      this.setState(state => ({
        showButtons: this.state.showButtons
      }));
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

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }


  formatTime(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(((duration / 60) - minutes) * 60);
     if (duration) {
      return minutes + ":" + (seconds < 10 ? ("0" + seconds) : seconds);
    } else {
      return "- : - -"
    }
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: (e) => {
        this.setState({ currentTime: this.state.currentTime });
      },

      duration: (e) => {
        this.setState({ duration: this.state.duration });
      },
      volumechange: (e) => {
        this.setState({ volume: this.state.volume });
      }
    };

    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }



  render() {

    const play = <span className="ion-md-play"></span>
    const pause = <span className="ion-md-pause"></span>


    return(

        <section className="album">
          <div id="column-1">
            <section id="album-info">
              <img id="album-cover-art" src={ this.state.album.albumCover } alt={ this.state.album.title }/>
              <div className="album-details">
                <h1 id="album-title" onMouseEnter={ () => this.onMouseEnter() }>{ this.state.album.title }</h1>
                <h2 className="artist">{ this.state.album.artist }</h2>
                <div id="release-info">{ this.state.album.releaseInfo }</div>
              </div>
            </section>
          </div>

          <div id="column-2">
            <table id="song-list">
              <tbody>
                {
                  this.state.album.songs.map( (song, index) =>
                    <tr className="song" key={index} onMouseEnter={ () => this.onMouseEnter() } onMouseLeave={ () => this.onMouseLeave() } onClick={ () => this.handleSongClick(song) }>
                      <td>
                        <span className="index"> { index + 1 + "." } </span>
                        <span className="buttons">
                          { this.state.showButtons ? play : pause }
                        </span>
                      </td>
                      <td>
                        <span className="song-title"> { this.state.album.songs[index].title } </span>
                      </td>
                      <td>
                        <span className="song-duration"> { this.formatTime(this.state.album.songs[index].duration) } </span>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
          <nav className="navbar fixed-bottom navbar-dark bg-dark">

            <a className="ion-md-add-circle-outline" onClick={ () => this.handleSongClick(this.state.currentSong) }> &nbsp; {this.audioElement.title} </a>

                <PlayerBar
                  isPlaying={ this.state.isPlaying }
                  currentSong={ this.state.currentSong }
                  currentTime={ this.audioElement.currentTime }
                  duration={ this.audioElement.duration }
                  volume={ this.audioElement.volume }
                  handleSongClick={ () => this.handleSongClick(this.state.currentSong) }
                  handlePrevClick={ () => this.handlePrevClick() }
                  handleNextClick={ () => this.handleNextClick() }
                  handleTimeChange={ (e) => this.handleTimeChange(e) }
                  handleVolumeChange={ (e) => this.handleVolumeChange(e) }
                  formatTime={ (duration) => this.formatTime(duration) }

                />
          </nav>
      </section>
    );
  }
}


export default Album;
