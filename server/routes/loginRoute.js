const dbUsers = require('../db/dbLogin');
const express = require('express');
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    const query = req.query;
    const { userName } = query;
    const { password } = query;
    const userExist = await dbUsers.checkPassword(res, userName, password);
    if (userExist.length > 0) {
        res.send(userExist)
    }
    else {
        res.status(401).send('Invalid username or password')// לבטל את הבדיקה בקליינט
    }
})

module.exports = userRoute;
