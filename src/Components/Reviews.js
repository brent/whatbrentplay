import React, { Component } from 'react';
import ReviewModel from '../Models/Review';
import Review from './Review';

class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = { reviews: [] };
  }

  componentDidMount() {
    ReviewModel.getAllLive()
      .then((reviews) => {
        this.setState({
          reviews: reviews
        });
      });
  }

  render() {
    return (
      <div>
        <ul className="reviews">
          {
            this.state.reviews.map((review) => (
              <li key={review.id} className="review">
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
