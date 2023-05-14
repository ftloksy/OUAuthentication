import express from 'express';

import DbConnect from '../database/DbConnect.js';

import OrgUnitsAuth from '../controllers/OrgUnitsAuth.js';

const router = express.Router();
const dbConnect = new DbConnect();

const ouAuth = new OrgUnitsAuth(dbConnect);

router.post('/test', ouAuth.testLogin());

router.post('/auth', ouAuth.loginAuth());

router.get('/checkpwd', ouAuth.chkPwd(), ouAuth.helloWorld());

router.get('/finduser', ouAuth.chkPwd(), ouAuth.findUser(), ouAuth.sendObj());

router.post('/reguser', ouAuth.chkPwd(), ouAuth.regUser(), ouAuth.sendObj());

export default router;

