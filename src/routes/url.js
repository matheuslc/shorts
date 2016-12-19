import express from 'express';
import ShortUrlController from '../url/shortUrlController';
import ShortUrlRepository from '../url/shortUrlRepository';
import UserRepository from '../user/userRepository';

const router = express.Router;

router.get('/:shortUrlId', (req, res) => {
  const ShortUrlRepositoryInstance = new ShortUrlRepository();
  const UserRepositoryInstance = new UserRepository();

  const Controller = new ShortUrlController(ShortUrlRepositoryInstance, UserRepositoryInstance);
  Controller.getShortUrl(req, res);
});

router.delete('/:shortUrlId', (req, res) => {
  const ShortUrlRepositoryInstance = new ShortUrlRepository();
  const UserRepositoryInstance = new UserRepository();

  const Controller = new ShortUrlController(ShortUrlRepositoryInstance, UserRepositoryInstance);
  Controller.deleteShortUrl(req, res);
});

export default router;
