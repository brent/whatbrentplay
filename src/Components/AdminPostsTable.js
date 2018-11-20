import React from 'react';
import { Link } from 'react-router-dom';

import '../css/adminPostsTable.css';

class AdminPostsTable extends React.Component {
  constructor(props) {
    super(props);
    console.log('AdminPostsTable props', this.props.reviews);
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
              this.props.reviews.map(review => (
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
