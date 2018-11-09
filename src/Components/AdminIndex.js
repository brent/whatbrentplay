import React from 'react';
import { Link } from 'react-router-dom';

import ReviewModel from '../Models/Review';
import Review from './Review';

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

    if (typeof review.slug == 'undefined') {
      review['slug'] = this.generateSlug(review.game.name);

      const r = ReviewModel.build(review);
      ReviewModel.create(r);
    } else {
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
    }
  }

  getReviewIndex = (review, arr) => {
    return new Promise(resolve => {
      arr.findIndex((el, i) => {
        if (el.id == review.id) {
          resolve(i);
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

  handleSummaryChangeForReview = (review, e) => {
    const [ key, val ] = e.target.name.split('.');
    const newVal = e.target.value;

    this.getReviewIndex(review, this.state.reviews)
      .then((index) => {
        this.state.reviews[index][key][val] = newVal;
      });
  }

  handleRatingChangeForReview = (review, e) => {
    const [ key, val ] = e.target.name.split('.');
    const newVal = e.target.value;

    this.getReviewIndex(review, this.state.reviews)
      .then(reviewIndex => {
        const categoryIndex = this.getIndexForCategory(key);
        this.state.reviews[reviewIndex]['rating'][categoryIndex][val] = newVal;
      });
  }

  render() {
    return(
      <div>
        <h2>Reviews</h2>
        <Link to={{
          pathname: '/admin/review/new',
          handleSubmit: this.handleSubmit,
          handleSummaryChange: this.handleSummaryChangeForReview,
          handleRatingChange: this.handleRatingChangeForReview
        }} className='newCta'>New review</Link>
        <ul>
          {
            this.state.reviews.map((review) => (
              <li key={ review.id }>
                <Link to={{ 
                  pathname: `/admin/review/${review.slug}`,
                  state: { review: review },
                  handleSubmit: this.handleSubmit,
                  handleSummaryChange: this.handleSummaryChangeForReview,
                  handleRatingChange: this.handleRatingChangeForReview
                }}>{ review.game.name }</Link>
                <p>{ review.rating[review.rating.length - 1].totalScore }</p>
                <p>{ this.displayDate(review.createdAt) }</p>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default AdminIndex;
