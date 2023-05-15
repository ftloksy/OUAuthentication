/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from '../helper/MD5.js';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const getDivFromOUTest = () => {

  describe('Get Divisions Names.', () => {
  
    it('Get Divisions Names.', (done) => {
      chai.request(app)
      .get('/login/getdiv/646251e7b3d4690051f434fa')
      .end((err, res) => {
        console.log("Get Div Name from OU id.");
        console.log(res.body);
        done();
      })
    });
  });
}

export default getDivFromOUTest;
