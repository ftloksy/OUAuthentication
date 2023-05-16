/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);

const getDivTest = () => {

  describe('Get Divisions Names.', () => {
  
    it('Get Divisions Names by Id.', (done) => {
      chai.request(app)
      .get('/login/getdiv')
      .end((err, res) => {
        console.log("Get Div Names.");
        console.log(res.body);
        done();
      })
    });
  });
}

export default getDivTest;
