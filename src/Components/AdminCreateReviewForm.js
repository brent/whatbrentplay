import React from 'react';

import '../css/adminCreateReviewForm.css';

const AdminCreateReviewForm = (props) => (
  <form className="createReviewForm" onSubmit={props.onSubmit}>
    <section className="gameMeta">
      <h3>Info</h3>
      <div className="createReviewForm__block">
        <label for="gameName">Game name</label>
        <input type="text" name="gameName" id="gameName" placeholder="Lorem Ipsum: Sit Dolor Amet III" />
      </div>

      <div className="createReviewForm__block">
        <label for="coverImgUrl">Cover image url</label>
        <input type="text" name="coverImgUrl" id="coverImgUrl" placeholder="http://placehold.it/320x396" />
      </div>

      <div className="createReviewForm__block">
        <label for="platforms">Platforms</label>
        <input type="text" name="platforms" id="platforms" placeholder="PlayStation 4" />
      </div>

      <div className="createReviewForm__block">
        <label for="summary">Summary</label>
        <textarea type="text" name="summary" id="summary" placeholder="Be clear and concise">
        </textarea>
      </div>
    </section>

    <section className="scoreSection">
      <h3 className="scoreSection__heading">Score</h3>
      <div className="scoreSection__category">

        <h4>Visual</h4>
        <div className="createReviewForm__block">
          <label for="visualScore">Score</label>
          <input type="text" name="visualScore" id="visualScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label for="visualSummary">Summary</label>
          <textarea name="visualSummary" id="visualSummary" placeholder="Be clear and concise">
          </textarea>
        </div>
      </div>

      <div className="scoreSection__category">
        <h4>Audio</h4>
        <div className="createReviewForm__block">
          <label for="audioScore">Score</label>
          <input type="text" name="audioScore" id="audioScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label for="audioSummary">Summary</label>
          <textarea name="audioSummary" id="audioSummary" placeholder="Be clear and concise">
          </textarea>
        </div>
      </div>

      <div className="scoreSection__category">
        <h4>Quality</h4>
        <div className="createReviewForm__block">
          <label for="qualityScore">Score</label>
          <input type="text" name="qualityScore" id="qualityScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label for="qualitySummary">Summary</label>
          <textarea name="qualitySummary" id="qualitySummary" placeholder="Be clear and concise">
          </textarea>
        </div>
      </div>

      <div className="scoreSection__category">
        <h4>Gameplay</h4>
        <div className="createReviewForm__block">
          <label for="gameplayScore">Score</label>
          <input type="text" name="gameplayScore" id="gameplayScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label for="gameplaySummary">Summary</label>
          <textarea name="gameplaySummary" id="gameplaySummary" placeholder="Be clear and concise">
          </textarea>
        </div>
      </div>

      <div className="scoreSection__category">
        <h4>experience</h4>
        <div className="createReviewForm__block">
          <label for="experienceScore">Score</label>
          <input type="text" name="experienceScore" id="experienceScore" placeholder="5" />
        </div>
        <div className="createReviewForm__block">
          <label for="experienceSummary">Summary</label>
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
