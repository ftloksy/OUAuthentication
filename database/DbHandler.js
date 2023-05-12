import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import the Job model, which is a model for representing jobs in MongoDB.
import { OrgUnits, Divisions } from '../models/OrgUnits.js';

dotenv.config();

// Create a class called DbHandler.
class DbHandler {

  constructor() {

    // The MongoDB URL for the database.
    this.mongodbUrl = process.env.MONGODBURL || 'mongodb://localhost/ouauth';
    this.connectDb().catch(err => console.log(err));
  }

  // Connect to the database.
  async connectDb() {
    await mongoose.connect(this.mongodbUrl);
  }

  // Close the database connection.
  async closeDbConnection() {
    await mongoose.connection.close();
  }
  
  async initOrgUnits(unitsName) {
    const record = new OrgUnits(
      {
        name: unitsName
      }
    );
    const obj = await record.save();
    return obj;
  }  

  /**
   * param:   unitsName ( String )
   *          divisions ( Array(String ) )
   */
  async initDivisions(ouName, divisions) {
    const ou = await OrgUnits.findOne({ name: ouName });
    let returnObj = [];
    for ( let i = 0 ; i < divisions.length; i ++ ) {
      let record = new Divisions(
          {
            orgunit: ou,
            name: divisions[i]
          }
      )
      let obj = await record.save();
      returnObj.push(obj);
    }
    return returnObj;
  }

}

export default DbHandler;

