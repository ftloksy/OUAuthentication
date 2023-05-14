/**
 * this is the test_suit for this package.
 */
import DbHandler from '../database/DbHandler.js';

import userPasswordTest from './userPasswordTest.js';
import loginTest from './loginTest.js';
import userLoginNameTest from './userLoginNameTest.js';
import userRegTest from './userRegTest.js';

const dbHandler = new DbHandler();

userPasswordTest();
loginTest();
userLoginNameTest();
//userRegTest();

after(() => {
  dbHandler.closeDbConnection();
});
