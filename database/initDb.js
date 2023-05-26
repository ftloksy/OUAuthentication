import mongoose from 'mongoose';

import MD5 from '../helper/MD5.js';
import DbConnect from './DbConnect.js';

import {
    OrgUnitsObj, DivObj, OuDivObj
  } from './createOUDivs.js';

import { OrgUnits, OrgUnitsDivisions,
          Divisions, UserRoles, Employees } from '../models/OrgUnits.js';

const dbConnect = new DbConnect();

import userRole from './createUserRoles.js';

function getOneOrThree() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  return randomNumber;
}

// all Employees.
const emps = [
  {
    address: "123 Maple Street",
    firstName: "John",
    lastName: "Doe",
    telephone: "555-123-4567"
  },
  {
    address: "456 Oak Avenue",
    firstName: "Emily",
    lastName: "Smith",
    telephone: "555-234-5678"
  },
  {
    address: "789 Elm Street",
    firstName: "Michael",
    lastName: "Johnson",
    telephone: "555-345-6789"
  },
  {
    address: "321 Pine Lane",
    firstName: "Emma",
    lastName: "Davis",
    telephone: "555-456-7890"
  },
  {
    address: "654 Cedar Lane",
    firstName: "Daniel",
    lastName: "Wilson",
    telephone: "555-567-8901"
  },
  {
    address: "987 Maple Street",
    firstName: "Olivia",
    lastName: "Anderson",
    telephone: "555-678-9012"
  },
  {
    address: "123 Oak Avenue",
    firstName: "Christopher",
    lastName: "Garcia",
    telephone: "555-901-2345"
  },
  {
    address: "789 Cedar Lane",
    firstName: "Sophia",
    lastName: "Lopez",
    telephone: "555-567-8901"
  },
  {
    address: "321 Main Street",
    firstName: "Joshua",
    lastName: "Robinson",
    telephone: "555-234-5678"
  },
  {
    address: "987 Elm Street",
    firstName: "Abigail",
    lastName: "Lewis",
    telephone: "555-678-9012"
  },
  {
    address: "654 Cedar Lane",
    firstName: "Ethan",
    lastName: "Carter",
    telephone: "555-345-6789"
  },
  {
    address: "456 Elm Street",
    firstName: "Jane",
    lastName: "Smith",
    telephone: "555-987-6543"
  },
  {
    address: "321 Main Street",
    firstName: "David",
    lastName: "Anderson",
    telephone: "555-234-5678"
  },
  {
    address: "456 Oak Avenue",
    firstName: "William",
    lastName: "Martinez",
    telephone: "555-345-6789"
  },
  {
    address: "123 Elm Street",
    firstName: "Isabella",
    lastName: "Jackson",
    telephone: "555-678-9012"
  },
  {
    address: "987 Main Street",
    firstName: "James",
    lastName: "White",
    telephone: "555-901-2345"
  },
  {
    address: "654 Cedar Lane",
    firstName: "Charlotte",
    lastName: "Lee",
    telephone: "555-567-8901"
  },
  {
    address: "321 Oak Avenue",
    firstName: "Benjamin",
    lastName: "Harris",
    telephone: "555-234-5678"
  },
  {
    address: "789 Elm Street",
    firstName: "Mia",
    lastName: "Clark",
    telephone: "555-890-1234"
  },
  {
    address: "456 Main Street",
    firstName: "Alexander",
    lastName: "Lewis",
    telephone: "555-567-8901"
  },
  {
    address: "123 Cedar Lane",
    firstName: "Ava",
    lastName: "Young",
    telephone: "555-123-4567"
  },
  {
    address: "987 Oak Avenue",
    firstName: "Henry",
    lastName: "Walker",
    telephone: "555-901-2345"
  },
  {
    address: "654 Elm Street",
    firstName: "Sofia",
    lastName: "Hall",
    telephone: "555-567-8901"
  }
]

let empsObj = [];
let loginnamesPool = [];

// create Employees Objs Array.
emps.forEach(emp => {
  const { address, firstName, lastName, telephone } = emp;
  const loginname = firstName.toLowerCase();

  if( loginnamesPool.includes(loginname) ) {
    throw "Dup loginname!!!! " + firstName;
  };

  loginnamesPool.push(loginname);

  let inThree = getOneOrThree();

  let divArray = [];
  for (let i = 0; i < inThree ; i ++) {
    divArray.push(
      DivObj[Math.floor(Math.random() * DivObj.length)]._id
    );
  }
  
  inThree = getOneOrThree();

  let ouDivArray = [];
  for (let i = 0; i < inThree ; i ++) {
    ouDivArray.push(
      OuDivObj[Math.floor(Math.random() * OuDivObj.length)]._id
    );
  };
  
  empsObj.push({
    _id: new mongoose.Types.ObjectId(),
    userrole: userRole[0]._id,
    divs: divArray,
    oudivs: ouDivArray,
    loginname: loginname,
    password: MD5("123456"),
    email: loginname + "@coolteach.com",
    telephone: emp.telephone,
    address: emp.address,
    firstname: emp.firstName,
    lastname: emp.lastName
  });

});

// assign the admin user right.
empsObj[0].userrole = userRole[2]._id;
console.log(empsObj[0].loginname + " is " + userRole[2].role);

empsObj[1].userrole = userRole[2]._id;
console.log(empsObj[1].loginname + " is " + userRole[2].role);

empsObj[2].userrole = userRole[1]._id;
console.log(empsObj[2].loginname + " is " + userRole[1].role);

empsObj[3].userrole = userRole[1]._id;
console.log(empsObj[3].loginname + " is " + userRole[1].role);

empsObj[4].userrole = userRole[1]._id;
console.log(empsObj[4].loginname + " is " + userRole[1].role);

empsObj[5].userrole = userRole[1]._id;
console.log(empsObj[5].loginname + " is " + userRole[1].role);

// save all objs to database.
for (let i = 0; i < userRole.length; i++ ) {
  const record = new UserRoles(userRole[i]);
  await record.save();
};

for (let i = 0; i < OrgUnitsObj.length; i++ ) {
   const record = new OrgUnits(OrgUnitsObj[i]);
   await record.save();
};

for (let i = 0; i < DivObj.length; i++ ){
  const record = new Divisions(DivObj[i]);
  await record.save();
};

for (let i = 0; i < OuDivObj.length; i++ ){
   const record = new OrgUnitsDivisions(OuDivObj[i]);
   await record.save();
};

for (let i = 0; i < empsObj.length; i++ ){
  const record = new Employees(empsObj[i]);
  await record.save();
};

dbConnect.closeDbConnection();
