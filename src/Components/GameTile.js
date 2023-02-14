import React from 'react';
import '../css/gameTile.css';

const GameTile = ({ review }) => {
  return(
    <a href={ '/' + review.slug } className="gameTileWrapper">
      <div className="gameTile__cover">
        <img src={ review.game.cover_url } alt={ review.game.name + ' cover image' } />
      </div>
      <div className="gameTile__meta">
        <h2 className="gameTile__gameTitle">
          { review.game.name }
        </h2>
        <h3 className="gameTile__score">
          { review.rating[5].totalScore + '/25' }
        </h3>
      </div>
    </a>
  );
}

export default GameTile;
