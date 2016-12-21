import config from '../../resource/config/enviroment';
import UrlSchema from '../schemas/urlSchema';
import Shortener from './shortener';

export default class ShortUrlService {
  /**
   * @name createShortUrl
   * @param url {String}
   * @return {Promise} Created new Short URL and return a ShortURL schema
   */
  createShortUrl(url) {
    const randomUrl = new Shortener(config.dictionary, config.shortUrlSize).getRandomUrl();

    return new UrlSchema({
      url,
      shortUrl: randomUrl,
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
