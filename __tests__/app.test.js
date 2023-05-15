/**
 * this is the test_suit for this package.
 */
import DbConnect from '../database/DbConnect.js';


import loginTest from './loginTest.js';
import userPasswordTest from './userPasswordTest.js';
import userLoginNameTest from './userLoginNameTest.js';
import userRegTest from './userRegTest.js';
import getOuTest from './getOuTest.js';

import hasRightTest from './hasRightTest.js';

const dbConnect = new DbConnect();


userPasswordTest();
userLoginNameTest();
userRegTest();

loginTest();
hasRightTest();
getOuTest();


after(() => {
  dbConnect.closeDbConnection();
});
