const express = require('express');
const homeRoute = express.Router();
const homeDb = require('../db/homeDb.js');

homeRoute.get('/:userId', async (req, res) => {
const { userId } = req.params;
try{
    const [[{username}]]= await homeDb.getUserName(userId);
    res.json(username);
}

catch(error)
{res.status(500).send('Error: ' + error)}

});

module.exports = homeRoute;