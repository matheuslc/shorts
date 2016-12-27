import chai from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';
import UrlSchema from '../../src/schemas/urlSchema';
import ShortUrlService from '../../src/url/shortUrlService';
import httpMocks from 'node-mocks-http';
import mongoose from 'mongoose';

const expect = chai.expect;

mongoose.Promise = global.Promise;

describe('Short URL Repository', () => {
  let Service;

  before(() => {
    Service = new ShortUrlService();
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
});
