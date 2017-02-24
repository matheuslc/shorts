import express from 'express';
import config from '../../resource/config/enviroment';
import Shortener from '../url/shortener';
import ShortUrlController from '../url/shortUrlController';
import ShortUrlRepository from '../url/shortUrlRepository';
import ShortUrlService from '../url/shortUrlService';

const router = express.Router();
const ShortUrlRepositoryInstance = new ShortUrlRepository();
const ShortUrlServiceInstance = new ShortUrlService(new Shortener(config.dictionary, config.shortUrlSize));

router.get('/:shortUrlId', (req, res) => {
  const Controller = new ShortUrlController(ShortUrlRepositoryInstance, ShortUrlServiceInstance);

  Controller.getShortUrl(req, res);
});

router.delete('/:shortUrlId', (req, res) => {
  const Controller = new ShortUrlController(ShortUrlRepositoryInstance, ShortUrlServiceInstance);

  Controller.deleteShortUrl(req, res);
});

router.post('', (req, res) => {
  const Controller = new ShortUrlController(ShortUrlRepositoryInstance, ShortUrlServiceInstance);

  Controller.createShortUrl(req, res);
});

export default router;
