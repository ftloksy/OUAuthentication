import mongoose from 'mongoose';

import DbConnect from './DbConnect.js';
import { UserRoles } from '../models/OrgUnits.js';

const dbConnect = new DbConnect();

const normalRole = new UserRoles({
  _id: new mongoose.Types.ObjectId("6462525c64d9ec96a2338b6a"),
  role: "Normal",
  read: true,
  addnew: true,
  update: false,
  assign: false,
  unassign: false
});

let obj = await normalRole.save();
console.log(obj);

const managementRole = new UserRoles({
  _id: new mongoose.Types.ObjectId("6462525c64d9ec96a2338b6e"),
  role: "Management",
  read: true,
  addnew: true,
  update: true,
  assign: false,
  unassign: false
});

obj = await managementRole.save();
console.log(obj);

const adminRole = new UserRoles({
  _id: new mongoose.Types.ObjectId("6462525c64d9ec96a2338b70"),
  role: "Admin",
  read: true,
  addnew: true,
  update: true,
  assign: true,
  unassign: true
});

obj = await adminRole.save();
console.log(obj);

dbConnect.closeDbConnection();
