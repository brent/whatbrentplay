import React from 'react';
import { Link } from 'react-router-dom';

import ReviewModel from '../Models/Review';

import AdminPostsTable from './AdminPostsTable';

import '../css/adminIndex.css';

class AdminIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      reviews: [ ],
    };
  }

  componentDidMount() {
    ReviewModel.getAll()
      .then((reviews) => {
        this.setState({
          reviews: reviews,
        });
      });
  }

  displayDate = (date) => {
    const dateObj = new Date(date);

    const month = dateObj.getMonth() + 1;
    const day   = dateObj.getDate();
    const year  = dateObj.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  generateSlug = (gameName) => {
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

  handleSubmit = (review, e) => {
    e.preventDefault();
    console.log('review', review);
    console.log('reviews', this.state.reviews);

    /*
    this.getReviewIndex(review, this.state.reviews)
      .then((reviewIndex) => {
        return reviewIndex;
      })
      .then((index) => {
        ReviewModel.update(this.state.reviews[index]);
      })
      .catch(() => {
        console.log('catchin\'');
      });
    */
  }

  // This doesn't work with new reviews for some reason
  getReviewIndex = (review, arr) => {
    return new Promise((resolve, reject) => {
      arr.findIndex((el, i, arr) => {
        if (review.slug === el.slug) {
          resolve(i);
        } else {
          reject(undefined);
        }
      });
    });
  }

  getIndexForCategory = (categoryName) => {
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

  addReviewToReviewsArray = (review) => {
    console.log('test');
    this.getReviewIndex(review, this.state.reviews)
      .then(() => {
        console.log('in reviews array');
      })
      .catch(() => {
        const r = ReviewModel.build(review);
        this.state.reviews.push(ReviewModel.new(r));
        console.log(this.state.reviews);
      });
  }

  handleGameNameChangeForReview = (review, e) => {
    this.handleSummaryChangeForReview(review, e);
  }

  handleSummaryChangeForReview = (review, e) => {
    const [ key, val ] = e.target.name.split('.');
    const newVal = e.target.value;

    this.getReviewIndex(review, this.state.reviews)
      .then((index) => {
        this.state.reviews[index][key][val] = newVal;
      })
      .catch(() => {
        console.log('summaryChangeCatch', review, this.state.reviews);
      });
  }

  handleRatingChangeForReview = (review, e) => {
    const [ key, val ] = e.target.name.split('.');
    const newVal = e.target.value;

    this.getReviewIndex(review, this.state.reviews)
      .then(reviewIndex => {
        const categoryIndex = this.getIndexForCategory(key);
        this.state.reviews[reviewIndex]['rating'][categoryIndex][val] = newVal;
      })
      .catch(() => {
        this.state.reviews.push(review);
      });
  }

  handleDraftChangeForReview = (review, e) => {
    const key = e.target.name;

    this.getReviewIndex(review, this.state.reviews)
      .then(reviewIndex => {
        this.state.reviews[reviewIndex][key] = !this.state.reviews[reviewIndex][key];
      })
      .catch(() => {
        this.state.reviews.push(review);
      });
  }

  render() {
    return(
      <div>
        <div className="reviewsHeader">
          <h2>Reviews ({ this.state.reviews.length })</h2>
          <Link to={{
            pathname: '/admin/review/new',
            handleSubmit: this.handleSubmit,
            handleGameNameChangeForReview: this.handleGameNameChangeForReview,
            handleSummaryChange: this.handleSummaryChangeForReview,
            handleRatingChange: this.handleRatingChangeForReview,
            handleDraftChange: this.handleDraftChangeForReview,
            addReviewToReviewsArray: this.addReviewToReviewsArray
          }} className='newCta'>+ review</Link>
        </div>

        <AdminPostsTable 
          posts={ this.state.reviews }
          handleSubmit = { this.handleSubmit }
          handleGameNameChangeForReview = { this.handleGameNameChangeForReview  }
          handleSummaryChange = { this.handleSummaryChangeForReview }
          handleRatingChange = { this.handleRatingChangeForReview }
          handleDraftChange = { this.handleDraftChangeForReview }
          displayDate = { this.displayDate }
          addReviewToReviewsArray = { this.addReviewToReviewsArray }
          className='posts-table'
        />
      </div>
    )
  }
}

export default AdminIndex;
