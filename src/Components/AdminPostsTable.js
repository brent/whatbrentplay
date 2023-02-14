import React from 'react';
import { Link } from 'react-router-dom';

import ReviewModel from '../Models/Review';

import '../css/adminPostsTable.css';

const AdminPostsTable = ({ reviews, isLoggedIn }) => {
  const displayDate = (date) => {
    const dateObj = new Date(date);

    const month = dateObj.getMonth() + 1;
    const day   = dateObj.getDate();
    const year  = dateObj.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  const handleClick = (review, index, event) => {
    if (window.confirm('Are you sure?')) {
      let adjustedReviews = reviews;
      delete adjustedReviews[index];

      ReviewModel.delete(review)
        .then(() => reviews = adjustedReviews);
    }
  }

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
            reviews.map((review, i) => (
              <tr key={ review.id } className="reviewRow">
                <td className="reviewRow__gameName">
                  <Link
                    className="review-link"
                    to={`/admin/review/${review.slug}`}
                    state={{
                      isLoggedIn: isLoggedIn,
                      review: review,
                    }}
                  >{ review.game.name }</Link>
                </td>
                <td className="reviewRow__score">{ review.rating[review.rating.length - 1].totalScore }</td>
                <td className="reviewRow__createdAt">{ displayDate(review.createdAt) }</td>
                <td className="reviewRow__status">{ review.isDraft ? "Draft" : "Live"  }</td>
                <td className="reviewRow__delete"><a onClick={ (e) => handleClick(review, i, e) }>delete</a></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default AdminPostsTable;
