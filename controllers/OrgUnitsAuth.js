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

  testLogin() {
    return (req, res) => {
      const login = req.body.login;
      const passwd = req.body.password;

      res.json({msg: 'Welcome!! ' + login + ': ' + passwd});
    }
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
          console.log("Login: ");
          console.log(userObj);
          console.log(userObj.loginname);
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
      console.log("Auth Header: ", req.header('Authorization').split(' ')[1]);
      console.log("Express Token: ");
      console.log(token);
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

  helloWorld() {
    return (req, res) => {
      res.json({msg: "Hello !" + req.params.uid });
    }
  }

  findUser() {
    return (req, res, next) => {
      const userObj = req.decoded;
      Employees.findById(userObj.id)
      .then((emp, err) => {
        req.err = err;
        req.foundObj = emp;
        next();
      })
    }
  }

  createUser() {
    return async (req, res, next) => {
      console.log("Firstname: ", req.body.firstname);
      console.log("Lastname: ", req.body.lastname);
      console.log("Address: ", req.body.address);
      console.log("Telephone: ", req.body.telephone);
      console.log("Email: ", req.body.email);
      console.log("Loginname: ", req.body.loginname);
      console.log("Password: ", req.body.password);
      console.log("Userrole: ", req.body.userrole);
      console.log("Divisions: ", req.body.divs);
      console.log("Org Units - Divisions: ", req.body.oudivs);

      const record = new Employees({
        _id: new mongoose.Types.ObjectId(),
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
      res.json({msg: "Record Saved."})

      // const obj = await record.save();
      // console.log("Create User Obj: ", obj);
      // const returnObj = {
      //   firstname: obj.firstname,
      //   lastname: obj.lastname,
      //   email: obj.email,
      //   telephone: obj.telephone,
      //   address: obj.address,
      //   loginname: obj.loginname,
      // }
      
      // try {
      //     const parsedData = JSON.parse(returnObj);
      //     console.log('JSON data is valid:', parsedData);
      //   } catch (error) {
      //     console.error('Invalid JSON data:', error);
      //   }

      // res.foundObj = obj;
      // next();

    }
  }

  // This need to follow development.
  hasRight(action) {
    return (req, res, next) => {
      const userObj = req.decoded;
      console.log("ID in Has Right. :");
      console.log(userObj.id);
      console.log("Request in ID :");
      console.log(req.params.uid );
      Employees.findById(userObj.id)
      .populate('userrole')
      .then((emp, err) => {
        console.log("Has Right HERE.");
        console.log(emp);
        req.err = err;
        res.foundObj = emp;
        if (action === 'hello') {
          next();
        } else {
          res.status(405)
          .json({righterror: "You haven't enought right to do this"});
        }
      });
    }
  }

  regUser() {
    return (req, res, next) => {
      //const userObj = req.decoded;
      //console.log("User id in regUser: ");
      //console.log(userObj.id);
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
        console.log("OUID in getOrgDiv: ");
        console.log(oudiv);
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

  getOrgUnits() {
    return (req, res, next) => {
      OrgUnits.find()
      .then((div, err) => {
        req.foundObj = div;
        console.log("Found Div: ");
        console.log(req.foundObj);
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
        console.log("Found UserRole: ");
        console.log(req.foundObj);
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
        console.log("Emps List: ", emp)
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
