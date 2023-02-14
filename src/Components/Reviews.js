import React, {
  useState,
  useEffect,
} from 'react';
import ReviewModel from '../Models/Review';
import GameTile from './GameTile';
import '../css/reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await ReviewModel.getAllLive();
      setReviews(reviews);
    }

    getReviews()
      .catch(console.error);
  }, []);

  return (
    <ul className="gameTiles">
      { reviews
        ? reviews.map((review) => (
            <li key={review.id} className="gameTile">
              <GameTile review={review} />
            </li>
          ))
        : null
      }
    </ul>
  )
}

export default Reviews;
