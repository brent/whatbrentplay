import React, { useEffect, useState } from 'react';
import ReviewModel from '../Models/Review';
import Review from './Review';
import { useParams } from 'react-router-dom';
import '../css/reviewDetail.css';

const ReviewDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      const reviewData = await ReviewModel.getOneBySlug(slug);
      setData(reviewData);
    }

    fetchReviewData()
      .catch(console.error);

  }, [])

  return (
    <>
      { data
        ? <Review review={data} />
        : null
      }
    </>
  )
}

export default ReviewDetail;
