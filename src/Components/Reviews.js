import React, {
  useState,
  useEffect,
} from 'react';
import ReviewModel from '../Models/Review';
import GameTile from './GameTile';
import '../css/reviews.css';
import { useSearchParams } from 'react-router-dom';
import Review from '../Models/Review';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [groupedReviews, setGroupedReviews] = useState(null)
  const [sort, setSort] = useState('date-desc')
  const [searchParams, setSearchParams] = useSearchParams()

  const sortReviewsByDate = (reviews) => (
    [...reviews].sort((a, b) => {
      return b.createdAt - a.createdAt
    })
  )

  const sortReviewsByScore = (reviews) => (
    [...reviews].sort((a,b) => {
      return b.rating[5].totalScore - a.rating[5].totalScore
    })
  )

  const sortReviewsByScoreGroups = (reviews) => {
    const reviewsMap = new Map()

    reviews.forEach((review) => {
      if (reviewsMap.has(review.rating[5].totalScore)) {
        let existing = reviewsMap.get(review.rating[5].totalScore)
        existing.push(review)
        reviewsMap.set(review.rating[5].totalScore, existing)
      } else {
        reviewsMap.set(review.rating[5].totalScore, [review])
      }
    })

    const sortedKeys = Array.from(reviewsMap.keys()).sort((a,b) => b - a)
    const sortedMap = new Map()
    sortedKeys.forEach((key) => {
      sortedMap.set(key, reviewsMap.get(key))
    })

    return sortedMap
  }

  const handleSortBtnPress = (sort) => {
    setSort(sort)
    if (sort==='date-desc') setSearchParams({ sort: 'date-desc' })
    if (sort==='score-desc') setSearchParams({ sort: 'score-desc' })
  }

  useEffect(() => {
    if (reviews === null) {
      const getReviews = async () => {
        const reviews = await ReviewModel.getAllLive();
        setReviews(sortReviewsByDate(reviews));
        setGroupedReviews(sortReviewsByScoreGroups(reviews));
        setSort(searchParams.get('sort') || 'date-desc')
      }

      getReviews()
        .catch(console.error);
    }
  }, [reviews]);

  useEffect(() => {
    if (reviews) {
      if (searchParams === 'date-desc') sort = 'date-desc'
      if (searchParams === 'score-desc') sort = 'score-desc'
    }
  }, [searchParams])

  return (
    <>
      { reviews
        ? (
          <>
            <SortSelector
              onClick={handleSortBtnPress}
              defaultSelect={sort}
            />
            <ReviewsDisplay
              reviews={reviews}
              groupedReviews={groupedReviews}
              sort={sort}
            />
          </>
        )
        : null
      }
    </>
  )
}

const ReviewsDisplay = ({ reviews, groupedReviews , sort}) => {
  const renderReviews = (reviews, groupedReviews, sort) => {
    if (sort==='date-desc') {
      return <ReviewsGrid reviews={reviews} />
    }

    if (sort==='score-desc') {
      console.log('groupedReviews', groupedReviews)
      return <ReviewsList reviews={groupedReviews} />
    }
  }

  return renderReviews(reviews, groupedReviews, sort)
}

const ReviewsGrid = ({ reviews }) => (
  <ol className='reviews reviews-grid'>
    { reviews.map((review) => (
      <li key={review.id} className='gameTile'>
        <GameTile review={review} />
      </li>
    ))}
  </ol>
)

const ReviewsList = ({ reviews }) => {
  const renderSections = (reviews) => {
    return (
      <>
        { [...reviews].map((entry) => (
          <li key={entry[0]} className='scoreGroup'>
            <div className='scoreGroupHeader'>
              <h2 className='scoreLabel'>
                <span className="scoreBigNum">{entry[0]}</span>
                <span className="scoreSmallNum">/ 25</span>
              </h2>
              <p className="scoreGroupTotal">{entry[1].length} game{entry[1].length > 1 ? 's' : null}</p>
            </div>
            <ol className='scoreGroupReviews'>
              {renderListSection(entry[1])}
            </ol>
          </li>
        ))}
      </>
    )
  }

  const renderListSection = (reviews) => {
    return (
      <>
        { reviews.map((review) => (
          <li key={review.id} className='gameTile'>
            <GameTile review={review} />
          </li>
        ))}
      </>
    )
  }

  return (
    <ol className='reviews reviews-list'>
      { renderSections(reviews) }
    </ol>
  )
}

const SortBtn = ({ label, onClick, isActive}) => {
  return (
    <button
      className={`sortBtn ${isActive ? 'active' : null}`}
      type='button'
      onClick={() => onClick()}
    >{label}</button>
  )
}

const SortSelector = ({ onClick, defaultSelect='date-desc' }) => {
  const [activeBtn, setActiveBtn] = useState(defaultSelect)

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