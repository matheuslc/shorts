import UrlSchema from '../schemas/urlSchema';

export default class ShortUrlService {
  constructor(Shortener) {
    this.Shortener = Shortener;
  }

  /**
   * @name createShortUrl
   * @param url {String}
   * @return {Promise} Created new Short URL and return a ShortURL schema
   */
  createShortUrl(url) {
    return new UrlSchema({
      url,
      shortUrl: this.Shortener.getRandomUrl(),
      hits: {
        count: 0
      }
    });
  }

  /**
   * @name deleteShortUrl
   * @param {int} shortUrlId
   * @return {Promise} Delete an Short URL and returns a promise
   */
  deleteShortUrl(shortUrlId) {
    return UrlSchema.remove({
      shortUrl: shortUrlId
    });
  }
}
