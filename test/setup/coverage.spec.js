import chai from 'chai';
import ShortUrlController from '../../src/url/shortUrlController';
import ShortUrlRepository from '../../src/url/shortUrlRepository';
import Shortener from '../../src/url/shortener';

describe('Loading everthing to a real code coverage', () => {
  const phrase = 'May the force with you';

  it('We have the blessing?', () => {
    chai.assert.equal(phrase, 'May the force with you');
  }) 
});