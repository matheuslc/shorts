import config from '../../resource/config/enviroment';
import UrlSchema from '../schemas/urlSchema';
import Shortener from './shortener';

export default class ShortUrlRepository {
  /**
   * @name getShortUrlById
   * @param shortUrlId {int}
   * @return {Promise}
   */
  getShortUrlById(shortUrlId, referer) {
    return UrlSchema.findOneAndUpdate({
      shortUrl: shortUrlId
    }, {
      $inc: {'hits.count': 1},
      $set: {'hits.lastHit': new Date()},
      $push: {requests: referer}
    });
  }

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
   * @name persist
   * @param ShortUrl {Object} Short URL schema
   * @return {Promise} Persist a Short URL and returns a promise
   */
  persist(ShortUrl) {
    return ShortUrl.save();
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

  /**
   * @name dataTransferObject
   * @return {Object} Format response to be exposed
   */
  dataTransferObject(data) {
    return {
      id: data.id,
      url: data.url,
      shortUrl: `${data.shortUrl}`,
      hits: data.hits
    };
  }
}
