import mongoose from 'mongoose';
import { Employees,  OrgUnitsDivisions } from '../../models/OrgUnits.js';
import DbConnect from '../../database/DbConnect.js';

const dbConnect = new DbConnect();

describe('DbTest', () => {

  it('Test Db', async (done) => {

    Employees.findById("64690e852ea75747a76b9140")
    .select("oudivs")
    .then((docs, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    });

    done();
  })
})

after(() => {
  dbConnect.closeDbConnection();
});

