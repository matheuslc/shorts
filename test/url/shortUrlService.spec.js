import chai from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';
import config from '../fixtures/config.json';
import Shortener from '../../src/url/shortener';
import UrlSchema from '../../src/schemas/urlSchema';
import ShortUrlService from '../../src/url/shortUrlService';
import httpMocks from 'node-mocks-http';
import mongoose from 'mongoose';

const expect = chai.expect;
const assert = chai.assert;

mongoose.Promise = global.Promise;

describe('Short URL Service', () => {
  let Service;

  before(() => {
    Service = new ShortUrlService(new Shortener(config.dictionary, config.shortUrlSize));
  });

  it('Should create a URL Schema', () => {
    const Url = Service.createShortUrl('https://medium.com');

    expect(Url.url).to.equal('https://medium.com');
    expect(Url).to.have.property('shortUrl');
    expect(Url).to.have.property('_id');
  });

  it('Should delete a Short URL', () => {
    let stub = sinon.stub(UrlSchema, 'remove').returns({
      shortUrl: 'abc123'
    });

    const deleted = Service.deleteShortUrl('abc123');

    expect(deleted.shortUrl).to.equal('abc123');
  });

  it('Should create different objects with diferrent URLS', () => {
    const UrlSchema = Service.createShortUrl('https://medium.com');
    const AnotherUrlSchema = Service.createShortUrl('https://medium.com');
    
    assert.typeOf(UrlSchema.url, 'string');
    assert.typeOf(AnotherUrlSchema.url, 'string');

    assert.equal(UrlSchema.shortUrl.length, 5);
    assert.equal(AnotherUrlSchema.shortUrl.length, 5);

    assert.notEqual(UrlSchema.shortUrl, AnotherUrlSchema.shortUrl, 'Is not the same hash! :)');
  })
});
