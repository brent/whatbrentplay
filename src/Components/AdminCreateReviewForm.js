import React from 'react';

const AdminCreateReviewForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      <label for="gameName">Game name</label>
      <input type="text" name="gameName" id="gameName" />
    </div>

    <div>
      <label for="coverImgUrl">Cover image url</label>
      <input type="text" name="coverImgUrl" id="coverImgUrl" />
    </div>

    <div>
      <label for="platforms">Platforms</label>
      <input type="text" name="platforms" id="platforms" />
    </div>

    <div>
      <label for="summary">Summary</label>
      <textarea type="text" name="summary" id="summary">
      </textarea>
    </div>

    <div>
      <h3>Ratings</h3>
      <div>

        <h4>Visuals</h4>
        <div>
          <label for="visualsScore">visualsScore</label>
          <input type="text" name="visualsScore" id="visualsScore" />
        </div>
        <div>
          <label for="visualsSummary">visualsSummary</label>
          <textarea name="visualsSummary" id="visualsSummary">
          </textarea>
        </div>
      </div>

      <div>
        <h4>Sound</h4>
        <div>
          <label for="soundScore">soundScore</label>
          <input type="text" name="soundScore" id="soundScore" />
        </div>
        <div>
          <label for="soundSummary">soundSummary</label>
          <textarea name="soundSummary" id="soundSummary">
          </textarea>
        </div>
      </div>

      <div>
        <h4>Quality</h4>
        <div>
          <label for="qualityScore">qualityScore</label>
          <input type="text" name="qualityScore" id="qualityScore" />
        </div>
        <div>
          <label for="qualitySummary">qualitySummary</label>
          <textarea name="qualitySummary" id="qualitySummary">
          </textarea>
        </div>
      </div>

      <div>
        <h4>Gameplay</h4>
        <div>
          <label for="gameplayScore">gameplayScore</label>
          <input type="text" name="gameplayScore" id="gameplayScore" />
        </div>
        <div>
          <label for="gameplaySummary">gameplaySummary</label>
          <textarea name="gameplaySummary" id="gameplaySummary">
          </textarea>
        </div>
      </div>

      <div>
        <h4>experience</h4>
        <div>
          <label for="experienceScore">experienceScore</label>
          <input type="text" name="experienceScore" id="experienceScore" />
        </div>
        <div>
          <label for="experienceSummary">experienceSummary</label>
          <textarea name="experienceSummary" id="experienceSummary">
          </textarea>
        </div>
      </div>

    </div>

    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
)

export default AdminCreateReviewForm;
