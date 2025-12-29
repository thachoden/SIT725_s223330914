const expect = require("chai").expect;
const request = require("request");
describe("Calculator API", function () {
  const baseUrl = "http://localhost:3000";
  // Valid behaviour
  it("This test if the code is working properly", function (done) {
    request(`${baseUrl}/multiply?a=50&b=3`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("150")
      done();
    });
  });
  //Invalid behaviour
  it("This test if the code handle missing value properly", function (done) {
    request.get(`${baseUrl}/multiply?a=10`, function (error, response, body) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it("This test if the code handle invalid value properly ", function (done) {
    request.get(
      `${baseUrl}/multiply?a=abc&b=*&^`,
      function (error, response, body) {
        expect(response.statusCode).to.equal(400);
        done();
      }
    );
  });
  //Edge case: Multiply with negative number
  it("This test if the code can handle negative number", function (done) {
    request(`${baseUrl}/multiply?a=-20&b=3`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("-60")
      done();
    });
  });//Edge case: Multiply with large value number
  it("This test if the code can handle extremely large number", function (done) {
    request(`${baseUrl}/multiply?a=20&b=10e1000`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("Infinity")
      done();
    });
  });
});
