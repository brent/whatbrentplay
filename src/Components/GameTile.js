import React, { Component } from 'react';
import '../css/gameTile.css';

class GameTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: this.props.review
    };

    console.log(this.state);
  }

  render() {
    return(
      <div className="gameTileWrapper">
        <div className="gameTile__cover">
          <img src={ this.state.review.game.cover_url } />
        </div>
        <div className="gameTile__meta">
          <h2 className="gameTile__gameTitle">
            { this.state.review.game.name }
          </h2>
        </div>
      </div>
    );
  }
}

export default GameTile;
