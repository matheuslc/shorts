import chai from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';
import events from 'events';
import UrlSchema from '../../src/schemas/urlSchema';
import ShortUrlController from '../../src/url/shortUrlController';
import ShortUrlRepository from '../../src/url/shortUrlRepository';
import ShortUrlService from '../../src/url/shortUrlService';
import config from '../fixtures/config.json';
import httpMocks from 'node-mocks-http';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

describe('Short URL Controller', () => {
  let Controller;
  let Repository;
  let Service;

  before(() => {
    Repository = new ShortUrlRepository();
    Service = new ShortUrlService();
    Controller = new ShortUrlController(Repository, Service);

    sinon.stub(Repository, 'getShortUrlById').resolves({
      url: 'https://medium.com.br'
    }).withArgs('abc123', 'https://google.com.br');
  });

  it('Should redirect to a URL', (done) => {
    let request = httpMocks.createRequest({
      method: 'GET',
      url: '/abcd12',
      Referer: 'aa'
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });
  
    request.get = sinon.stub().returns('https://google.com.br');

    Controller.getShortUrl(request, response);

    response.on('end', () => {
      chai.expect(response.statusCode).to.equal(301);
      done();
    });
  });
});










