import React, { Component } from 'react';
import './App.css';
import Review from './Models/Review';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { reviews: [] };
  }

  componentDidMount() {
    Review.getAll()
      .then((reviews) => {
        this.setState({
          reviews: reviews
        });
      });
  }

  render() {
    const reviews = this.state.reviews.map((review) => 
      <li key={review.id}>
        <h2>{review.game.name}</h2>
        <h3>{review.rating.totalScore}</h3>
        <p>{review.summary}</p>
      </li>
    );

    return (
      <div className="App">
        <h1>byte sized reviews</h1>
        <ul>
          {reviews}
        </ul>
      </div>
    );
  }
}

export default App;
