/**
 * this is the test_suit for this package.
 */
import DbHandler from '../database/DbHandler.js';
const dbHandler = new DbHandler();

const insertOne = () => {
  describe('Insert One Record.', () => {
  
    it('Insert Org Units in Mongodb.', (done) => {
      const userGroup = {
        user: { 
          name: "Frankie",
          age: 52
        }
      };
      dbHandler.addUserGroup(userGroup);
      .then((obj) => {
        console.log(obj)
        done();
      });
    });
  });
}

export default insertOne;
