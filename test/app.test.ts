import { expect } from 'chai';
import 'mocha';
import request from 'supertest';
import { app } from '../src/app';

describe('GET /', () => {
  it('should return "Hello, Express!"', (done: any) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(res.text).to.equal('Hello, Express!');
        done();
      });
  });
});
