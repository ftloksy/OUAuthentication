import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { Employees, 
  OrgUnitsDivisions, 
  Divisions,
  OrgUnits,
  UserRoles } from '../models/OrgUnits.js';


/**
 * The OrgUnitsAuth class provides various middleware functions
 * for handling authentication and authorization related
 * to organizational units and divisions, including login authentication, 
 * token verification, user role checks, record creation, record updates, 
 * record retrieval, and record deletion.
 */
class  OrgUnitsAuth {
  constructor(dbCount) {
    this.db = dbCount;
    dotenv.config();
    this.secretKey = process.env.SECRET_KEY ;
  }

/**
 * The loginAuth() method is defined, which is a middleware function 
 * for handling login authentication. 
 * It expects a request with login and password in the request body. 
 * It searches for an employee with the provided login name in the Employees model, 
 * populates the userrole field, and verifies the password. 
 * If the login is successful, it generates a JSON Web Token (JWT) containing 
 * user information and returns it along with other user details. 
 * Otherwise, it returns an error message.
 */
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

/** 
 * The chkToken() method is a middleware function for checking the validity of a JWT. 
 * It expects the JWT to be present in the Authorization header as a Bearer token. 
 * It verifies the token and attaches the decoded token data to the request object 
 * for further processing. If the token is invalid, it returns an error message.
 */
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

/** 
 * The createUser() method is an asynchronous middleware function 
 * for creating a new employee record. 
 * It expects employee details in the request body and 
 * saves the record using the Employees model. 
 * It returns a response with a success message and the generated ID of the new record.
 */
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
      
      try {
        await record.save()

        req.foundObj = {
            msg: "Record Saved.",
            id: genId.toString()
          }
        
        next();

      } catch (err) {
        
        if ( err.code === 11000 ) {
          console.log("When Create user, Error:", err.code);
          console.log("{ loginname } duplicate key.");
          res.status(400)
          .json({errmessage: "{ loginname } duplicate key.",
            code: err.code});
        } else {
          res.status(400)
          .json({errmessage: "When Create user has bug."});
        }
      }
    }
  }

/**     
 * The hasAdminRight() method is a middleware function 
 * for checking if the user has admin rights. 
 * It retrieves the user object from the decoded JWT 
 * and checks if the user's userrole has the assign and unassign properties. 
 * ( Admin User Role )
 * 
 * If the user has admin rights, it continues to the next middleware; 
 * otherwise, it returns an error message.
 */
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

/** 
 * The hasIsSelfOrManage() method is a middleware function 
 * for checking if the user has the right to perform certain actions
 * on an employee record. 
 * It first checks if the employee with the specified empid is an Admin. 
 * If the employee is an admin, it returns an error message. 
 * Then it retrieves the user object from the decoded JWT 
 * and checks if the user has the rights 
 * ( update, include read and addnew right ).
 * and if the empid matches the user's own ID. If the user has the right, 
 * it continues to the next middleware; otherwise, it returns an error message.  
 */
  hasIsSelfOrManage() {
    return (req, res, next) => {
      const userObj = req.decoded;

      Employees.findById(req.params.empid)
      .populate('userrole')
      .then((emp, err) => {
        if ( emp.userrole.role === "Admin") {
          res.status(405)
          .json({righterror: "You haven't enought right to do this"});
        }
      })

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

/**
 * The updateEmployee() method is a middleware function 
 * for updating an employee record.
 * ( not include user roles and assign and unassign divisions and OUs detail).
 * It expects the updated employee details in the request body 
 * and updates the record using the Employees model. 
 * It attaches the updated employee object
 *  to the request object for further processing.
 */
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
        req.foundObj = emp;
        next();
      })
    }
  }

/**
 * The regUser() method is a middleware function 
 * for registering a user. It expects the user ID in the request parameters 
 * and the updated user details in the request body. 
 * It updates the user record using the Employees model 
 * and attaches the updated user object to the request object 
 * for further processing.
 */
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
  
/**
 * The getOrgUnitDiv() method is a middleware function 
 * for retrieving organizational units and divisions's name mapping.
 * see what divisions is under the organizational units.
 * 
 * It expects the organizational unit ID (ouid) in the request parameters. 
 * and populates the orgunits and divisions fields. 
 */
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

/**
 * The getOrgUnits() method is a middleware function
 * for retrieving all organizational units at the token has.
 */
  getAdminDivs() {
    return (req, res, next) => {
      const userObj = req.decoded;
      req.foundObj = req.decoded.divisions;
      next();
    }
  }


/**
 * The getDivs() method is a middleware function
 * for retrieving all divisions in database.
 * It searches for all division records in the Divisions model
 * and attaches them to the request object for further processing.
 */
  getDivs() {
    return (req, res, next) => {
      Divisions.find()
      .then((div, err) => {
        req.foundObj = div;
        req.err = err;
        next();
      });
    }
  }


/**
 * The getOrgUnits() method is a middleware function
 * for retrieving all organizational units in database.
 */
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

/**
 * The getUserRoles() method is a middleware function 
 * for retrieving all user roles. 
 */
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

/**
 * The getOrgUnitsDivById() method is a middleware function 
 * for retrieving organizational unit and division information by ID. 
 */
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

/**
 * The getDivById() method is a middleware function 
 * for retrieving a division by ID. 
 */
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

/**
 * The getEmployees() method is a middleware function 
 * for retrieving employees by division ID. 
 * It expects the division ID (divid) in the request parameters.
 */ 
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

/**
 * The findUserById() method is a middleware function 
 * for finding an employee by ID. 
 * It expects the employee ID (empid) in the request parameters. 
 */
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

/**     
 * The deleteEmployee() method is a middleware function 
 * for deleting an employee record. 
 * It expects the employee ID (empid) in the request parameters. 
 * It deletes the record using the Employees model 
 * and returns a response with a success message.
 */
  deleteEmployee () {
    return (req, res, next) => {
      console.log("In Delete Employee: ", req.params.empid);
      Employees.deleteOne({ _id: req.params.empid }) 
      .then((obj, err) => {
        req.err = err;
        req.foundObj = {msg: "Delete record success"};
        next();
      })
    };
  }

/**
 * The sendObj() method is a middleware function 
 * for sending the response object.
 */
  sendObj() {
    return (req, res) => {
      const returnObj = req.err ? {obj: {err: req.err}, status: 400} 
          : {obj: req.foundObj, status: 200};
      res.status(returnObj.status).json(returnObj.obj);
    }
  }

}

export default OrgUnitsAuth;
