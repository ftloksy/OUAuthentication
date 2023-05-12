import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orgUnitsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, require: true }
});

const divisionsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, require: true },
  credential: [ { type: Schema.Types.ObjectId, ref: "Employees" } ]
});

const orgUnitsDivisionsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  orgunits: { type: Schema.Types.ObjectId, ref: "OrgUnits" },
  divisions: { type: Schema.Types.ObjectId, ref: "Divisions" }
});

const userRolesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  role: {
    type: String,
    enum: ["Normal", "Management", "Admin"],
    required: true
  },
  read: Boolean,
  addnew: Boolean,
  update: Boolean,
  assing: Boolean,
  unassing: Boolean
});

const employeesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userrole: { type: Schema.Types.ObjectId, ref: "UserRoles" },
  oudiv: [{ type: Schema.Types.ObjectId, ref: "OrgUnitsDivisions" }],
  loginname: { type: String, required: true },
  password: { type: String, required: true }
});

const OrgUnits = model('OrgUnits', orgUnitsSchema);

const Divisions = model('Divisions', divisionsSchema);

const UserRoles = model('UserRoles', userRolesSchema);

const Employees = model('Employees', employeesSchema);

const OrgUnitsDivisions = model('OrgUnitsDivisions', 
          orgUnitsDivisionsSchema);

export { OrgUnits, OrgUnitsDivisions, 
          Divisions, UserRoles, Employees };

