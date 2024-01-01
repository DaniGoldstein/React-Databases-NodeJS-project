const pool = require('../db/connection');

async function checkPermission(userId, password) {
    try {
    const query = `SELECT username, password FROM users
    JOIN passwords ON users.id = passwords.userId
    WHERE username = ? AND password = ?`;
    const [user] =await pool.query(query, [userId, password])
    console.log(user);
    return user>0;
}
    catch (err) {
        console.log(err);
    };

};

async function checkPostPermission(userName, password,postId) {
    const userPermission = await checkPermission(userName, password);
    if(!userPermission){return false};
try {
    const query = `SELECT username, posts.id  FROM users   
    WHERE username = ? 
    JOIN posts ON posts.userId = users.id 
    `;
    const [post] =await pool.query(query, [postId,userId])
return post.length > 0;}
    catch (err) {
        console.log(err);
    };


};


module.exports = {
  checkPermission: checkPermission,
  checkPostPermission: checkPostPermission

};