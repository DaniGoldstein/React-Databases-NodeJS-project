const mysql = require('mysql2/promise');
const pool = require('./connection');


async function getUserId(userName) {

const query = `SELECT id FROM users
WHERE username = ?`;


    const [userId] = await pool.query(query, [userName]);
    
    return userId;

}
module.exports = {
   getUserId: getUserId,
};
 