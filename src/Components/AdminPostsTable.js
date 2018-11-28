import React from 'react';
import { Link } from 'react-router-dom';

import ReviewModel from '../Models/Review';

import '../css/adminPostsTable.css';

class AdminPostsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: props.reviews,
    }
  }

  displayDate(date) {
    const dateObj = new Date(date);

    const month = dateObj.getMonth() + 1;
    const day   = dateObj.getDate();
    const year  = dateObj.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  handleClick(review, index, event) {
    if (window.confirm('Are you sure?')) {
      let reviews = this.state.reviews;
      delete reviews[index];

      ReviewModel.delete(review)
        .then(() => {
          this.setState({ reviews: reviews });
        });
    }
  }

  render() {
    return(
      <div className="">
        <table className="reviewsTable">
          <thead>
            <tr>
              <th>Game</th>
              <th>Score</th>
              <th>Created date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.reviews.map((review, i) => (
                <tr key={ review.id } className="reviewRow">
                  <td className="reviewRow__gameName">
                    <Link class_name="review-link" to={{
                      pathname: `/admin/review/${review.slug}`,
                      review: review,
                    }}>{ review.game.name }</Link>
                  </td>
                  <td className="reviewRow__score">{ review.rating[review.rating.length - 1].totalScore }</td>
                  <td className="reviewRow__createdAt">{ this.displayDate(review.createdAt) }</td>
                  <td className="reviewRow__status">{ review.isDraft ? "Draft" : "Live"  }</td>
                  <td className="reviewRow__delete"><a onClick={ (e) => this.handleClick(review, i, e) }>delete</a></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminPostsTable;
