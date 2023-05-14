/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from '../helper/MD5.js';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const userLoginName = () => {
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
        const taken = res.body.taken;
        console.log("Taken 1: ");
        console.log(taken);

        chai.request(app)
        .post('/login/reguser')
        .set('Authorization', ': Bearer ' + taken)
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
        });

        done();

      })
    });
  });
}

export default userLoginName;
