import React, { Component } from 'react';

import '../css/review.css';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      truncated: true,
    }
  }

  handleClick = (event) => {
    this.setState({
      truncated: !this.state.truncated,
    });
  }

  renderSubcategories = (review) => {
    let categories = [];

    for (let category in review.rating) {
      if (category !== "totalScore") {
        categories.push(
          <li className="subCategoryContainer" key={category}>
            <p className="subCategoryContainer__categoryScore">{review.rating[category].score}</p>
            <h4 className="subCategoryContainer__categoryName">{
              category.charAt(0).toUpperCase() + category.slice(1)
            }</h4>
            <p className="subCategoryContainer__scoreSummary">{review.rating[category].summary}</p>
          </li>
        )
      }
    }

    return categories.reverse();
  }

  render() {
    return(
      <div className="reviewWrapper">

        <div className="reviewWrapper__game">

          <div className="gameMetaContainer">
            <div className="gameMetaContainer--inner">
              <h3 className="gameMetaContainer__platforms">{this.props.review.game.platforms.join(", ")}</h3>
              <h2 className="gameMetaContainer__name">{this.props.review.game.name}</h2>
            </div>

            <div className="gameMetaContainer--inner">
              <h3 className="gameMetaContainer__score">
                <span className="score__rating">
                  {this.props.review.rating.totalScore}
                </span>
                <span className="score__total"> / 25</span>
              </h3>
            </div>
          </div>

          <div className="gameMetaContainer__coverArt">
            <img src={this.props.review.game.cover_url} alt="{this.props.review.game.name} cover art" />
          </div>
        </div>

        <div className="reviewSummaryContainer">
          <h4 className="reviewSummaryContainer__heading">Summary</h4>
          <p className="reviewSummaryContainer__summary">{this.props.review.summary}</p>
        </div>

        <button className={
          this.state.truncated
            ? 'reviewSeeAllCTA'
            : 'reviewSeeAllCTA reviewSeeAllCTA--hidden'
            
        } onClick={this.handleClick}>
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
