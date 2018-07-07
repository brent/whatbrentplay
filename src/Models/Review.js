import { db } from '../firebase';

class Review {
  constructor(firebaseDoc) {
    const id = firebaseDoc.id;
    const reviewData = firebaseDoc.data();

    this.id = id;
    this.game = reviewData.game;
    this.rating = reviewData.rating;
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

  static build(formData) {
    const platforms = (() => {
      return formData.platforms.value.split(" ");
    })();

    const visualsScore = parseInt(formData.visualsScore.value, 10),
          soundScore = parseInt(formData.soundScore.value, 10),
          qualityScore = parseInt(formData.qualityScore.value, 10),
          gameplayScore = parseInt(formData.gameplayScore.value, 10),
          experienceScore = parseInt(formData.experienceScore.value, 10);

    const totalScore = (() => {
      let totalScore = 0;

      totalScore += visualsScore;
      totalScore += soundScore;
      totalScore += qualityScore;
      totalScore += gameplayScore;
      totalScore += experienceScore;

      return totalScore;
    })();

    let review = {
      game: {
        name: formData.gameName.value,
        cover_url: formData.coverImgUrl.value,
        platforms: platforms,
      },
      summary: formData.summary.value,
      rating: {
        totalScore: totalScore,
        visuals: {
          score: visualsScore,
          summary: formData.visualsSummary.value,
        },
        sound: {
          score: soundScore,
          summary: formData.soundSummary.value,
        },
        quality: {
          score: qualityScore,
          summary: formData.qualitySummary.value,
        },
        gameplay: {
          score: gameplayScore,
          summary: formData.gameplaySummary.value,
        },
        experience: {
          score: experienceScore,
          summary: formData.experienceSummary.value,
        },
      },
    }

    return review;
  }

  save() {
  }

  update() {
  }

  delete() {
  }
}

export default Review;
