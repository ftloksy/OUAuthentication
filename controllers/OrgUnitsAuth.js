import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { Employees } from '../models/OrgUnits.js';

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

      Employees.findOne({password: passwd})
      .then((userObj) => {
        console.log("Login: ");
        console.log(userObj);
        console.log(userObj.loginname);
        if (userObj.loginname === login) {
          const loginToken = jwt.sign(
            {
              id: userObj._id
            },
            this.secretKey,
            { expiresIn: '1h' }
          );
          res.json({
            msg: "Login Success!",
            taken: loginToken
           });        
        } else {
          res.json({msg: "Invalid username or password"});
        } 
      })
    }
  }

  chkPwd(){
    return (req, res, next) => {
      const token = req.header('Authorization').split(' ')[2]
      console.log("Express Token: ");
      console.log(token);
      try {
        const decoded = jwt.verify(token, this.secretKey)
        req.token = token;
        req.decoded = decoded;
        next();
      } catch ( err ) {
        res.status(401).json({err});
      }
    }
  }

  helloWorld() {
    return (req, res) => {
      res.json({msg: "Hello !"});
    }
  }

  findUser() {
    return (req, res, next) => {
      const userObj = req.decoded;
      Employees.findById(userObj.id)
      .then((emp, err) => {
        req.err = err;
        req.emp = emp;

        //if (err) {
        //  res.status(401).json({err});
        //} else {
        //  res.json(emp);
        //}

        next();
      })
    }
  }

  regUser() {
    return (req, res) => {
      const userObj = req.decoded;
      Employees.findByIdAndUpdate(userObj.id, req.body)
      .then((emp, err) => {
        req.err = err;
        req.emp = emp;
        next();
      })
    }
  }
  
  sendObj() {
    return (req, res) => {
      const returnObj = req.err ? {obj: {err: req.err}, status: 400} 
          : {obj: req.emp, status: 200};
      res.status(returnObj.status).json(returnObj.obj);
    }
  }

}

export default OrgUnitsAuth;
