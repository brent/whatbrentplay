import React, { Component } from 'react';
import '../css/gameTile.css';

class GameTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: this.props.review
    };
  }

  render() {
    return(
      <a href={ '/' + this.state.review.slug } className="gameTileWrapper">
        <div className="gameTile__cover">
          <img src={ this.state.review.game.cover_url } alt={ this.state.review.game.name + ' cover image' } />
        </div>
        <div className="gameTile__meta">
          <h3 className="gameTile__score">
            { this.state.review.rating[5].totalScore + '/25' }
          </h3>
          <h2 className="gameTile__gameTitle">
            { this.state.review.game.name }
          </h2>
        </div>
      </a>
    );
  }
}

export default GameTile;
