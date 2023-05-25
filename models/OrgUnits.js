import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the Organisational Units schema
const orgUnitsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, require: true }
});

// Define the Divisions schema
const divisionsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, require: true },
});


// Define the Organisational Units and Divisions relation schema
const orgUnitsDivisionsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  // reference to the OrgUnits collection
  orgunits: { type: Schema.Types.ObjectId, ref: "OrgUnits" },
  
  // reference to the Divisions collection
  divisions: { type: Schema.Types.ObjectId, ref: "Divisions" }
});


// Define the UserRoles schema
const userRolesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  role: {
    type: String,
    enum: ["Normal", "Management", "Admin"],
    required: true
  },
  read: Boolean,
  addnew: Boolean,   // I think it is renew the password.
  update: Boolean,
  assign: Boolean,   // change userrole, assign and unassign employees to OU and divisions.
  unassign: Boolean
});

// Define the Employees schema
const employeesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  // ref to userrole collection.
  userrole: { type: Schema.Types.ObjectId, ref: "UserRoles" },

  // ref to divisions collection.
  divs: [{ type: Schema.Types.ObjectId, ref: "Divisions" }],

  // ref to orgUnitsDivisions collection.
  oudivs: [{ type: Schema.Types.ObjectId, ref: "OrgUnitsDivisions" }],

  /**
   * loginname is unique. Don't have two employees has same loginname..
   * When employees created, the doc cann't change the loginname.
   */
  loginname: { type: String, required: true, unique: true },

  /** 
   * Use MD5 hash to encrypt the password.
   * sure don't clear text password through the internet.
   */
  password: { type: String, required: true },
  email: String,
  telephone: String,
  address: String,
  firstname: String,
  lastname: String
});


// Create models for each schema
const OrgUnits = model('OrgUnits', orgUnitsSchema);
const Divisions = model('Divisions', divisionsSchema);
const UserRoles = model('UserRoles', userRolesSchema);
const Employees = model('Employees', employeesSchema);
const OrgUnitsDivisions = model('OrgUnitsDivisions', 
          orgUnitsDivisionsSchema);

export { OrgUnits, OrgUnitsDivisions, 
          Divisions, UserRoles, Employees };

