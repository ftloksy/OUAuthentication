import mongoose from 'mongoose';

import {ouMap, divMap, ouDiv} from './ouDivData.js';
import DbConnect from './DbConnect.js';
import { OrgUnits,
    OrgUnitsDivisions,
    Divisions,
    UserRoles,
    Employees } from '../models/OrgUnits.js';

const dbConnect = new DbConnect();

let returnOrgUnitsObj = [];
let returnDivObj = [];
let returnOuDivObj = [];

for (const [key, value] of ouMap) {
    const record = new OrgUnits({
      _id: value,
      name: key
    })
    const obj = await record.save();
    returnOrgUnitsObj.push(obj);
}

for (const [key, value] of divMap) {
    const record = new Divisions({
      _id: value,
      name: key
    })
    const obj = await record.save();
    returnDivObj.push(obj);
}

for (let i = 0; i < ouDiv.length ; i ++) {
  for (let j = 0; j < ouDiv[i].div.length ; j ++){
    const record = new OrgUnitsDivisions({
      _id: new mongoose.Types.ObjectId(),
      orgunits: ouMap.get(ouDiv[i].ou),
      divisions: divMap.get(ouDiv[i].div[j])
    })
    const obj = await record.save();
    returnOuDivObj.push(obj);
  }
}

console.log(returnOrgUnitsObj);
console.log(returnDivObj);
   
dbConnect.closeDbConnection();
