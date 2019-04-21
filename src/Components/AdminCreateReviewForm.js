import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import ReviewModel from '../Models/Review';

import '../css/adminCreateReviewForm.css';

class AdminReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      review: { },
    };

    const review = (function(reviewProp) {
      if (reviewProp) {
        return reviewProp;
      } else {
        const reviewData = {
          isDraft: true,
          slug: "lorem-ipsum-sit-dolor-amet-iii",
          game: {
            name: "Lorem Ipsum: Sit Dolor Amet III",
            cover_url: "http://placehold.it/320x396",
            platforms: ["Hyper Game System"],
          },
          rating: [
            { category: "visual",     score: 5, summary: "Be concise..."},
            { category: "audio",      score: 5, summary: "Be concise..."},
            { category: "gameplay",   score: 5, summary: "Be concise..."},
            { category: "quality",    score: 5, summary: "Be concise..."},
            { category: "experience", score: 5, summary: "Be concise..."},
          ],
          summary: {
            blurb: "",
            pros: "",
            cons: "",
          },
        };

        return new ReviewModel(reviewData);
      }
    }(this.props.location.review));

    this.state.review = review;
  }

  generateSlug = (gameName) => {
    const regex = /([a-zA-z0-9?']*)[\s\W]{1,2}/gi,
          parts = gameName.split(regex);

    let sanitizedParts = [];
    parts.forEach((part) => {
      if (part.length !== 0) {
        part = part.replace('\'', '');
        sanitizedParts.push(part.toLowerCase());
      }
    });

    const slug = sanitizedParts.join("-");
    return slug;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let review = this.state.review;
    let totalScore = 0;

    for (let i=0; i<5; i++) {
      totalScore += parseInt(review.rating[i].score, 10);
    }

    if (review.rating[review.rating.length-1].totalScore) {
      review.rating[review.rating.length-1].totalScore = totalScore;
      ReviewModel.update(this.state.review);
    } else {
      review.rating.push({ totalScore: totalScore });
      ReviewModel.create(this.state.review);
    }
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

  handleGameNameChange = (e) => {

    const slug = this.generateSlug(e.target.value);
    let review = this.state.review;
    review.slug = slug;

    this.setState({ review: review });

    this.handleSummaryChange(e);
  }

  handleSummaryChange = (e) => {
    const [ key, val ] = e.target.name.split('.');
    const newVal = e.target.value;

    let review = this.state.review;
    review[key][val] = newVal;

    this.setState({ review: review });
  }

  handleRatingChange = (e) => {
    const [ category, section ] = e.target.name.split('.');
    const newVal = e.target.value;

    const index = this.getIndexForCategory(category);
    let review = this.state.review;

    switch (section) {
      case 'score':
        if (newVal !== "") {
          review.rating[index][section] = parseInt(newVal, 10);
        } else {
          review.rating[index][section] = "";
        }
        break;
      case 'summary':
        review.rating[index][section] = newVal;
        break;
      default:
        return;
    }

    this.setState({ review: review });
  }

  handleDraftChange = (e) => {
    let review = this.state.review;
    const isDraft = !review.isDraft;
    review.isDraft = isDraft;
    this.setState({ review: review });
  }

  handlePlatformChange(e) {
    const platform = e.target.value;
    let review = this.state.review;
    review.game.platforms[0] = platform;
    this.setState({ review: review });
  }

  displayCTAs() {
    return(
      <div className="cta-container">
        <div className="checkboxContainer">
          <input type="checkbox" 
            className="checkbox"
            name="isDraft" 
            id="isDraft" 
            value={ this.state.review.isDraft }
            checked={ this.state.review.isDraft ? "checked" : undefined }
            onChange={ e => this.handleDraftChange(e) }
          />
          <label htmlFor="isDraft">this is a draft</label>
        </div>
        <button className="cta-btn" name="save">Save</button>
      </div>
    );
  }

  displayForm() {
    return(
      <div>
        <Link className="backButton" to='/admin/index'>&larr; back to reviews</Link>
        <form className="createReviewForm" onSubmit={ e => this.handleSubmit(e) }>
          <section className="gameMeta">
            <div className="createReviewForm__block">
              <label htmlFor="gameName">Game name</label>
              <input type="text" name="game.name" id="gameName" 
                placeholder={ this.state.review.game.name }
                defaultValue={ this.state.review.game.name }
                onChange={ e => this.handleGameNameChange(e) }
              />
              <input type="hidden" name="slug" id="slug" defaultValue={ this.state.review.slug } />
              { this.state.review.slug
                ? <p className="slug"><span>slug: /</span>{ this.state.review.slug }</p>
                : null
              }
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="coverImgUrl">Cover image url</label>
              <input type="text" name="game.cover_url" id="coverImgUrl" 
                placeholder={ this.state.review.game.cover_url }
                defaultValue={ this.state.review.game.cover_url }
                onChange={ e => this.handleSummaryChange(e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="platforms">Platforms</label>
              <input type="text" name="game.platforms" id="platforms"
                placeholder={ this.state.review.game.platforms }
                defaultValue={ this.state.review.game.platforms }
                onChange={ e => this.handlePlatformChange(e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="blurb">Summary</label>
              <textarea type="text" name="summary.blurb" id="blurb"
                placeholder={ this.state.review.summary.blurb }
                defaultValue={ this.state.review.summary.blurb ? this.state.review.summary.blurb : "" }
                onChange={ e => this.handleSummaryChange(e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="pros">Pros (Buy if)</label>
              <textarea type="text" name="summary.pros" id="pros"
                placeholder={ this.state.review.summary.pros }
                defaultValue={ this.state.review.summary.pros ? this.state.review.summary.pros : "" }
                onChange={ e => this.handleSummaryChange(e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="cons">Cons (Avoid if)</label>
              <textarea type="text" name="summary.cons" id="cons"
                placeholder={ this.state.review.summary.cons }
                defaultValue={ this.state.review.summary.cons ? this.state.review.summary.cons : "" }
                onChange={ e => this.handleSummaryChange(e) }
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
                  onChange={ e => this.handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="visualSummary">Summary</label>
                <textarea name="visual.summary" id="visualSummary"
                  placeholder={ this.state.review.rating[0].summary }
                  defaultValue={ this.state.review.rating[0].summary }
                  onChange={ e => this.handleRatingChange(e) }
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
                  onChange={ e => this.handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="audioSummary">Summary</label>
                <textarea name="audio.summary" id="audioSummary"
                  placeholder={ this.state.review.rating[1].summary }
                  defaultValue={ this.state.review.rating[1].summary }
                  onChange={ e => this.handleRatingChange(e) }
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
                  onChange={ e => this.handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="gameplaySummary">Summary</label>
                <textarea name="gameplay.summary" id="gameplaySummary" 
                  placeholder={ this.state.review.rating[2].summary }
                  defaultValue={ this.state.review.rating[2].summary }
                  onChange={ e => this.handleRatingChange(e) }
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
                  onChange={ e => this.handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="qualitySummary">Summary</label>
                <textarea name="quality.summary" id="qualitySummary"
                  placeholder={ this.state.review.rating[3].summary }
                  defaultValue={ this.state.review.rating[3].summary }
                  onChange={ e => this.handleRatingChange(e) }
                >
                </textarea>
              </div>
            </div>
            <div className="scoreSection__category">
              <h4>Experience</h4>
              <div className="createReviewForm__block">
                <label htmlFor="experienceScore">Score</label>
                <input type="text" name="experience.score" id="experienceScore" 
                  placeholder={ this.state.review.rating[4].score }
                  defaultValue={ this.state.review.rating[4].score }
                  onChange={ e => this.handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="experienceSummary">Summary</label>
                <textarea name="experience.summary" id="experienceSummary"
                  placeholder={ this.state.review.rating[4].summary }
                  defaultValue={ this.state.review.rating[4].summary }
                  onChange={ e => this.handleRatingChange(e) }
                >
                </textarea>
              </div>
            </div>
          </section>

          <div className="cta-wrapper">
            { this.displayCTAs() }
          </div>
        </form>
      </div>
    )
  }

  render() {
    const { isLoggedIn } = this.props.location.state || { };
    return(
      <div className="">
        { 
          !isLoggedIn
            ? <Redirect to='/admin' />
            : this.displayForm() 
        }
      </div>
    )
  }
}

export default AdminReviewForm;
