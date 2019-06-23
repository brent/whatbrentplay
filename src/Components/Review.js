import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/review.css';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      truncated: true,
    }

    this.summaryProsPrefix = ["Buy if", "Play if", "Try if"];
    this.summaryConsPrefix = "Avoid if";
  }

  handlePrimaryCTAClick = (event) => {
    this.setState({
      truncated: !this.state.truncated,
    });
  }

  renderSubcategories = (review) => {
    let categories = [];

    review.rating.forEach((section) => {
      if (section.category) {
        categories.push(
          <li className="subCategoryContainer" key={ section.category }>
            <p className="subCategoryContainer__categoryScore">{ section.score }</p>
            <h4 className="subCategoryContainer__categoryName">{
              section.category.charAt(0).toUpperCase() + section.category.slice(1)
            }</h4>
            <p className="subCategoryContainer__scoreSummary">{ section.summary }</p>
          </li>
        )
      }
    });

    return categories;
  }

  formatSummaryPros = (summaryPros) => {
    let prosPrefix;

    for (let i = 0; i < this.summaryProsPrefix.length; i++) {
      if (summaryPros.includes(this.summaryProsPrefix[i])) {
        prosPrefix = this.summaryProsPrefix[i];
      }
    }

    return this.renderSummaryProsConsWithPrefix(summaryPros, prosPrefix);
  }

  formatSummaryCons = (summaryCons) => {
    let consPrefix;

    if (summaryCons.includes(this.summaryConsPrefix)) {
      consPrefix = this.summaryConsPrefix;
    }

    return this.renderSummaryProsConsWithPrefix(summaryCons, consPrefix);
  }

  renderSummaryProsConsWithPrefix = (summaryProsCons, prefix) => {
    const prefixChars = summaryProsCons.slice(0, prefix.length);
    const rest = summaryProsCons.slice(prefix.length + 1, summaryProsCons.length + 1);

    return(
      <span className="summaryProsCons">
        <span className="summaryProsCons__prefix">{ prefixChars }&hellip;</span><span className="summaryProsCons__rest">{ rest }</span>
      </span>
    )
  }

  render() {
    return(
      <div className="reviewWrapper">
        <Link
          to={ `/${this.props.review.slug}` }
          className="reviewWrapper__game"
        >
          <div className="gameMetaContainer">
            <div className="gameMetaContainer--inner">
              <h3 className="gameMetaContainer__platforms">{ this.props.review.game.platforms.join(", ")}</h3>
              <h2 className="gameMetaContainer__name">{ this.props.review.game.name }</h2>
            </div>

            <div className="gameMetaContainer--inner">
              <h3 className="gameMetaContainer__score">
                <span className="score__rating">
                  { this.props.review.rating[this.props.review.rating.length - 1].totalScore }
                </span>
                <span className="score__total"> / 25</span>
              </h3>
            </div>
          </div>

          <div className="gameMetaContainer__coverArt">
            <img src={ this.props.review.game.cover_url } alt="{ this.props.review.game.name } cover art" />
          </div>
        </Link>

        <div className="reviewSummaryContainer">
          <h4 className="reviewSummaryContainer__heading reviewSeeAllCTA--hidden">Summary</h4>
          <p className="reviewSummaryContainer__blurb">{ this.props.review.summary.blurb }</p>
          <p className="reviewSummaryContainer__pros">{ this.formatSummaryPros(this.props.review.summary.pros) }</p>
          <p className="reviewSummaryContainer__cons">{ this.formatSummaryCons(this.props.review.summary.cons) }</p>
        </div>

        <button className={
          this.state.truncated
            ? 'reviewSeeAllCTA'
            : 'reviewSeeAllCTA reviewSeeAllCTA--hidden'
            
        } onClick={ this.handlePrimaryCTAClick }>
          Full breakdown
        </button>

        <ul className={ 
          this.state.truncated
            ? 'subCategoryList subCategoryList--hidden' 
            : 'subCategoryList'
        }>
          <li><h4 className="subCategoryList__heading">Breakdown</h4></li>
          { this.renderSubcategories(this.props.review) }
        </ul>
      </div>
    )
  }
}

export default Review;
