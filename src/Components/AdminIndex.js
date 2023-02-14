import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import ReviewModel from '../Models/Review';

import AdminPostsTable from './AdminPostsTable';

import '../css/adminIndex.css';

const AdminIndex = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState(null);
  const { state } = useLocation();

  const loggedIn = state ? state.isLoggedIn : isLoggedIn;

  useEffect(() => {
    const getReviewsData = async () => {
      const reviewsData = await ReviewModel.getAll();
      setReviews(reviewsData);
    }

    getReviewsData()
      .then(() => setIsLoading(false))
      .catch(console.error);

  }, []);

  console.log('loggedIn', loggedIn);
  console.log('reviews', reviews);

  const ReviewsHeader = () => (
    <div className='reviewsHeader'>
      <h2>Reviews ({ reviews.length })</h2>
      <Link
        to='/admin/review/new'
        state={{ isLoggedIn: loggedIn }}
        className='newCta'
      >+ review</Link>
    </div>
  );

  return (
    <>
      {
        !loggedIn
          ? navigate('/admin')
          : null
      }
      {
        isLoading
          ? <h3>LOADING...</h3>
          : <>
              <ReviewsHeader />
              <AdminPostsTable
                reviews={reviews}
                isLoggedIn={loggedIn}
                className='posts-table'
              />
            </>
      }
    </>
  );
}

export default AdminIndex;
