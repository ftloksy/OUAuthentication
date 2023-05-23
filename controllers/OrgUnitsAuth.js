import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { Employees, 
  OrgUnitsDivisions, 
  Divisions,
  OrgUnits,
  UserRoles } from '../models/OrgUnits.js';

class  OrgUnitsAuth {
  constructor(dbCount) {
    this.db = dbCount;
    dotenv.config();
    this.secretKey = process.env.SECRET_KEY ;
  }


  loginAuth() {
    return (req, res) => {
      const login = req.body.login;
      const passwd = req.body.password;

      const findEmployeesFilter = { loginname: login };

      Employees.findOne(findEmployeesFilter)
      .populate('userrole')
      .then((userObj) => {
        if (userObj) {
          if (userObj.loginname === login && userObj.password === passwd ) {
            const loginToken = jwt.sign(
              {
                id: userObj._id,
                firstname: userObj.firstname,
                lastname: userObj.lastname,
                userrole: userObj.userrole.role,
                read: userObj.userrole.read,
                addnew: userObj.userrole.addnew,
                update: userObj.userrole.update,
                assign: userObj.userrole.assign,
                unassign: userObj.userrole.assign,
                divisions: userObj.divs
              },
              this.secretKey,
              { expiresIn: '1h' }
            );
            res.json({
              msg: "Login Success!",
              token: loginToken,
              id: userObj._id,
              firstname: userObj.firstname,
              lastname: userObj.lastname,
              userrole: userObj.userrole.role,
              read: userObj.userrole.read,
              addnew: userObj.userrole.addnew,
              update: userObj.userrole.update,
              assign: userObj.userrole.assign,
              unassign: userObj.userrole.assign,
              divisions: userObj.divs
            });        
          } else {
            res.status(401).json({msg: "Invalid username or password"});
          }
        } else {
          res.status(401).json({msg: "Invalid username or password"});
        } 
      })
    }
  }

  chkToken(){
    return (req, res, next) => {
      const token = req.header('Authorization').split(' ')[1];

      try {
        const decoded = jwt.verify(token, this.secretKey)
        req.token = token;
        req.decoded = decoded;
        req.foundObj = {
          id: decoded.id,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
          userrole: decoded.userrole,
          divisions: decoded.divisions,
          read: decoded.read,
          addnew: decoded.addnew,
          update: decoded.update,
          assign: decoded.assign,
          unassign: decoded.assign
        }
        next();
      } catch ( err ) {
        res.status(401).json({err});
      }
    }
  }

  createUser() {
    return async (req, res, next) => {
      const genId = new mongoose.Types.ObjectId();
      const record = new Employees({
        _id: genId,
        userrole: req.body.userrole,
        divs: req.body.divs,
        oudivs: req.body.oudivs,
        loginname: req.body.loginname,
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone,
        address: req.body.address,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      });
      
      await record.save();
      res.json({
        msg: "Record Saved.",
        id: genId.toString()
      })
    }
  }

  hasAdminRight() {
    return (req, res, next) => {
      const userObj = req.decoded;
      Employees.findById(userObj.id)
      .populate('userrole')
      .then((emp, err) => {

        if (emp.userrole.assign && emp.userrole.unassign) {
          req.foundObj = { msg: "You are admin." }
          next();
        } else {
          res.status(405)
          .json({righterror: "You haven't enought right to do this"});
        }
      });
    }
  }
  
  hasIsSelfOrManage() {
    return (req, res, next) => {
      const userObj = req.decoded;
      Employees.findById(userObj.id)
      .populate('userrole')
      .then((emp, err) => {
        
        if (( emp.userrole.addnew && userObj.id === req.params.empid ) || emp.userrole.update) {
          req.foundObj = { msg: "You have right." }
          next();
        } else {
          res.status(405)
          .json({righterror: "You haven't enought right to do this"});
        }
      });
    }
  }

  updateEmployee() {
    return (req, res, next) => {
      const updateObj = {
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone,
        address: req.body.address,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      };

      console.log(" UpdateEmployee: ", updateObj);

      Employees.findByIdAndUpdate(req.params.empid, updateObj)
      .then((emp, err) => {
        req.err = err;
        console.log("UpdateEmployee Have Error: ", err);
        req.foundObj = emp;
        next();
      })
    }
  }

  regUser() {
    return (req, res, next) => {
      Employees.findByIdAndUpdate(req.params.uid, req.body)
      .then((emp, err) => {
        req.err = err;
        req.foundObj = emp;
        next();
      })
    }
  }
  
  sendObj() {
    return (req, res) => {
      const returnObj = req.err ? {obj: {err: req.err}, status: 400} 
          : {obj: req.foundObj, status: 200};
      res.status(returnObj.status).json(returnObj.obj);
    }
  }

  getOrgUnitDiv() {
    return (req, res, next) => {
      OrgUnitsDivisions.find({ orgunits : req.params.ouid})
      .populate('orgunits')
      .populate('divisions')
      .then((oudiv, err) => {
        req.err = err;
        req.foundObj = oudiv;
        next();
      });
    }
  }

  getAdminDivs() {
    return (req, res, next) => {
      const userObj = req.decoded;
      req.foundObj = req.decoded.divisions;
      next();
    }
  }

  getDivs() {
    return (req, res, next) => {
      Divisions.find()
      .then((div, err) => {
        req.foundObj = div;
        console.log("Found Div: ");
        console.log(req.foundObj);
        req.err = err;
        next();
      });
    }
  }

  getOrgUnits() {
    return (req, res, next) => {
      OrgUnits.find()
      .then((div, err) => {
        req.foundObj = div;
        req.err = err;
        next();
      });
    }
  }

  getUserRoles() {
    return (req, res, next) => {
      UserRoles.find()
      .then((ur, err) => {
        req.foundObj = ur;
        req.err = err;
        next();
      });
    }
  }

  getOrgUnitsDivById() {
    return (req, res, next) => {
      if ( req.params.oudivid !== "undefined" ) {
        OrgUnitsDivisions.findById(req.params.oudivid)
        .populate('orgunits')
        .populate('divisions')
        .then((oudiv, err) => {
          req.foundObj = { 
            orgunitsname: oudiv.orgunits.name,
            divisionsname: oudiv.divisions.name
          }
          req.err = err;
          next();
        });
      } else {
        req.err = { msg: "oudivid is undefined."};
        req.foundObj = {};
      }
    }
  }

  getDivById() {
    return (req, res, next) => {
      if ( req.params.divid !== "undefined" ) {
        Divisions.findById(req.params.divid)
        .then((dv, err) => {
          req.foundObj = dv;
          req.err = err;
          next();
        });
      } else {
        req.err = { msg: "divid is undefined."}
        req.foundObj = {};
      }
    }
  }

  getEmployees() {
    return (req, res, next) => {
      Employees.find({ divs : req.params.divid })
      .populate('userrole')
      .populate('divs')
      .populate({
        path: 'oudivs',
        populate: {
          path: 'divisions orgunits',
          select: 'name'
        }
      })
      .then((emp, err) => {
        req.err = err;
        req.foundObj = emp;
        next();
      })
    }
  }

  findUserById() {
    return (req, res, next) => {
      Employees.findById(req.params.empid)
      .populate('userrole')
      .then((emp, err) => {
        req.err = err;
        req.foundObj = emp;
        next();
      })
    }
  }
}

export default OrgUnitsAuth;
