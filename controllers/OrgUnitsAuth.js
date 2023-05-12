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
              login_name: userObj.loginname,
              login_id: userObj._id
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
}

export default OrgUnitsAuth;
