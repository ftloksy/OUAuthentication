/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from '../helper/MD5.js';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const userLoginNameTest = () => {

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
      });
    })
  })

  describe('Find user test', () => {
    it('Use the token to find user test', (done) => {
      chai.request(app)
      .get('/login/finduser/645e5442e38de844831d3d9b')
      .set('Authorization', ': Bearer ' + token)
      .end((err, res) => {
//         console.log(res.body);
        done();
      })
    });
  });
}

export default userLoginNameTest;
