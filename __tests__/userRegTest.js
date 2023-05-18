/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from '../helper/MD5.js';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const userRegTest = () => {
  
  let token = null

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
    })
  })

   // How to access token var ??
   describe('Modify user Reg', () => {
    it('Use the token in Reg user test unit', (done) => {
      chai.request(app)
      .post('/login/reguser/6462529079f4cc9d82d27e19')
      .set('Authorization', ': Bearer ' + token)
      .send(
        {
          email: "freakchow@gmail.com",
          telephone: "(852)23402125",
          address: "21 Wavetree Road, Liverpool",
          firstname: "Frankie",
          lastname: "Chow"
        }
      )
      .end((err, res) => {
        console.log(res.body);
        done();
      });
    });
  });
}

export default userRegTest;
