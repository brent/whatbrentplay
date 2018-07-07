import React, { Component } from 'react';
import Review from '../Models/Review';

class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = { reviews: [] };
  }

  componentDidMount() {
    Review.getAll()
      .then((reviews) => {
        this.setState({
          reviews: reviews
        });
      });
  }

  render() {
    return(
      <div>
        <h2>Reviews</h2>
        <ul>
          {
            this.state.reviews.map((review) => (
              <li key={review.id}>
                <h2>{review.game.name}</h2>
                <h3>{review.rating.totalScore}</h3>
                <p>{review.summary}</p>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Reviews;
