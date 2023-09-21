import { expect } from 'chai'
import 'mocha'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions endpoint', () => {
  it('should have /transactions endpoint', (done: any) => {
    request(app)
      .get('/transactions')
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.statusCode).to.equal(200)
        done()
      })
  })

  it('should return an object of transactions', (done: any) => {
    request(app)
      .get('/transactions')
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('transactions')
        done()
      })
  })

  it('should return json', (done: any) => {
    request(app)
      .get('/transactions')
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.headers['content-type']).to.have.string(
          'application/json; charset=utf-8'
        )
        done()
      })
  })

  it('transactions endpoint should accept "source" param', (done: any) => {
    request(app)
      .get('/transactions?source=revolut')
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.statusCode).to.equal(200)
        done()
      })
  })
})
