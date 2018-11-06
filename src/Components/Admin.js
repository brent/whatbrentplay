import React, { Component } from 'react';

import Review from '../Models/Review';

import AdminIndex from './AdminIndex';
import AdminLogInForm from './AdminLogInForm';
import AdminCreateReviewForm from './AdminCreateReviewForm';
import AdminFeedbackBanner from './AdminFeedbackBanner';

import '../css/admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    }
  }

  handleAdminLogInSubmit = (e) => {
    e.preventDefault();

    if ((process.env.REACT_APP_ADMIN_USER === e.target.username.value) &&
      (process.env.REACT_APP_ADMIN_PASSWORD === e.target.password.value)) {
      this.setState({
        isLoggedIn: true,
      });

      e.target.reset();
    } else {
      alert("Credentials incorrect, try again");
    }
  }

  handleAdminCreateReviewFormSubmit = (e) => {
    e.preventDefault();

    console.log(e.target);
    /*
    let review = Review.build(e.target);

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

    // this should be in the above .then() block
    // figure out why it wasn't working there
    e.target.reset();
      */
  }

  displayPostFeedback = (success) => {
    this.setState({
      submitResult: {
        success: success,
      },
    });
  }

  render() {
    return(
      <div className="adminWrapper">
        {
          this.state.submitResult
            ? <AdminFeedbackBanner success={ this.state.submitResult.success } />
            : null
        }
        <h2 className="adminWrapper__heading">Admin</h2>
        {
          this.state.isLoggedIn 
            ? <AdminIndex 
                onSubmit={ this.handleAdminCreateReviewFormSubmit }
              />
            : <AdminLogInForm 
                onSubmit={ this.handleAdminLogInSubmit }
              /> 
        }
      </div>
    )
  }
}

export default Admin;
