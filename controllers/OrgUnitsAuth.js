import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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

      const findEmployeesFilter = {
        $or: [
          { password: passwd },
          { loginname: login }
        ]
      }

      Employees.findOne(findEmployeesFilter)
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
                lastname: userObj.lastname
              },
              this.secretKey,
              { expiresIn: '1h' }
            );
            res.json({
              msg: "Login Success!",
              token: loginToken,
              firstname: userObj.firstname,
              lastname: userObj.lastname
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
          firstname: decoded.firstname,
          lastname: decoded.lastname
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
      const userObj = req.decoded;
      console.log("User id in regUser: ");
      console.log(userObj.id);
      Employees.findByIdAndUpdate(userObj.id, req.body)
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
    }
  }

  getDivById() {
    return (req, res, next) => {
      Divisions.findById(req.params.divid)
      .then((dv, err) => {
        req.foundObj = dv;
        req.err = err;
        next();
      });
    }
  }

}

export default OrgUnitsAuth;
