import React from 'react';
import { Link } from 'react-router-dom';

import '../css/review.css';

const Review = ({ review }) => {
  const renderSubcategories = (review) => {
    let categories = [];

    review.rating.forEach((section) => {
      if (section.category) {
        categories.push(
          <li className="subCategoryContainer" key={ section.category }>
            <p className="subCategoryContainer__categoryScore">{ section.score }<span className="categoryScore__total">/5</span></p>
            <h4 className="subCategoryContainer__categoryName">{
              section.category.charAt(0).toUpperCase() + section.category.slice(1)
            }</h4>
          </li>
        )
      }
    });

    return categories;
  }

  return (
    <div className="reviewWrapper">
      <Link
        to={ `/${review.slug}` }
        className="reviewWrapper__game"
      >
        <div className="gameMetaContainer">
          <div className="gameMetaContainer--inner">
            <h3 className="gameMetaContainer__platforms">{ review.game.platforms.join(", ")}</h3>
            <h2 className="gameMetaContainer__name">{ review.game.name }</h2>
          </div>

          <div className="gameMetaContainer--inner">
            <h3 className="gameMetaContainer__score">
              <span className="score__rating">
                { review.rating[review.rating.length - 1].totalScore }
              </span>
              <span className="score__total"> / 25</span>
            </h3>
          </div>
        </div>

        <div className="gameMetaContainer__coverArt">
          <img src={ review.game.cover_url } alt="{ this.props.review.game.name } cover art" />
        </div>
      </Link>

      <div className="reviewSummaryContainer">
        <h4 className="reviewSummaryContainer__heading reviewSeeAllCTA--hidden">Summary</h4>
        <p className="reviewSummaryContainer__blurb">{ review.summary.blurb }</p>
      </div>

      <div className="scoreBreakdown">
        <p>Score breakdown</p>
        <ul className='subCategoryList'>
          { renderSubcategories(review) }
        </ul>
      </div>
    </div>
  )
}

export default Review;
