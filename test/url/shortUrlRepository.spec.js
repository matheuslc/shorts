import chai from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';
import UrlSchema from '../../src/schemas/urlSchema';
import ShortUrlRepository from '../../src/url/shortUrlRepository';
import httpMocks from 'node-mocks-http';
import mongoose from 'mongoose';

const expect = chai.expect;

mongoose.Promise = global.Promise;

describe('Short URL Repository', () => {
  let Repository;

  before(() => {
    Repository = new ShortUrlRepository();
  });

  it('Should save a new Short URL', () => {
    let ShortUrl = new UrlSchema({
      url: 'https://medium.com',
      shortUrl: 'abc123'
    });

    sinon.stub(ShortUrl, 'save');

    Repository.persist(ShortUrl);

    sinon.assert.calledWith(ShortUrl.save); 
  });

  it('Should findOneAndUpdate ShortUrl by ShortUrl id', (done) => {
    let ShortUrl = new UrlSchema({
      url: 'https://medium.com',
      shortUrl: 'abc123'
    });

    sinon.stub(UrlSchema, 'findOneAndUpdate').resolves(ShortUrl);

    const shortUrl = Repository.getShortUrlById('abc123', 'https://google.com');
    
    shortUrl.then((response) => {
      expect(response.url).to.equal('https://medium.com');
      expect(response.shortUrl).to.equal('abc123');
      expect(response).to.have.property('_id');
      done();
    })
  });
});










