import chai from 'chai';
import config from './fixtures/config.json';
import Shortener from '../src/url/shortener';

const assert = chai.assert;
const should = chai.should;

describe('URL Shortener', () => {
  const shortener = new Shortener(config.dictionary, config.shortUrlSize);

  it('Should return a hash with 5 digits', () => {
    const url = shortener.getRandomUrl();

    assert.typeOf(url, 'string');
    assert.equal(url.length, 5);
  });

  it('Should return a random number between 0 and dictionary length', () => {
    const randomNumber = shortener.getRandomPosition();

    assert.typeOf(randomNumber, 'number');
    assert.isBelow(randomNumber, config.dictionary.length);
  });
});
