const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match');

router.post('/insertmatchdata', matchController.insertData);

router.get('/getmatchdata', matchController.getMatchData);

router.get('/getmatchdatabyid/:id', matchController.getMatchDataById);

router.get('/getmatchdatabyyear', matchController.getMatchByYear);

router.get('/getmatchbyteamname', matchController.getByTeamName);

router.get('/getteamnames', matchController.getTeamNames);

router.get('/getvenuedata', matchController.getVenueData);

router.post('/matchprediction', matchController.matchPrediction);

module.exports = router;
