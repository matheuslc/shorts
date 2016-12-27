import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import 'sinon-mongoose';
import 'sinon-as-promised';
import events from 'events';
import UrlSchema from '../../src/schemas/urlSchema';
import ShortUrlController from '../../src/url/shortUrlController';
import ShortUrlRepository from '../../src/url/shortUrlRepository';
import ShortUrlService from '../../src/url/shortUrlService';
import httpMocks from 'node-mocks-http';

const expect = chai.expect;

chai.should();
chai.use(sinonChai);

describe('Short URL Controller', () => {
  let Controller;
  let Repository;
  let Service;
  let RepositoryStub;
  let ServiceStub;

  before(() => {
    Repository = new ShortUrlRepository();
    Service = new ShortUrlService();
    Controller = new ShortUrlController(Repository, Service);

    RepositoryStub = sinon.stub(Repository, 'getShortUrlById');      
    ServiceStub = sinon.stub(Service, 'deleteShortUrl');
    
  });

  it('Should redirect to a URL', (done) => {
    let request = httpMocks.createRequest({
      method: 'GET',
      url: '/abc123',
      params: {
        shortUrlId: 'abc123'
      }
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    request.get = sinon.stub().returns('https://google.com.br');

    RepositoryStub.resolves({
      url: 'https://medium.com.br'
    });

    Controller.getShortUrl(request, response);
    
    RepositoryStub.should.have.been.calledOnde;

    RepositoryStub.restore();

    response.on('end', () => {
      expect(response.statusCode).to.equal(301);
      done();
    });
  });

  it('Should delete a Short URL by ID', (done) => {
    let request = httpMocks.createRequest({
      method: 'DELETE',
      url: '/abc123',
      params: {
        shortUrlId: 'abc123'
      }
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    ServiceStub.resolves({});

    Controller.deleteShortUrl(request, response);
    ServiceStub.restore();

    response.on('end', () => {
      expect(response.statusCode).to.equal(204);
      done();
    })
  }); 

  it('Should create a new Short URL', (done) => {
    const expectedResponse = {
      url: 'https://medium.com',
      shortUrl: 'abc123',
      hits: {
        count: 0
      }
    };

    let request = httpMocks.createRequest({
      method: 'POST',
      body: {
        url: 'https://medium.com'
      }
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    ServiceStub = sinon.stub(Service, 'createShortUrl').returns(new UrlSchema({
      url: 'https://medium.com',
      shortUrl: 'abc123',
      hits: {
        count: 0
      }
    }));

    RepositoryStub = sinon.stub(Repository, 'persist').resolves(expectedResponse);

    Controller.createShortUrl(request, response)

    RepositoryStub.restore();
    ServiceStub.restore();

    response.on('end', () => {
      let result = JSON.parse(response._getData());

      expect(result).to.be.an('object');
      expect(result).to.deep.equal(expectedResponse);
      expect(response.statusCode).to.be.equal(200);

      done();
    });
  });

  it('Should throw an error if url does not exist', () => {
    let request = httpMocks.createRequest({
      method: 'POST',
      body: {}
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    expect(() => {
      Controller.createShortUrl(request, response);
    }).to.throw(Error);
  });

  it('Should throw an error if URL its not valid', () => {
    let request = httpMocks.createRequest({
      method: 'POST',
      body: {
        url: 'medium'
      }
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    expect(() => {
      Controller.createShortUrl(request, res);
    }).to.throw(Error);
  })
});










