import {expect} from "chai"
import "mocha"
import request from "supertest"
import {app} from "../src/app"

describe("App", () => {
  it('should return run and hello world message!"', (done: any) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.text).to.equal("Hello, Qwist!")
        done()
      })
  })

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
})
