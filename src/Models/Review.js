import { db } from '../firebase';

class Review {
  constructor(firebaseDoc) {
    const id = firebaseDoc.id;
    const reviewData = firebaseDoc.data();

    this.id = id;
    this.game = reviewData.game;
    this.rating = reviewData.rating;
    this.rating.totalScore = (() => {
      let totalScore = 0;

      for (let category in reviewData["rating"]) {
        totalScore += reviewData["rating"][category]["score"];
      }

      return totalScore;
    })();
    this.summary = reviewData.summary;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.collection('reviews')
        .get()
        .then((querySnapshot) => {
          let reviews = [];

          querySnapshot.forEach((doc) => {
            let review = new Review(doc);
            reviews.push(review);
          });

          return reviews;
        }).then((reviews) => {
          resolve(reviews);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  static getOne(id) {
    return new Promise((resolve, reject) => {
      db.collection('reviews')
        .doc(id)
        .get()
        .then((doc) => {
          return new Review(doc);
        }).then((review) => {
          resolve(review);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  save() {
  }

  update() {
  }

  delete() {
  }
}

export default Review;
