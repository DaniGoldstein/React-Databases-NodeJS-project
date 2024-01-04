
const permission= require('./checkPermission.js')
const dbLogin = require('../db/dbLogin.js')
const express = require('express');
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    const query = req.query;
    const { userName } = query;
    const { password } = query;
    try{
        const userIdResult = await dbLogin.getUserId(userName);
        const [{ id } = {}] = userIdResult || [];
    const userExist = await permission.checkUserPermission(userName, password);
    
    if (userExist) {
        const response ={userExist: userExist,userid: id};
        console.log(response);
        res.json(response);
        
    }
    else {console.log("User not found");
         const response ={userExist: false}
         res.status(200).json(response)// לבטל את הבדיקה בקליינט
    }}
    catch(error){
   
    res.status(500).send('Error: ' + error)
    }
})

module.exports = userRoute;


// const permission = require('./checkPermission.js');
// const dbLogin = require('../db/dbLogin.js');
// const express = require('express');
// const userRoute = express.Router();

// userRoute.get('/', async (req, res) => {
//     const query = req.query;
//     const { userName } = query;
//     const { password } = query;

//     try {
//         // Ensure that dbLogin.getUserId(userName) returns an array
//         const userIdResult = await dbLogin.getUserId(userName);
//         const [{ id } = {}] = userIdResult || [];

//         const userExist = await permission.checkUserPermission(userName, password);
//         console.log("11111",userExist);

//         if (userExist) {
//             res.json({ userExist: userExist, userid: id });
//             console.log("55555",userExist);

//         } else {
//             console.log("2222",userExist);
//             res.status(401).json({ userExist: false }); // Cancel the check on the client
//         }
//     } catch (error) {
//         console.log("123");
//         res.status(500).send('Error: ' + error);
//     }
// });

// module.exports = userRoute;
