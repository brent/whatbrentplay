import React from 'react';
import ReviewModel from '../Models/Review';

import '../css/adminCreateReviewForm.css';

class AdminCreateReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = props.location.handleSubmit;
    this.handleChange = props.location.handleChange;

    if (props.location.state) {
      console.log(props);
      this.state = {
        review: {
          ...props.location.state.review,
        },
      }
    } else {
      this.state = { 
        review: {
          game: {
            name: "Lorem Ipsum: Sit Dolor Amet III",
            cover_url: "http://placehold.it/320x396",
            platforms: ["Hyper Game System"],
          },
          rating: [
            { score: 5, summary: "Be concise..."},
            { score: 5, summary: "Be concise..."},
            { score: 5, summary: "Be concise..."},
            { score: 5, summary: "Be concise..."},
            { score: 5, summary: "Be concise..."},
          ],
          summary: {
            blurb: "",
            pros: "",
            cons: "",
          },
        }
      };
    }
    console.log('initial state', this.state);
  }

  getIndexForCategory = (categoryName) => {
    let index;

    switch (categoryName) {
      case 'visual':
        index = 0;
        break;
      case 'audio':
        index = 1;
        break;
      case 'gameplay':
        index = 2;
        break;
      case 'quality':
        index = 3;
        break;
      case 'experience':
        index = 4;
        break;
      default:
        break;
    }

    return index;
  }

  handleRatingChange = (e) => {
    const value = e.target.value;
    const parts = e.target.name.split('.');

    const category = parts[0];
    const key = parts[1];

    const index = this.getIndexForCategory(category);

    let rating = this.state.review.rating;
    rating[index][key] = value;

    this.setState((prevState, props) => ({
      review: {
        ...prevState.review,
        rating: [
          ...rating,
        ]
      }
    }));

    console.log(this.state);
  }

  generateSlug = (e) => {
    const gameTitle = e.target.value,
          regex = /([a-zA-z0-9?']*)[\s\W]{1,2}/gi,
          parts = gameTitle.split(regex);

    let sanitizedParts = [];
    parts.forEach((part) => {
      if (part.length !== 0) {
        part = part.replace('\'', '');
        sanitizedParts.push(part.toLowerCase());
      }
    });

    const slug = sanitizedParts.join("-");

    this.setState((prevState, props) => ({
      ...prevState,
      review: { slug: slug }
    }));
  }

  displayCTA() {
    const ctaLabel = this.state.review.id ? "Edit" : "Post";
    return <button>{ctaLabel} review</button>;
  }

  render() {
    return(
      <form className="createReviewForm" onSubmit={ this.handleSubmit }>
        <section className="gameMeta">
          <h3>Info</h3>
          <div className="createReviewForm__block">
            <label htmlFor="gameName">Game name</label>
            <input type="text" name="game.name" id="gameName" 
              placeholder={ this.state.review.game.name }
              defaultValue={ this.state.review.game.name }
              onChange={ this.handleChange }
            />
            <input type="hidden" name="slug" id="slug" defaultValue={ this.state.review.slug } />
            <p><span>slug: </span>{ this.state.review.slug }</p>
          </div>

          <div className="createReviewForm__block">
            <label htmlFor="coverImgUrl">Cover image url</label>
            <input type="text" name="game.cover_url" id="coverImgUrl" 
              placeholder={ this.state.review.game.cover_url }
              defaultValue={ this.state.review.game.cover_url }
              onChange={ this.handleChange }
            />
          </div>

          <div className="createReviewForm__block">
            <label htmlFor="platforms">Platforms</label>
            <input type="text" name="game.platforms" id="platforms"
              placeholder={ this.state.review.game.platforms }
              defaultValue={ this.state.review.game.platforms }
              onChange={ this.handleChange }
            />
          </div>

          <div className="createReviewForm__block">
            <label htmlFor="blurb">Summary</label>
            <textarea type="text" name="summary.blurb" id="blurb"
              placeholder={ this.state.review.summary.blurb }
              defaultValue={ this.state.review.summary.blurb ? this.state.review.summary.blurb : "" }
              onChange={ this.handleChange }
            />
          </div>

          <div className="createReviewForm__block">
            <label htmlFor="pros">Pros (Buy if)</label>
            <textarea type="text" name="summary.pros" id="pros"
              placeholder={ this.state.review.summary.pros }
              defaultValue={ this.state.review.summary.pros ? this.state.review.summary.pros : "" }
              onChange={ this.handleChange }
            />
          </div>

          <div className="createReviewForm__block">
            <label htmlFor="cons">Cons (Avoid if)</label>
            <textarea type="text" name="summary.cons" id="cons"
              placeholder={ this.state.review.summary.cons }
              defaultValue={ this.state.review.summary.cons ? this.state.review.summary.cons : "" }
              onChange={ this.handleChange }
            />
          </div>

        </section>

        <section className="scoreSection">
          <h3 className="scoreSection__heading">Score</h3>
          <div className="scoreSection__category">
            <h4>Visual</h4>
            <div className="createReviewForm__block">
              <label htmlFor="visualScore">Score</label>
              <input type="text" name="visual.score" id="visualScore"
                placeholder={ this.state.review.rating[0].score }
                defaultValue={ this.state.review.rating[0].score }
                onChange={ this.handleRatingChange }
              />
            </div>
            <div className="createReviewForm__block">
              <label htmlFor="visualSummary">Summary</label>
              <textarea name="visual.summary" id="visualSummary"
                placeholder={ this.state.review.rating[0].summary }
                defaultValue={ this.state.review.rating[0].summary }
                onChange={ this.handleRatingChange }
              />
            </div>
          </div>
          <div className="scoreSection__category">
            <h4>Audio</h4>
            <div className="createReviewForm__block">
              <label htmlFor="audioScore">Score</label>
              <input type="text" name="audio.score" id="audioScore"
                placeholder={ this.state.review.rating[1].score }
                defaultValue={ this.state.review.rating[1].score }
                onChange={ this.handleRatingChange }
              />
            </div>
            <div className="createReviewForm__block">
              <label htmlFor="audioSummary">Summary</label>
              <textarea name="audio.summary" id="audioSummary"
                placeholder={ this.state.review.rating[1].summary }
                defaultValue={ this.state.review.rating[1].summary }
                onChange={ this.handleRatingChange }
              />
            </div>
          </div>
          <div className="scoreSection__category">
            <h4>Gameplay</h4>
            <div className="createReviewForm__block">
              <label htmlFor="gameplayScore">Score</label>
              <input type="text" name="gameplay.score" id="gameplayScore"
                placeholder={ this.state.review.rating[2].score }
                defaultValue={ this.state.review.rating[2].score }
                onChange={ this.handleRatingChange }
              />
            </div>
            <div className="createReviewForm__block">
              <label htmlFor="gameplaySummary">Summary</label>
              <textarea name="gameplay.summary" id="gameplaySummary" 
                placeholder={ this.state.review.rating[2].summary }
                defaultValue={ this.state.review.rating[2].summary }
                onChange={ this.handleRatingChange }
              />
            </div>
          </div>
          <div className="scoreSection__category">
            <h4>Quality</h4>
            <div className="createReviewForm__block">
              <label htmlFor="qualityScore">Score</label>
              <input type="text" name="quality.score" id="qualityScore" 
                placeholder={ this.state.review.rating[3].score }
                defaultValue={ this.state.review.rating[3].score }
                onChange={ this.handleRatingChange }
              />
            </div>
            <div className="createReviewForm__block">
              <label htmlFor="qualitySummary">Summary</label>
              <textarea name="quality.summary" id="qualitySummary"
                placeholder={ this.state.review.rating[3].summary }
                defaultValue={ this.state.review.rating[3].summary }
                onChange={ this.handleRatingChange }
              >
              </textarea>
            </div>
          </div>
        </section>

        <div>
          { this.displayCTA() }
        </div>
      </form>
    )
  }
}

export default AdminCreateReviewForm;
