/**
 * this is the test_suit for this package.
 */
import DbHandler from '../database/DbHandler.js';

import userPasswordTest from './userPasswordTest.js';
import loginTest from './loginTest.js';

const dbHandler = new DbHandler();

userPasswordTest();
loginTest();

after(() => {
  dbHandler.closeDbConnection();
});
