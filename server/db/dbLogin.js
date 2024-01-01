const mysql = require('mysql2/promise');
const pool = require('./connection');

async function checkPassword(res, userName, password) {
const query = `SELECT username, password FROM users
JOIN passwords ON users.id = passwords.userId
WHERE username = ? AND password = ?`
try {
const [userExist ]= await pool.query(query, [userName, password]);
return userExist;
}
catch (err) {
    console.log(err);
    res.status(500).send(err);
};
}
module.exports = {
    checkPassword:checkPassword
};
 