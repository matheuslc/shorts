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

  before(() => {
    Repository = new ShortUrlRepository();
    Service = new ShortUrlService();
    Controller = new ShortUrlController(Repository, Service);
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

    let RepositoryStub = sinon.stub(Repository, 'getShortUrlById');      

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

  it('Should catch an error if repository throws an error', () => {
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

    let RepositoryStub = sinon.stub(Repository, 'getShortUrlById');      

    RepositoryStub.resolves(new Error());

    Controller.getShortUrl(request, response);

    response.on('end', () => {
      expect(response.statusCode).to.equal(500);
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

    let ServiceStub = sinon.stub(Service, 'deleteShortUrl');

    ServiceStub.resolves({});

    Controller.deleteShortUrl(request, response);
    ServiceStub.restore();

    response.on('end', () => {
      expect(response.statusCode).to.equal(204);
      done();
    })
  }); 

  it('Should create a new Short URL', (done) => {
    let expectedResponse = {
      url: 'https://medium.com',
      shortUrl: 'abc123',
      hits: {
        count: 0
      },
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

    let ServiceStub = sinon.stub(Service, 'createShortUrl').returns(new UrlSchema({
      url: 'https://medium.com',
      shortUrl: 'abc123',
      hits: {
        count: 0
      }
    }));

    let RepositoryStub = sinon.stub(Repository, 'persist').resolves(expectedResponse);

    Controller.createShortUrl(request, response)
    
    response.on('end', () => {
      let result = JSON.parse(response._getData());

      expect(result).to.be.an('object');
      expect(result).to.deep.equal(expectedResponse);

      RepositoryStub.restore();
      ServiceStub.restore();

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
      Controller.createShortUrl(request, response);
    }).to.throw(Error);
  })

  it('Should catch an error if we have an error in persist repository method', () => {
    let request = httpMocks.createRequest({
      method: 'POST',
      body: {
        url: 'https://medium.com'
      }
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    let ServiceStub = sinon.stub(Service, 'createShortUrl').returns(new UrlSchema({
      url: 'https://medium.com',
      shortUrl: 'abc123',
      hits: {
        count: 0
      }
    }));

    let RepositoryStub = sinon.stub(Repository, 'persist').rejects({});

    Controller.createShortUrl(request, response);
    RepositoryStub.restore();
    ServiceStub.restore();

    response.on('end', () => {
      expect(response.statusCode).to.equal(500);
    })
  });

  it('Should retry createShortUrl if we have an error 11000 in persist', (done) => {
    let spy = sinon.spy(Controller, 'createShortUrl');

    let request = httpMocks.createRequest({
      method: 'POST',
      body: {
        url: 'https://medium.com'
      }
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    let ServiceStub = sinon.stub(Service, 'createShortUrl').returns(new UrlSchema({
      url: 'https://medium.com',
      shortUrl: 'abc123',
      hits: {
        count: 0
      }
    }));

    let RepositoryStub = sinon.stub(Repository, 'persist');

    RepositoryStub.onCall(0).rejects({
      code: 11000
    });

    RepositoryStub.onCall(1).resolves();

    Controller.createShortUrl(request, response);

    response.on('end', () => {
      expect(spy).to.have.been.calledTwice;
      
      ServiceStub.restore();
      RepositoryStub.restore();
      done();
    })
  });
});
