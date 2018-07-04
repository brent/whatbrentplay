import React, { Component } from 'react';
import './App.css';
import { db } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { reviews: [] };
  }

  componentDidMount() {
    db.collection('reviews')
      .get()
      .then((querySnapshot) => {
        let docs = [];

        querySnapshot.forEach((doc) => {
          let docData = doc.data();
          docData["id"] = doc.id;

          docs.push(docData);
        });

        return docs;
      }).then((docs) => {
        this.setState({
          reviews: docs
        });
      });
  }

  render() {
    const reviews = this.state.reviews.map((review) => 
      <li key={review.id}>
        <h2>{review.game.name}</h2>
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
