import React from 'react';
import { Link } from 'react-router-dom';

import ReviewModel from '../Models/Review';
import Review from './Review';

class AdminIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      reviews: [ ],
    };
  }

  componentDidMount() {
    ReviewModel.getAll()
      .then((reviews) => {
        this.setState({
          reviews: reviews,
        });
      });
  }

  displayDate(date) {
    const dateObj = new Date(date);

    const month = dateObj.getMonth() + 1;
    const day   = dateObj.getDate();
    const year  = dateObj.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  render() {
    return(
      <div>
        <h2>Reviews</h2>
        <ul>
          {
            this.state.reviews.map((review) => (
              <li key={ review.id }>
                <Link to={{ 
                  pathname: `/admin/review/${review.slug}`,
                  state: { review: review }
                }}>{ review.game.name }</Link>
                <p>{ review.rating[review.rating.length - 1].totalScore }</p>
                <p>{ this.displayDate(review.createdAt) }</p>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default AdminIndex;
