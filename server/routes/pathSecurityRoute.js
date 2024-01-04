const express = require('express');
const pathRoute = express.Router();
const pathPermission = require('./checkPermission');


pathRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    const {auth} = req.headers; 
    const userDetails = auth.split(':');
    try {
        const result = await pathPermission.checkPathPermission(userDetails[0],userDetails[1],id);
        console.log(result);
        res.json(result);
        
    } catch (error) {
        res.status(500).send('Error:'+ error);
    }
});

module.exports = pathRoute;