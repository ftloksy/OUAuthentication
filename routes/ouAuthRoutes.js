import express from 'express';

import DbConnect from '../database/DbConnect.js';

import OrgUnitsAuth from '../controllers/OrgUnitsAuth.js';

const router = express.Router();
const dbConnect = new DbConnect();

const ouAuth = new OrgUnitsAuth(dbConnect);

router.post('/test', ouAuth.testLogin());

router.post('/auth', ouAuth.loginAuth());

router.get('/checkpwd/:uid', ouAuth.chkToken(), ouAuth.helloWorld());

router.get('/finduser/:uid', ouAuth.chkToken(), ouAuth.findUser(), ouAuth.sendObj());

router.post('/reguser/:uid', ouAuth.chkToken(), ouAuth.regUser(), ouAuth.sendObj());

router.get('/hasright/:uid', ouAuth.chkToken(), ouAuth.hasRight('hello'), ouAuth.sendObj());

router.get('/getoudiv/:ouid', ouAuth.getOrgUnitDiv(), ouAuth.sendObj());

router.get('/getou', ouAuth.getOrgUnits(), ouAuth.sendObj());

router.get('/getdiv', ouAuth.getDivs(), ouAuth.sendObj());

router.get('/getoudivnamebyid/:oudivid', ouAuth.getOrgUnitsDivById(), ouAuth.sendObj());

router.get('/getdivnamebyid/:divid', ouAuth.getDivById(), ouAuth.sendObj());

router.get('/getuserroles', ouAuth.getUserRoles(), ouAuth.sendObj());

export default router;

