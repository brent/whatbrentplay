import React, { useState } from 'react';
import {
  Link,
  redirect,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import ReviewModel from '../Models/Review';

import '../css/adminCreateReviewForm.css';

const AdminReviewForm = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { state } = useLocation();
  const isLoggedIn = state.isLoggedIn;

  let emptyReview = {
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

  let reviewData = ((review) => {
    return state.review
      ? state.review
      : new ReviewModel(emptyReview);
  })(state.review);

  const generateSlug = (gameName) => {
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

  const getIndexForCategory = (categoryName) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let review = reviewData;
    let totalScore = 0;

    for (let i=0; i<5; i++) {
      totalScore += parseInt(review.rating[i].score, 10);
    }

    if (review.rating[review.rating.length-1].totalScore) {
      review.rating[review.rating.length-1].totalScore = totalScore;
      ReviewModel.update(reviewData);
    } else {
      review.rating.push({ totalScore: totalScore });
      ReviewModel.create(reviewData);
    }
  }

  const handleGameNameChange = (e) => {
    const slug = generateSlug(e.target.value);
    let review = reviewData;
    review.slug = slug;
    reviewData = review

    handleSummaryChange(e);
  }

  const handleSummaryChange = (e) => {
    const [key, val] = e.target.name.split('.');
    const newVal = e.target.value;

    let review = reviewData;
    review[key][val] = newVal;
    reviewData = review;
  }

  const handleRatingChange = (e) => {
    const [ category, section ] = e.target.name.split('.');
    const newVal = e.target.value;

    const index = getIndexForCategory(category);
    let review = reviewData;

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

    reviewData = review;
  }

  const handleDraftChange = (e) => {
    let review = reviewData;
    const isDraft = !review.isDraft;
    review.isDraft = isDraft;
    reviewData = review;
  }

  const handlePlatformChange = (e) => {
    const platform = e.target.value;
    let review = reviewData;
    review.game.platforms[0] = platform;
    reviewData = review;
  }

  const displayCTAs = (review) => {
    return(
      <div className="cta-container">
        <div className="checkboxContainer">
          <input type="checkbox"
            className="checkbox"
            name="isDraft"
            id="isDraft"
            value={ review.isDraft }
            checked={ review.isDraft ? "checked" : undefined }
            onChange={ e => this.handleDraftChange(e) }
          />
          <label htmlFor="isDraft">this is a draft</label>
        </div>
        <button className="cta-btn" name="save">Save</button>
      </div>
    );
  }

  const displayForm = (review) => {
    return(
      <div>
        <Link
          className="backButton"
          to='/admin/index'
          state={{ isLoggedIn: true }}
        >&larr; back to reviews</Link>
        <form className="createReviewForm" onSubmit={ e => handleSubmit(e) }>
          <section className="gameMeta">
            <div className="createReviewForm__block">
              <label htmlFor="gameName">Game name</label>
              <input type="text" name="game.name" id="gameName"
                placeholder={ review.game.name }
                defaultValue={ review.game.name }
                onChange={ e => handleGameNameChange(e) }
              />
              <input type="hidden" name="slug" id="slug" defaultValue={ review.slug } />
              { review.slug
                ? <p className="slug"><span>slug: /</span>{ review.slug }</p>
                : null
              }
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="coverImgUrl">Cover image url</label>
              <input type="text" name="game.cover_url" id="coverImgUrl"
                placeholder={ review.game.cover_url }
                defaultValue={ review.game.cover_url }
                onChange={ e => handleSummaryChange(e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="platforms">Platforms</label>
              <input type="text" name="game.platforms" id="platforms"
                placeholder={ review.game.platforms }
                defaultValue={ review.game.platforms }
                onChange={ e => handlePlatformChange(e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="blurb">Summary</label>
              <textarea type="text" name="summary.blurb" id="blurb"
                placeholder={ review.summary.blurb }
                defaultValue={ review.summary.blurb ? review.summary.blurb : "" }
                onChange={ e => handleSummaryChange(e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="pros">Pros (Buy if)</label>
              <textarea type="text" name="summary.pros" id="pros"
                placeholder={ review.summary.pros }
                defaultValue={ review.summary.pros ? review.summary.pros : "" }
                onChange={ e => handleSummaryChange(e) }
              />
            </div>

            <div className="createReviewForm__block">
              <label htmlFor="cons">Cons (Avoid if)</label>
              <textarea type="text" name="summary.cons" id="cons"
                placeholder={ review.summary.cons }
                defaultValue={ review.summary.cons ? review.summary.cons : "" }
                onChange={ e => handleSummaryChange(e) }
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
                  placeholder={ review.rating[0].score }
                  defaultValue={ review.rating[0].score }
                  onChange={ e => handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="visualSummary">Summary</label>
                <textarea name="visual.summary" id="visualSummary"
                  placeholder={ review.rating[0].summary }
                  defaultValue={ review.rating[0].summary }
                  onChange={ e => handleRatingChange(e) }
                />
              </div>
            </div>
            <div className="scoreSection__category">
              <h4>Audio</h4>
              <div className="createReviewForm__block">
                <label htmlFor="audioScore">Score</label>
                <input type="text" name="audio.score" id="audioScore"
                  placeholder={ review.rating[1].score }
                  defaultValue={ review.rating[1].score }
                  onChange={ e => handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="audioSummary">Summary</label>
                <textarea name="audio.summary" id="audioSummary"
                  placeholder={ review.rating[1].summary }
                  defaultValue={ review.rating[1].summary }
                  onChange={ e => handleRatingChange(e) }
                />
              </div>
            </div>
            <div className="scoreSection__category">
              <h4>Gameplay</h4>
              <div className="createReviewForm__block">
                <label htmlFor="gameplayScore">Score</label>
                <input type="text" name="gameplay.score" id="gameplayScore"
                  placeholder={ review.rating[2].score }
                  defaultValue={ review.rating[2].score }
                  onChange={ e => handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="gameplaySummary">Summary</label>
                <textarea name="gameplay.summary" id="gameplaySummary"
                  placeholder={ review.rating[2].summary }
                  defaultValue={ review.rating[2].summary }
                  onChange={ e => handleRatingChange(e) }
                />
              </div>
            </div>
            <div className="scoreSection__category">
              <h4>Quality</h4>
              <div className="createReviewForm__block">
                <label htmlFor="qualityScore">Score</label>
                <input type="text" name="quality.score" id="qualityScore"
                  placeholder={ review.rating[3].score }
                  defaultValue={ review.rating[3].score }
                  onChange={ e => handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="qualitySummary">Summary</label>
                <textarea name="quality.summary" id="qualitySummary"
                  placeholder={ review.rating[3].summary }
                  defaultValue={ review.rating[3].summary }
                  onChange={ e => handleRatingChange(e) }
                >
                </textarea>
              </div>
            </div>
            <div className="scoreSection__category">
              <h4>Experience</h4>
              <div className="createReviewForm__block">
                <label htmlFor="experienceScore">Score</label>
                <input type="text" name="experience.score" id="experienceScore"
                  placeholder={ review.rating[4].score }
                  defaultValue={ review.rating[4].score }
                  onChange={ e => handleRatingChange(e) }
                />
              </div>
              <div className="createReviewForm__block">
                <label htmlFor="experienceSummary">Summary</label>
                <textarea name="experience.summary" id="experienceSummary"
                  placeholder={ review.rating[4].summary }
                  defaultValue={ review.rating[4].summary }
                  onChange={ e => handleRatingChange(e) }
                >
                </textarea>
              </div>
            </div>
          </section>

          <div className="cta-wrapper">
            { displayCTAs(review) }
          </div>
        </form>
      </div>
    )
  }

  return (
    <>
      { !isLoggedIn
          ? navigate('/admin')
          : displayForm(reviewData)
      }
    </>
  )
}

export default AdminReviewForm;
