import React from 'react';
import { Link } from 'react-router-dom';

import ReviewModel from '../Models/Review';

import AdminPostsTable from './AdminPostsTable';

import '../css/adminIndex.css';

class AdminIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isLoading: true,
      reviews: [ ],
    };
  }

  componentDidMount() {
    ReviewModel.getAll()
      .then((reviews) => {
        this.setState({
          isLoading: false,
          reviews: reviews,
        });
      });
  }

  render() {
    return(
      <div>
        <div className="reviewsHeader">
          <h2>Reviews ({ this.state.reviews.length })</h2>
          <Link to={ '/admin/review/new' } 
            className='newCta'
          >+ review</Link>
        </div>

        {
          this.state.isLoading
            ? <h3>LOADING...</h3>
            : <AdminPostsTable 
              reviews={ this.state.reviews }
              className='posts-table'
            />
        }
      </div>
    )
  }
}

export default AdminIndex;
