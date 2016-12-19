import config from '../../resource/config/enviroment';

/**
 * Class ShortUrlController
 */
export default class ShortUrlController {
  constructor(ShortUrlRepository, UserRepository) {
    this.ShortUrlRepository = ShortUrlRepository;
    this.UserRepository = UserRepository;
  }

  /**
   * @name createShortUrl
   * @param req {Object} Request Object
   * @param res {Object} Response Object
   */
  createShortUrl(req, res) {
    this.UserRepository.getUserById(req.params.userId).then(User => {
      this.checkIfUrlAlreadyExistsAndPersist(req, res, User);
    });
  }

  /**
   * @name checkIfUrlAlreadyExistsAndPersist
   * @param req {Object} Request Object
   * @param res {Object} Response Object
   * @param User {Object} User Schema
   */
  checkIfUrlAlreadyExistsAndPersist(req, res, User) {
    const ShortUrl = this.ShortUrlRepository.createShortUrl(User._id, req.query.url);

    this.ShortUrlRepository.persist(ShortUrl).then(response => {
      return res.json(this.ShortUrlRepository.dataTransferObject(response));
    }).catch(err => {
      if (err.code === 11000) {
        this.checkIfUrlAlreadyExistsAndPersist(req, res, User);

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
