import mongoose from 'mongoose';
import md5 from '../helper/MD5.js';

import DbConnect from './DbConnect.js';
import { UserRoles, Employees } from '../models/OrgUnits.js';

const dbConnect = new DbConnect();

const emp = await Employees.findOne({loginname: "admin"}).populate('userrole');
console.log(emp.userrole.role);

dbConnect.closeDbConnection();
