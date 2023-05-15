import { Employees,  OrgUnitsDivisions } from '../../models/OrgUnits.js';
import DbConnect from '../../database/DbConnect.js';

const dbConnect = new DbConnect();

describe('DbTest', () => {

  it('Test Db', (done) => {

    Employees.findById('645e5442e38de844831d3d9b')
    .populate('userrole')
    .then((emp, err) => {
      console.log("Has Right HERE.");
      console.log(emp);
      console.log(err);
    });
    
    
    OrgUnitsDivisions.find({orgunits: "645e0fa6cd5fd11e6ced64f6"})
    .populate('orgunits')
    .populate('divisions')
    .then((oudiv, err) => {
      console.log("OUDIV HERE.");
      console.log(oudiv);
      console.log(err);
    });

    done();
  })

})

after(() => {
  dbConnect.closeDbConnection();
});

