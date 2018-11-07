import React, { Component } from 'react';
import ReviewModel from '../Models/Review';
import Review from './Review';

class ReviewDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { };
    this.slug = props.match.params.slug;
  }

  componentDidMount() {
    ReviewModel
      .getOneBySlug(this.slug)
      .then((review) => {
        this.setState({
          review: review,
        });
      });
  }

  render() {

    const review = this.state.review
                     ? <Review review={ this.state.review } />
                     : null;

    return <div>{ review }</div>;
  }
}

export default ReviewDetail;