import React, { Component } from 'react';





class PlayerBar extends Component {

  render() {
    return(

      <section className="musicbar">
        <section className="player-bar">
          <ul>
            <li>
              <span id="previous" onClick={ this.props.handlePrevClick } >
                <span className="ion-md-skip-backward"></span>
              </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span id="play-pause" onClick={ this.props.handleSongClick }>
                <span className={ this.props.isPlaying ? "ion-md-pause" : "ion-md-play" }></span>
              </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span id="next" onClick={ this.props.handleNextClick }>
                <span className="ion-md-skip-forward"></span>
              </span>
            </li>
            <li>
              <span className="slider">
                <a className="current-time">{ this.props.formatTime(this.props.currentTime) }</a>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="range" className="seek-bar" value={ this.props.currentTime / this.props.duration || 0 } max="1" min="0" step="0.01" onChange={ this.props.handleTimeChange }/>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                <a className="total-time">{ this.props.formatTime(this.props.duration) }</a>
              </span>
          </li>
        </ul>
      </section>
      <section className="sidevolume">
        <a className="ion-md-volume-high"></a>
          &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="range" className="seek-bar" value={ this.props.volume } max="1" min="0" step="0.01" onChange={ this.props.handleVolumeChange } />
      </section>
    </section>
    );
  }
}



export default PlayerBar;
