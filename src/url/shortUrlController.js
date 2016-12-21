import validUrl from 'valid-url';

/**
 * Class ShortUrlController
 */
export default class ShortUrlController {
  constructor(ShortUrlRepository, ShortUrlService) {
    this.ShortUrlRepository = ShortUrlRepository;
    this.ShortUrlService = ShortUrlService;
  }

  /**
   * @name createShortUrl
   * @param req {Object} Request Object
   * @param res {Object} Response Object
   */
  createShortUrl(req, res) {
    if (!req.body.url) {
      throw new Error(
        'URL is not defined. You must pass a URL.' + 
        'A valid URL should start with http(s) and ends with a .'
      );
    }

    if (!validUrl.isWebUri(req.body.url)) {
      throw new Error('Please send a valid URL');
    }

    const ShortUrl = this.ShortUrlService.createShortUrl(req.body.url);

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
    const referer = req.get('Referer');

    this.ShortUrlRepository.getShortUrlById(req.params.shortUrlId, referer).then(response => {
      return res.redirect(301, response.url);
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
    this.ShortUrlService.deleteShortUrl(req.params.shortUrlId).then(() => {
      return res.status(204).json({
        code: 204,
        message: 'Deleted'
      });
    });
  }
}
