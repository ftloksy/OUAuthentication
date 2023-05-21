import { Employees,  
  OrgUnitsDivisions, Divisions } from '../../models/OrgUnits.js';

import DbConnect from '../../database/DbConnect.js';

const dbConnect = new DbConnect();

describe('DbTest', () => {

  it('Emp findById', (done) => {

    Employees.findById('645e5442e38de844831d3d9b')
    .populate('userrole')
    .then((emp, err) => {
      console.log("Has Right HERE.");
      console.log(emp);
      console.log("Error: ", err);
    });

    done();
  });
    
  it('Find in OuDiv', (done) => {    
    OrgUnitsDivisions.find({orgunits: "645e0fa6cd5fd11e6ced64f6"})
    .populate('orgunits')
    .populate('divisions')
    .then((oudiv, err) => {
      console.log("OUDIV HERE.");
      console.log(oudiv);
      console.log("Error: ", err);
    });

    done();
  });

  it('Find OuDiv by Id in Db', (done) => {    
    OrgUnitsDivisions.findById("646251e7b3d4690051f43553")
    .populate('orgunits')
    .populate('divisions')
    .then((oudiv, err) => {
      console.log("OUDIV BY ID HERE.");
      console.log(oudiv);
      console.log("OrgUnits Name: ", oudiv.orgunits.name);
      console.log("Divisions Name: ", oudiv.divisions.name);
      console.log("Error: " , err);
    });

    done();
  });

  it('list all in Div.', (done) => {    
    Divisions.find()
    .then((div, err) => {
      console.log("Found Div: ");
      console.log(div);
      console.log("Error: ", err);
     })

    done();
  })

})

after(() => {
  dbConnect.closeDbConnection();
});

