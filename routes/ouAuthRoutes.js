import express from 'express';

import DbConnect from '../database/DbConnect.js';

import OrgUnitsAuth from '../controllers/OrgUnitsAuth.js';

const router = express.Router();
const dbConnect = new DbConnect();

const ouAuth = new OrgUnitsAuth(dbConnect);

// router.post('/test', ouAuth.testLogin());
// router.get('/finduser/:uid', ouAuth.chkToken(), ouAuth.findUser(), ouAuth.sendObj());
router.get('/hasright/:uid', ouAuth.chkToken(), ouAuth.hasAdminRight(), ouAuth.sendObj());

// User login. every user before login, don't care token.
router.post('/auth', ouAuth.loginAuth());

// Every user has right.
router.get('/checktoken', ouAuth.chkToken(), ouAuth.sendObj());

// Need the admin right to createuser. ( assign and unassign )
router.post('/createuser', ouAuth.chkToken(), 
  ouAuth.hasAdminRight(), ouAuth.createUser(), ouAuth.sendObj());

// Full user infomation update need admin right. ( assign and unassign )
router.post('/reguser/:uid', ouAuth.chkToken(), 
  ouAuth.hasAdminRight(), ouAuth.regUser(), ouAuth.sendObj());

// Need create a route for update account, but cann't change the user roles.
router.post('/updateemp/:empid', ouAuth.chkToken(), 
  ouAuth.hasIsSelfOrManage(), ouAuth.updateEmployee(), ouAuth.sendObj());

// Company account infomation, access it need the token.
router.get('/finduserbyid/:empid', ouAuth.chkToken(), ouAuth.findUserById(), ouAuth.sendObj());
router.get('/getadmindivs', ouAuth.chkToken(), ouAuth.getAdminDivs(), ouAuth.sendObj());
router.get('/getdivs', ouAuth.chkToken(), ouAuth.getDivs(), ouAuth.sendObj());
router.get('/getemps/:divid', ouAuth.chkToken(), ouAuth.getEmployees(), ouAuth.sendObj());

// Company Structure info, don't care token.
router.get('/getdivnamebyid/:divid', ouAuth.getDivById(), ouAuth.sendObj());
router.get('/getuserroles', ouAuth.getUserRoles(), ouAuth.sendObj());
router.get('/getoudiv/:ouid', ouAuth.getOrgUnitDiv(), ouAuth.sendObj());
router.get('/getoudivnamebyid/:oudivid', ouAuth.getOrgUnitsDivById(), ouAuth.sendObj());
router.get('/getou', ouAuth.getOrgUnits(), ouAuth.sendObj());

export default router;
