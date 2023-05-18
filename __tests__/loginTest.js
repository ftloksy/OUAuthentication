/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from '../helper/MD5.js';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const loginTest = () => {

  let token = null;

  describe('POST login and password', () => {
  
    it('Pass Login Name and Password to express.', (done) => {
      chai.request(app)
      .post('/login/auth')
      .send(
        {
          login: "admin",
          password: md5('root_password')
        }
      )
      .end((err, res) => {
        console.log(res.body);
        token = res.body.token;
        done();
      })
    });
  });
      // How to access token var ??
   describe('Other test units', () => {
    it('Use the token in another test unit', (done) => {
      chai.request(app)
      .get('/login/checktoken/tyyrdddfeeff')
      .set('Authorization', ': Bearer ' + token) 
      .end((err, res) => {
        expect(res).to.have.status(200);
        console.log(res.body);
        done();
      });
    });
  });
}

export default loginTest;
