import { db } from '../firebase';

class Review {
  constructor(reviewData) {
    let id;
    let createdAt;

    if (reviewData.id != null) {
      id = reviewData.id;
      reviewData = reviewData.data();
    } else {
      id = null;
    }

    createdAt = reviewData.createdAt
                ? reviewData.createdAt
                : Date.now();

    this.id         = id;
    this.game       = reviewData.game;
    this.rating     = reviewData.rating;
    this.summary    = reviewData.summary;
    this.createdAt  = createdAt;
    this.slug       = reviewData.slug;
    this.isDraft    = reviewData.isDraft;
  }

  static _getReviews(querySnapshot) {
    let docs = [];

    querySnapshot.forEach((doc) => {
      let review = new Review(doc);
      docs.push(review);
    });

    return docs;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.collection('reviews')
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
          return this._getReviews(querySnapshot);
        }).then((reviews) => {
          resolve(reviews);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  static getAllLive() {
    return new Promise((resolve, reject) => {
      db.collection('reviews')
        .where('isDraft', '==', false)
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
          return this._getReviews(querySnapshot);
        }).then((reviews) => {
          resolve(reviews);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  static getOneBySlug(slug) {
    return new Promise((resolve, reject) => {
      db.collection('reviews')
        .where("slug", "==", slug)
        .get()
        .then((querySnapshot) => {
          const reviews = this._getReviews(querySnapshot);
          return reviews;
        })
        .then((reviews) => {
          const review = reviews[0];
          return review;
        })
        .then((review) => {
          resolve(review);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  static create(jsonData) {
    return new Promise((resolve, reject) => {
      db.collection('reviews')
        .add({
          ...jsonData,
        }).then((doc) => {
          resolve(doc);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  static update(doc) {
    return new Promise((resolve, reject) => {
      db.collection('reviews')
        .doc(doc.id)
        .set({
          ...doc,
        })
        .then((doc) => resolve(doc))
        .catch((err) => reject(err));
    });
  }

  static delete(doc) {
    return new Promise((resolve, reject) => {
      db.collection('reviews')
        .doc(doc.id)
        .delete()
        .then(() => resolve(true))
        .catch((err) => reject(err));

    });
  }

  static build(reviewData) {
    const platforms = [reviewData.game.platforms];
    const visualScore     = parseInt(reviewData['rating'][0]['score'], 10),
          audioScore      = parseInt(reviewData['rating'][1]['score'], 10),
          gameplayScore   = parseInt(reviewData['rating'][2]['score'], 10),
          qualityScore    = parseInt(reviewData['rating'][3]['score'], 10),
          experienceScore = parseInt(reviewData['rating'][4]['score'], 10);

    const totalScore = (() => {
      let totalScore = 0;

      totalScore += visualScore;
      totalScore += audioScore;
      totalScore += gameplayScore;
      totalScore += qualityScore;
      totalScore += experienceScore;

      return totalScore;
    })();

    let review = {
      isDraft: reviewData.isDraft,
      slug: reviewData.slug,
      createdAt: Date.now(),
      game: {
        name: reviewData.game.name,
        cover_url: reviewData.game.cover_url,
        platforms: platforms,
      },
      summary: {
        blurb: reviewData.summary.blurb,
        pros:  reviewData.summary.pros,
        cons:  reviewData.summary.cons,
      },
      rating: [
        {
          category: "visual",
          score: visualScore,
          summary: reviewData['rating'][0]['summary'],
        },
        {
          category: "audio",
          score: audioScore,
          summary: reviewData['rating'][1]['summary'],
        },
        {
          category: "gameplay",
          score: gameplayScore,
          summary: reviewData['rating'][2]['summary'],
        },
        {
          category: "quality",
          score: qualityScore,
          summary: reviewData['rating'][3]['summary'],
        },
        {
          category: "experience",
          score: experienceScore,
          summary: reviewData['rating'][4]['summary'],
        },
        { 
          totalScore: totalScore,
        },
      ],
    }

    return review;
  }

  /*
  save() {
  }

  update() {
  }

  delete() {
  }
  */
}

export default Review;
