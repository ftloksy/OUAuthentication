/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);

const getOuDivNameByIdTest = () => {

  describe('Get OrgUnits and Divisions Names.', () => {
  
    it('Get OrgUnits Divisions Names by Id.', (done) => {
      chai.request(app)
      .get('/login/getoudivnamebyid/646251e7b3d4690051f43553')
      .end((err, res) => {
        console.log("Get Div Name from OU id.");
        console.log(res.body);
        done();
      })
    });
  });
}

export default getOuDivNameByIdTest;