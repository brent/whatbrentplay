import React, { Component } from 'react';
import ReviewModel from '../Models/Review';
import Review from './Review';

class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = { reviews: [] };
  }

  componentDidMount() {
    ReviewModel.getAll()
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
                <Review review={review} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Reviews;
