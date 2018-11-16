import React from 'react';
import { Link } from 'react-router-dom';

import '../css/adminCreateReviewForm.css';

class AdminReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = props.location.handleSubmit;
    this.handleSummaryChange = props.location.handleSummaryChange;
    this.handleRatingChange = props.location.handleRatingChange;
    this.handleDraftChange = props.location.handleDraftChange;
    
    console.log(props.location);

    if (props.location.state) {
      this.state = {
        review: {
          ...props.location.state.review,
        },
      }
    } else {
      this.state = { 
        review: {
          isDraft: true,
          game: {
            name: "Lorem Ipsum: Sit Dolor Amet III",
            cover_url: "http://placehold.it/320x396",
            platforms: "Hyper Game System",
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
  }

  handleSaveClick = (e) => {
    e.preventDefault();

    this.setState({ 
      review: {
        ...this.state.review,
        isDraft: true,
      },
    });
  }

  handleSubmitClick = (e) => {
    e.preventDefault();

    this.setState({ 
      review: {
        ...this.state.review,
        isDraft: false,
      },
    });
  }

  displayCTAs() {
    const ctaLabel = this.state.review.id ? "Edit" : "Post";
    return(
      <div>
        <div className="checkboxContainer">
          <input type="checkbox" 
            className="checkbox"
            name="isDraft" 
            id="isDraft" 
            value={ this.state.review.isDraft }
            checked={ this.state.review.isDraft ? "checked" : undefined }
            onChange={ e => this.handleDraftChange(this.state.review, e) }
          />
          <label htmlFor="isDraft">this is a draft</label>
        </div>
        <button name="save">Save</button>
      </div>
    );
  }

  render() {
    return(
      <div className="">
        <Link className="backButton" to='/admin/index'>&larr; back to reviews</Link>
        <form className="createReviewForm" onSubmit={ e => this.handleSubmit(this.state.review, e) }>
          <section className="gameMeta">
            <div className="createReviewForm__block">
              <label htmlFor="gameName">Game name</label>
              <input type="text" name="game.name" id="gameName" 
                placeholder={ this.state.review.game.name }
                defaultValue={ this.state.review.game.name }
                onChange={ e => this.handleSummaryChange(this.state.review, e) }
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
                onChange={ e => this.handleSummaryChange(this.state.review, e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="platforms">Platforms</label>
              <input type="text" name="game.platforms" id="platforms"
                placeholder={ this.state.review.game.platforms }
                defaultValue={ this.state.review.game.platforms }
                //onChange={ e => this.handleSummaryChange(this.state.review, e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="blurb">Summary</label>
              <textarea type="text" name="summary.blurb" id="blurb"
                placeholder={ this.state.review.summary.blurb }
                defaultValue={ this.state.review.summary.blurb ? this.state.review.summary.blurb : "" }
                onChange={ e => this.handleSummaryChange(this.state.review, e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="pros">Pros (Buy if)</label>
              <textarea type="text" name="summary.pros" id="pros"
                placeholder={ this.state.review.summary.pros }
                defaultValue={ this.state.review.summary.pros ? this.state.review.summary.pros : "" }
                onChange={ e => this.handleSummaryChange(this.state.review, e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="cons">Cons (Avoid if)</label>
              <textarea type="text" name="summary.cons" id="cons"
                placeholder={ this.state.review.summary.cons }
                defaultValue={ this.state.review.summary.cons ? this.state.review.summary.cons : "" }
                onChange={ e => this.handleSummaryChange(this.state.review, e) }
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
                  onChange={ e => this.handleRatingChange(this.state.review, e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="visualSummary">Summary</label>
                <textarea name="visual.summary" id="visualSummary"
                  placeholder={ this.state.review.rating[0].summary }
                  defaultValue={ this.state.review.rating[0].summary }
                  onChange={ e => this.handleRatingChange(this.state.review, e) }
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
                  onChange={ e => this.handleRatingChange(this.state.review, e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="audioSummary">Summary</label>
                <textarea name="audio.summary" id="audioSummary"
                  placeholder={ this.state.review.rating[1].summary }
                  defaultValue={ this.state.review.rating[1].summary }
                  onChange={ e => this.handleRatingChange(this.state.review, e) }
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
                  onChange={ e => this.handleRatingChange(this.state.review, e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="gameplaySummary">Summary</label>
                <textarea name="gameplay.summary" id="gameplaySummary" 
                  placeholder={ this.state.review.rating[2].summary }
                  defaultValue={ this.state.review.rating[2].summary }
                  onChange={ e => this.handleRatingChange(this.state.review, e) }
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
                  onChange={ e => this.handleRatingChange(this.state.review, e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="qualitySummary">Summary</label>
                <textarea name="quality.summary" id="qualitySummary"
                  placeholder={ this.state.review.rating[3].summary }
                  defaultValue={ this.state.review.rating[3].summary }
                  onChange={ e => this.handleRatingChange(this.state.review, e) }
                >
                </textarea>
              </div>
            </div>
          </section>

          <div>
            { this.displayCTAs() }
          </div>
        </form>
      </div>
    )
  }
}

export default AdminReviewForm;
