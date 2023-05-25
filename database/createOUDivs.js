/**
 *  It then creates a database connection, 
 * iterates over the `ouMap` and `divMap` maps, 
 * and saves the Organisational Units and Divisions
 * data objects to the database.
 */
import mongoose from 'mongoose';

import {ouMap, divMap, ouDiv} from './ouDivData.js';

let OrgUnitsObj = [];
let DivObj = [];
let OuDivObj = [];

for (const [key, value] of ouMap) {
  
  /**
   * Create a new Organisational Units object.
   * follow ouMap and save to database.
   */
    const record = {
      _id: value,
      name: key
    }
    //const obj = await record.save();
    OrgUnitsObj.push(record);
}

// Iterate over the `divMap` map.
for (const [key, value] of divMap) {
    const record = {
      _id: value,
      name: key
    }
    //const obj = await record.save();
    DivObj.push(record);
}

for (let i = 0; i < ouDiv.length ; i ++) {
  for (let j = 0; j < ouDiv[i].div.length ; j ++){
    const record = {
      _id: new mongoose.Types.ObjectId(),
      orgunits: ouMap.get(ouDiv[i].ou),
      divisions: divMap.get(ouDiv[i].div[j])
    }
    //const obj = await record.save();
    OuDivObj.push(record);
  }
}

//dbConnect.closeDbConnection();

export { OrgUnitsObj, DivObj, OuDivObj };
