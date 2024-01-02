
const permission= require('./checkPermission.js')
const dbLogin = require('../db/dbLogin.js')
const express = require('express');
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    const query = req.query;
    const { userName } = query;
    const { password } = query;
    try{
    const [{id}] = await dbLogin.getUserId(userName);
    const userExist = await permission.checkUserPermission(userName, password);
    if (userExist) {console.log(id);
        res.json({userExist: userExist,userid: id});
        
    }
    else {
        res.status(401).send('Invalid username or password')// לבטל את הבדיקה בקליינט
    }}
    catch(error){res.status(500).send('Error: ' + error)}
})

module.exports = userRoute;
