import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/review.css';

const Review = ({ review }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const handlePrimaryCTAClick = (event) => setIsTruncated(!isTruncated)
  const formatSummary = (summary) => summary.replace('\n', '<br><br>')
  const summaryProsPrefix = ["Buy if", "Play if", "Try if"];
  const summaryConsPrefix = "Avoid if";

  const renderSubcategories = (review) => {
    let categories = [];

    review.rating.forEach((section) => {
      if (section.category) {
        categories.push(
          <li className="subCategoryContainer" key={ section.category }>
            <p className="subCategoryContainer__categoryScore">{ section.score }</p>
            <h4 className="subCategoryContainer__categoryName">{
              section.category.charAt(0).toUpperCase() + section.category.slice(1)
            }</h4>
          <p
            className="subCategoryContainer__scoreSummary"
            dangerouslySetInnerHTML={{ __html: formatSummary(section.summary) }}
          />
          </li>
        )
      }
    });

    return categories;
  }

  const formatSummaryPros = (summaryPros) => {
    let prosPrefix;

    for (let i = 0; i < summaryProsPrefix.length; i++) {
      if (summaryPros.includes(summaryProsPrefix[i])) {
        prosPrefix = summaryProsPrefix[i];
      }
    }

    return renderSummaryProsConsWithPrefix(summaryPros, prosPrefix);
  }

  const formatSummaryCons = (summaryCons) => {
    let consPrefix;

    if (summaryCons.includes(summaryConsPrefix)) {
      consPrefix = summaryConsPrefix;
    }

    return renderSummaryProsConsWithPrefix(summaryCons, consPrefix);
  }

  const renderSummaryProsConsWithPrefix = (summaryProsCons, prefix) => {
    const prefixChars = summaryProsCons.slice(0, prefix.length);
    const rest = summaryProsCons.slice(prefix.length + 1, summaryProsCons.length + 1);

    return(
      <span className="summaryProsCons">
        <span className="summaryProsCons__prefix">{ prefixChars }&hellip;</span><span className="summaryProsCons__rest">{ rest }</span>
      </span>
    )
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
        <p className="reviewSummaryContainer__pros">{ formatSummaryPros(review.summary.pros) }</p>
        <p className="reviewSummaryContainer__cons">{ formatSummaryCons(review.summary.cons) }</p>
      </div>

      <button className={
        isTruncated
          ? 'reviewSeeAllCTA'
          : 'reviewSeeAllCTA reviewSeeAllCTA--hidden'

      } onClick={ handlePrimaryCTAClick }>
        Full breakdown
      </button>

      <ul className={
        isTruncated
          ? 'subCategoryList subCategoryList--hidden'
          : 'subCategoryList'
      }>
        <li><h4 className="subCategoryList__heading">Breakdown</h4></li>
        { renderSubcategories(review) }
      </ul>
    </div>
  )
}

export default Review;
