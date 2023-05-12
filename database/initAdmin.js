import mongoose from 'mongoose';
import md5 from '../helper/MD5.js';

import DbConnect from './DbConnect.js';
import { UserRoles, Employees } from '../models/OrgUnits.js';

const password = md5("root_password");

const dbConnect = new DbConnect();

const userRoleObj = await UserRoles.findOne({role: "Admin"}) ;

console.log(userRoleObj._id);

const record = new Employees({
  _id: new mongoose.Types.ObjectId(),
  userrole: userRoleObj._id,
  loginname: "admin",
  password: password
});

const obj = await record.save();
console.log(obj);

dbConnect.closeDbConnection();
