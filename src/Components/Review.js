import React, { Component } from 'react';

import '../css/review.css';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      truncated: true,
    }

    this.summaryProsPrefix = "Buy if";
    this.summaryConsPrefix = "Avoid if";
  }

  handleClick = (event) => {
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

  formatSummaryProsOrCons = (summaryProsOrCons) => {
    let searchTerm;

    if (summaryProsOrCons.includes(this.summaryProsPrefix)) {
      searchTerm = this.summaryProsPrefix;
    } else if (summaryProsOrCons.includes(this.summaryConsPrefix)) {
      searchTerm = this.summaryConsPrefix;
    } else {
      searchTerm = null;
    }

    if (searchTerm) {
      const prefix = summaryProsOrCons.slice(0, searchTerm.length);
      const rest = summaryProsOrCons.slice(searchTerm.length + 1);

      return(
        <span className="summaryProsOrCons">
          <span className="summaryProsOrCons__prefix">{ prefix }&hellip;</span><span className="summaryProsOrCons__rest">{ rest }</span>
        </span>
      )
    } else {
      return summaryProsOrCons;
    }
  }

  render() {
    return(
      <div className="reviewWrapper">

        <div className="reviewWrapper__game">

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
        </div>

        <div className="reviewSummaryContainer">
          <h4 className="reviewSummaryContainer__heading">Summary</h4>
          <p className="reviewSummaryContainer__blurb">{ this.props.review.summary.blurb }</p>
          <p className="reviewSummaryContainer__pros">{ this.formatSummaryProsOrCons(this.props.review.summary.pros) }</p>
          <p className="reviewSummaryContainer__cons">{ this.formatSummaryProsOrCons(this.props.review.summary.cons) }</p>
        </div>

        <button className={
          this.state.truncated
            ? 'reviewSeeAllCTA'
            : 'reviewSeeAllCTA reviewSeeAllCTA--hidden'
            
        } onClick={ this.handleClick }>
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
