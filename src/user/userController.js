/**
 * Class UserController
 */
export default class UserController {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  /**
   * @name createUser
   * @param req {Object} Request object
   * @param res {Object} Response object
   */
  createUser(req, res) {
    const User = this.UserRepository.createUser(req.query.userId.toString());

    this.UserRepository.persist(User).then(response => {
      return res.json(this.UserRepository.dataTransferObject(response));
    }).catch(err => {
      if (err.code === 11000) {
        return res.status(409).json({
          code: 409,
          message: 'User already exists'
        });
      }

      return res.json(err);
    });
  }

  /**
   * @name deleteUser
   * @param req {Object} Request object
   * @param res {Object} Response object
   * @return {Promise} Returns a promise
   */
  deleteUser(req, res) {
    return this.UserRepository.deleteUser(req.params.userId).then(() => {
      return res.status(204).json({
        code: 204,
        message: `User ${req.params.userId} deleted`
      });
    }).catch(err => {
      res.json(err);
    });
  }
}
