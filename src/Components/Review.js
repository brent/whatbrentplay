import React from 'react';

const subcategories = {
  display: "none",
}

const handleClick = (event) => {
  const parent = event.target.parentNode;
  const subcategories = parent.querySelector('.subcategories');
  subcategories.style.cssText = 'display: block;';
  event.target.style.cssText = 'display: none;';
}

const renderSubcategories = (review) => {
  let categories = [];

  for (let category in review.rating) {
    if (category !== "totalScore") {
      categories.push(
        <li className="" key={category}>
          <p className="">{review.rating[category].score}/5</p>
          <h4>{category}</h4>
          <p>{review.rating[category].summary}</p>
        </li>
      )
    }
  }

  return categories.reverse();
}

const Review = ({ review }) => (
  <div>
    <div className="">
      <h2>{review.game.name}</h2>
      <h3>{review.game.platforms.join(", ")}</h3>
    </div>
    <div className="">
      <img src={review.game.cover_url} alt="{review.game.name} cover" />
    </div>
    <div className="">
      <h3>{review.rating.totalScore}/25</h3>
    </div>
    <div className="">
      <h4>Summary</h4>
      <p>{review.summary}</p>
    </div>
    <button className="" onClick={handleClick}>Full breakdown</button>
    <ul className="subcategories" style={ subcategories }>
      { renderSubcategories(review) }
    </ul>
  </div>
)

export default Review;
