const pool = require("./connection.js");

async function getUserName(id) {
    const query = `SELECT username FROM users WHERE id = ?`;
    const username = await pool.query(query, [id])
    console.log(username);
    return username;

}

module.exports =
{
    getUserName: getUserName
};