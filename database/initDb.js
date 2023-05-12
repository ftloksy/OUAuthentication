import mongoose from 'mongoose';

import DbConnect from './DbConnect.js';
import { UserRoles } from '../models/OrgUnits.js';

const dbConnect = new DbConnect();

const normalRole = new UserRoles({
  _id: new mongoose.Types.ObjectId(),
  role: "Normal",
  read: true,
  addnew: true,
  update: false,
  assing: false,
  unassing: false
});

let obj = await normalRole.save();
console.log(obj);

const managementRole = new UserRoles({
  _id: new mongoose.Types.ObjectId(),
  role: "Management",
  read: true,
  addnew: true,
  update: true,
  assing: false,
  unassing: false
});

obj = await managementRole.save();
console.log(obj);

const adminRole = new UserRoles({
  _id: new mongoose.Types.ObjectId(),
  role: "Admin",
  read: true,
  addnew: true,
  update: true,
  assing: true,
  unassing: true
});

obj = await adminRole.save();
console.log(obj);

dbConnect.closeDbConnection();
