import React from 'react';
import { Link } from 'react-router-dom';

import '../css/adminPostsTable.css';

class AdminPostsTable extends React.Component {
  render() {
    return(
      <div className="">
        <table className="reviewsTable">
          <thead>
            <th>Game</th>
            <th>Score</th>
            <th>Created date</th>
            <th>Status</th>
          </thead>
          <tbody>
            {
              this.props.posts.map(review => (
                <tr className="reviewRow">
                  <td className="reviewRow__gameName">
                    <Link class_name="review-link" to={{
                      pathname: `/admin/review/${review.slug}`,
                      state: { review: review },
                      handleSubmit: this.props.handleSubmit,
                      handleSummaryChange: this.props.handleSummaryChangeForReview,
                      handleRatingChange: this.props.handleRatingChangeForReview
                    }}>{ review.game.name }</Link>
                  </td>
                  <td className="reviewRow__score">{ review.rating[review.rating.length - 1].totalScore }</td>
                  <td className="reviewRow__createdAt">{ this.props.displayDate(review.createdAt) }</td>
                  <td className="reviewRow__status">Live</td>
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
