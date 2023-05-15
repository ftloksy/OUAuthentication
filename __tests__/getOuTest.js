/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from '../helper/MD5.js';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const getOuTest = () => {

  describe('Get Org Units Names.', () => {
  
    it('Get Org Units Names.', (done) => {
      chai.request(app)
      .get('/login/getou')
      .end((err, res) => {
        console.log("Get Div Name.");
        console.log(res.body);
        done();
      })
    });
  });
}

export default getOuTest;
