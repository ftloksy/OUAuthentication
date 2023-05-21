import mongoose from 'mongoose';
import { Employees,  OrgUnitsDivisions } from '../../models/OrgUnits.js';
import DbConnect from '../../database/DbConnect.js';

const dbConnect = new DbConnect();

describe('DbTest', () => {

  it('Test Db', async (done) => {

    OrgUnitsDivisions.aggregate([
      { $match: {divisions: new mongoose.Types.ObjectId("646251e7b3d4690051f4350f") }},
      { "$group": { "_id": "$orgunits" }}
    ]).then((docs, err) => {
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

