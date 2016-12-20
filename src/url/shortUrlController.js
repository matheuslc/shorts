import config from '../../resource/config/enviroment';

/**
 * Class ShortUrlController
 */
export default class ShortUrlController {
  constructor(ShortUrlRepository) {
    this.ShortUrlRepository = ShortUrlRepository;
  }

  /**
   * @name createShortUrl
   * @param req {Object} Request Object
   * @param res {Object} Response Object
   */
  createShortUrl(req, res) {
    const ShortUrl = this.ShortUrlRepository.createShortUrl(req.query.url);

    this.ShortUrlRepository.persist(ShortUrl).then(response => {
      return res.json(this.ShortUrlRepository.dataTransferObject(response));
    }).catch(err => {
      if (err.code === 11000) {
        this.createShortUrl(req, res);

        return false;
      }

      return res.json(err);
    });
  }

  /**
   * @name getShortUrl
   * @param req {Object} Request Object
   * @param res {Object} Response Object
   */
  getShortUrl(req, res) {
    this.ShortUrlRepository.getShortUrlById(req.params.shortUrlId).then(response => {
      return res.redirect(301, `${config.baseShortUrl}/${response.shortUrl}`);
    }).catch(err => {
      res.json(err);
    });
  }

  /**
   * @name deleteShortUrl
   * @param req {Object} Request Object
   * @param res {Object} Response Object
   */
  deleteShortUrl(req, res) {
    this.ShortUrlRepository.deleteShortUrl(req.params.shortUrlId).then(() => {
      return res.status(204).json({
        code: 204,
        message: 'Deleted'
      });
    });
  }
}
