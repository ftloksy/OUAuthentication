/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from '../helper/MD5.js';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const rootpwd = "123456";
const rootlogin = "tonia";

const hasRightTest = () => {

  let token = null;

  describe('POST login and password', () => {
    it('Pass Login Name and Password to express.', (done) => {
      chai.request(app)
      .post('/login/auth')
      .send(
        {
          login: rootlogin,
          password: md5(rootpwd)
        }
      )
      .end((err, res) => {
        //console.log(res.body);
        token = res.body.token;
        done();
      })
    })
  })

  describe('POST login and password', () => {
    it('Pass Login Name and Password to express.', (done) => {
      chai.request(app)
      .get('/login/hasright/645e5442e38de844831d3d9b')
      .set('Authorization', ' Bearer ' + token)
      .end((err, res) => {
        console.log(res.body);
        done();
      });
    })
  });
}

export default hasRightTest;
