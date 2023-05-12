import DbHandler from '../database/DbHandler.js';
import insertOne from './insertOne.js';

const dbHandler = new DbHandler();

insertOne();

after(() => {
  dbHandler.closeDbConnection();
});
