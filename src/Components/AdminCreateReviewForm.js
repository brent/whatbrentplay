import React from 'react';

import '../css/adminCreateReviewForm.css';

const AdminCreateReviewForm = (props) => (
  <form className="createReviewForm" onSubmit={props.onSubmit}>
    <section className="gameMeta">
      <h3>Info</h3>
      <div className="createReviewForm__block">
        <label htmlFor="gameName">Game name</label>
        <input type="text" name="gameName" id="gameName" placeholder="Lorem Ipsum: Sit Dolor Amet III" />
      </div>

      <div className="createReviewForm__block">
        <label htmlFor="coverImgUrl">Cover image url</label>
        <input type="text" name="coverImgUrl" id="coverImgUrl" placeholder="http://placehold.it/320x396" />
      </div>

      <div className="createReviewForm__block">
        <label htmlFor="platforms">Platforms</label>
        <input type="text" name="platforms" id="platforms" placeholder="PlayStation 4" />
      </div>

      <div className="createReviewForm__block">
        <label htmlFor="blurb">Summary</label>
        <textarea type="text" name="blurb" id="blurb" placeholder="Be clear and concise">
        </textarea>
      </div>

      <div className="createReviewForm__block">
        <label htmlFor="pros">Pros (Buy if)</label>
        <textarea type="text" name="pros" id="pros" placeholder="Be clear and concise">
        </textarea>
      </div>

      <div className="createReviewForm__block">
        <label htmlFor="cons">Cons (Avoid if)</label>
        <textarea type="text" name="cons" id="cons" placeholder="Be clear and concise">
        </textarea>
      </div>
    </section>

    <section className="scoreSection">
      <h3 className="scoreSection__heading">Score</h3>
      <div className="scoreSection__category">

        <h4>Visual</h4>
        <div className="createReviewForm__block">
          <label htmlFor="visualScore">Score</label>
          <input type="text" name="visualScore" id="visualScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label htmlFor="visualSummary">Summary</label>
          <textarea name="visualSummary" id="visualSummary" placeholder="Be clear and concise">
          </textarea>
        </div>
      </div>

      <div className="scoreSection__category">
        <h4>Audio</h4>
        <div className="createReviewForm__block">
          <label htmlFor="audioScore">Score</label>
          <input type="text" name="audioScore" id="audioScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label htmlFor="audioSummary">Summary</label>
          <textarea name="audioSummary" id="audioSummary" placeholder="Be clear and concise">
          </textarea>
        </div>
      </div>

      <div className="scoreSection__category">
        <h4>Gameplay</h4>
        <div className="createReviewForm__block">
          <label htmlFor="gameplayScore">Score</label>
          <input type="text" name="gameplayScore" id="gameplayScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label htmlFor="gameplaySummary">Summary</label>
          <textarea name="gameplaySummary" id="gameplaySummary" placeholder="Be clear and concise">
          </textarea>
        </div>
      </div>

      <div className="scoreSection__category">
        <h4>Quality</h4>
        <div className="createReviewForm__block">
          <label htmlFor="qualityScore">Score</label>
          <input type="text" name="qualityScore" id="qualityScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label htmlFor="qualitySummary">Summary</label>
          <textarea name="qualitySummary" id="qualitySummary" placeholder="Be clear and concise">
          </textarea>
        </div>
      </div>

      <div className="scoreSection__category">
        <h4>Experience</h4>
        <div className="createReviewForm__block">
          <label htmlFor="experienceScore">Score</label>
          <input type="text" name="experienceScore" id="experienceScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label htmlFor="experienceSummary">Summary</label>
          <textarea name="experienceSummary" id="experienceSummary"placeholder="Be clear and concise" >
          </textarea>
        </div>
      </div>

    </section>

    <div>
      <button type="submit">Post review</button>
    </div>
  </form>
)

export default AdminCreateReviewForm;
