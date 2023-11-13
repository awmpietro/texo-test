const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../src/api/index');

describe('Producers Controller', () => {
   describe('GET /producers/award-intervals', () => {
      describe('Basic Assertions', () => {
         it('should return a 200 status code', async () => {
            const res = await request(app).get('/producers/award-intervals');
            expect(res.status).to.equal(200);
         });
         it('should return an object', async () => {
            const res = await request(app).get('/producers/award-intervals');
            expect(res.body).to.be.an('object');
         });
         it('should return an object with min and max arrays', async () => {
            const res = await request(app).get('/producers/award-intervals');
            expect(res.body).to.have.all.keys('min', 'max');
            expect(res.body.min).to.be.an('array');
            expect(res.body.max).to.be.an('array');
         });
         it('min and max arrays should contain objects with specific properties', async () => {
            const res = await request(app).get('/producers/award-intervals');
            if (res.body.min.length > 0) {
               expect(res.body.min[0]).to.have.all.keys('producer', 'interval', 'previousWin', 'followingWin');
            }
            if (res.body.max.length > 0) {
               expect(res.body.max[0]).to.have.all.keys('producer', 'interval', 'previousWin', 'followingWin');
            }
         });
      });

      // these tests are specific to movielist.csv file. uncomment to run
      describe('Specific Assertions to provided file movielist.csv', () => {
         const testCases = [
            {
               name: "min interval",
               expectedName: "Joel Silver",
               expectedValue: 1
            },
            {
               name: "max interval",
               expectedName: "Matthew Vaughn",
               expectedValue: 13
            }
   
         ]
         it(`producer name with min interval should be equal to ${testCases[0].expectedName}`, async () => {
            const res = await request(app).get('/producers/award-intervals');
            expect(res.body.min[0].producer).to.equal(testCases[0].expectedName);
         });
         it(`min interval should be equal to ${testCases[0].expectedValue}`, async () => {
            const res = await request(app).get('/producers/award-intervals');
            expect(res.body.min[0].interval).to.equal(1);
         });
         it(`producer name with max interval should be equal to ${testCases[1].expectedName}`, async () => {
            const res = await request(app).get('/producers/award-intervals');
            expect(res.body.max[0].producer).to.equal(testCases[1].expectedName);
         });
         it(`max interval should be equal to ${testCases[1].expectedValue}`, async () => {
            const res = await request(app).get('/producers/award-intervals');
            expect(res.body.max[0].interval).to.equal(testCases[1].expectedValue);
         });
      });
   });
});
