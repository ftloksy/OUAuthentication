/**
 * this is the test_suit for this package.
 */
import DbHandler from '../database/DbHandler.js';

import userPasswordTest from './userPasswordTest.js';

const dbHandler = new DbHandler();

userPasswordTest();

after(() => {
  dbHandler.closeDbConnection();
});
