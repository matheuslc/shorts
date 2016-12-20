import express from 'express';
import ShortUrlController from '../url/shortUrlController';
import ShortUrlRepository from '../url/shortUrlRepository';

const router = express.Router;

router.get('/:shortUrlId', (req, res) => {
  const ShortUrlRepositoryInstance = new ShortUrlRepository();

  const Controller = new ShortUrlController(ShortUrlRepositoryInstance);
  Controller.getShortUrl(req, res);
});

router.delete('/:shortUrlId', (req, res) => {
  const ShortUrlRepositoryInstance = new ShortUrlRepository();

  const Controller = new ShortUrlController(ShortUrlRepositoryInstance);
  Controller.deleteShortUrl(req, res);
});

export default router;
