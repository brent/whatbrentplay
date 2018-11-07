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

  displayDate(date) {
    const dateObj = new Date(date);

    const month = dateObj.getMonth() + 1;
    const day   = dateObj.getDate();
    const year  = dateObj.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  // MAKE THE EVENT HANDLERS BELOW WORK
  // THEY'VE BEEN TRANSPLANTED FROM TWO DIFFERENT
  // COMPONENTS (Admin, AdminCreateReviewForm)

  // from Admin
  handleAdminCreateReviewFormSubmit = (e) => {
    e.preventDefault();

    console.log('uh... hello?');
    console.log(e.target);
    let form = e.target;
    let data = new FormData(form);
    console.log(data.get('game.name'));
    //let review = Review.build(e.target);

    /*
    Review.getOneBySlug(review.slug)
      .then(() => {
        Review.update(review)
          .then((result) => console.log(result));
      })
      .catch(() => {
        console.log('review not found in db');
      });
    Review.create(review)
      .then((doc) => {
        console.log('saved doc: ', doc);
        this.displayPostFeedback(true);
      }).catch((err) => {
        console.log(err);
        this.displayPostFeedback(false);
      }).finally(() => {
        this.displayPostFeedback(false);
      });
    */
  }

  // from AdminCreateReviewForm
  handleChange = (e) => {
    const parts = e.target.name.split(".");
    const newVal = e.target.value;

    if (parts.length > 1) {
      this.setState((prevState, props) => ({
        review: {
          ...prevState.review,
          [parts[0]]: {
            ...prevState.review[parts[0]],
            [parts[1]]: newVal,
          },
        },
      }), () => { console.log(this.state) });
    } else {
      this.setState((prevState, props) => ({
        review: {
          ...prevState.review,
          [parts[0]]: newVal,
        },
      }), () => { console.log(this.state) });
    }
  }

  render() {
    return(
      <div>
        <h2>Reviews</h2>
        <ul>
          {
            this.state.reviews.map((review) => (
              <li key={ review.id }>
                <Link to={{ 
                  pathname: `/admin/review/${review.slug}`,
                  state: { review: review },
                  handleSubmit: this.props.handleSubmit
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
