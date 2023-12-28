import React, {
  useState,
  useEffect,
} from 'react';
import ReviewModel from '../Models/Review';
import GameTile from './GameTile';
import '../css/reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [sort, setSort] = useState('date-desc')

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await ReviewModel.getAllLive();
      setReviews(reviews);
    }

    getReviews()
      .catch(console.error);
  }, []);

  const handleSortBtnPress = (sort) => {
    setSort(sort)

    let sorted = []

    if (sort==='date-desc') {
      sorted = [...reviews].sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    }

    if (sort==='score-desc') {
      sorted = [...reviews].sort((a,b) => {
        return b.rating[5].totalScore - a.rating[5].totalScore
      })
    }

    setReviews(sorted)
  }

  return (
    <>
      { reviews
        ? (
          <>
            <SortSelector onClick={handleSortBtnPress}/>
            <ReviewsGrid reviews={reviews} />
          </>
        )
        : null
      }
    </>
  )
}

const ReviewsGrid = ({ reviews }) => (
  <ul className='reviews reviews-grid'>
    { reviews.map((review) => (
      <li key={review.id} className='gameTile'>
        <GameTile review={review} />
      </li>
    ))}
  </ul>
)

const SortBtn = ({ label, onClick, isActive}) => {
  return (
    <button
      className={`sortBtn ${isActive ? 'active' : null}`}
      type='button'
      onClick={() => onClick()}
    >{label}</button>
  )
}

const SortSelector = ({ onClick }) => {
  const [activeBtn, setActiveBtn] = useState('date-desc')

  return (
    <div className='sortSelector'>
      <span className='sortLabel'>sort:</span>
      <div className='sortBtns'>
        <SortBtn
          onClick={() => {
            onClick('date-desc')
            setActiveBtn('date-desc')
          }}
          label='recent'
          isActive={activeBtn==='date-desc'}
        />
        <SortBtn
          onClick={() => {
            onClick('score-desc')
            setActiveBtn('score-desc')
          }}
          label='score'
          isActive={activeBtn==='score-desc'}
        />
      </div>
    </div>
  )
}

export default Reviews;
