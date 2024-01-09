const pool = require("./connection.js");

async function getUserName(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const [user] = await pool.query(query, [id])
    
    return user;

}

module.exports =
{
    getUserName: getUserName
};