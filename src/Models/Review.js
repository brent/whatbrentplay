import { db } from '../firebase';

class Review {
  constructor(firebaseDoc) {
    const id = firebaseDoc.id;
    const reviewData = firebaseDoc.data();

    this.id = id;
    this.game = reviewData.game;
    this.rating = reviewData.rating;
    this.summary = reviewData.summary;
    this.createdAt = reviewData.createdAt;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.collection('reviews')
        .orderBy('createdAt', 'desc')
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
      let splitPlatformString = formData.platforms.value.split(",");
      let platformArray = [];

      splitPlatformString.forEach((platform) => {
        platformArray.push(platform.trim());
      });

      return platformArray;
    })();

    const visualScore = parseInt(formData.visualScore.value, 10),
          audioScore = parseInt(formData.audioScore.value, 10),
          gameplayScore = parseInt(formData.gameplayScore.value, 10),
          qualityScore = parseInt(formData.qualityScore.value, 10),
          experienceScore = parseInt(formData.experienceScore.value, 10);

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
      createdAt: Date.now(),
      game: {
        name: formData.gameName.value,
        cover_url: formData.coverImgUrl.value,
        platforms: platforms,
      },
      summary: {
        blurb: formData.blurb.value,
        pros:  formData.pros.value,
        cons:  formData.cons.value,
      },
      rating: [
        {
          category: "visual",
          score: visualScore,
          summary: formData.visualSummary.value,
        },
        {
          category: "audio",
          score: audioScore,
          summary: formData.audioSummary.value,
        },
        {
          category: "gameplay",
          score: gameplayScore,
          summary: formData.gameplaySummary.value,
        },
        {
          category: "quality",
          score: qualityScore,
          summary: formData.qualitySummary.value,
        },
        {
          category: "experience",
          score: experienceScore,
          summary: formData.experienceSummary.value,
        },
        { 
          totalScore: totalScore,
        },
      ],
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
