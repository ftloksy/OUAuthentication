import mongoose from 'mongoose';
import { Employees,  OrgUnitsDivisions } from '../../models/OrgUnits.js';
import DbConnect from '../../database/DbConnect.js';
import pkg from 'bson-objectid';
const { ObjectID } = pkg;

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

describe('ObjectIdTest', () => {

  it('ObjectId Db', async (done) => {
    const obid = new mongoose.Types.ObjectId('646bd618294ccbc108491135');
    console.log("ObjectId: ", obid.toString());

    done();

  })
})

describe('simple javascript for ObjectId Test', () => {

  it('bson ObjectId test', (done) => {
    //const id = ObjectID();
    console.log("BSON: ", ObjectID );
    done();
  })
})


after(() => {
  dbConnect.closeDbConnection();
});

