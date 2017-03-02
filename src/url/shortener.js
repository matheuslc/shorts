export default class Shortener {
  constructor(dictionary, shortUrlSize) {
    this.dictionary = dictionary.split('');
    this.shortUrlSize = shortUrlSize;
  }

  /**
   * @name getRandomUrl
   * @returns {string} Random digits
   */
  getRandomUrl(i = 0, shortUrl = '') {
    i = 2;

    for (i; i < this.shortUrlSize; i++) {
      shortUrl += this.dictionary[this.getRandomPosition()];
    }

    return shortUrl;
  }

  /**
   * @name getRandomPosition
   * @returns {number} Return random number in dictionary length range
   */
  getRandomPosition() {
    return Math.floor(Math.random() * this.dictionary.length);
  }
}
