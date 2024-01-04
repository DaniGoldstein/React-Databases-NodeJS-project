const pool = require('../db/connection');

async function checkPermission(username, password) {
    const query = `SELECT username, password FROM users
    JOIN passwords ON users.id = passwords.userId
    WHERE username = ? AND password = ?`;
    
    const [user] =await pool.query(query, [username, password])
    return user.length>0;

   

};

async function checkPathPermission(username, password,id) {
  const query = `SELECT username, password FROM users
  JOIN passwords ON users.id = passwords.userId
  WHERE username = ? AND password = ? AND users.id =?`;
  const [user] =await pool.query(query, [username, password, id])
  return user.length>0;

 

};

async function checkPostPermission(userName, password,postId) {
    const userPermission = await checkPermission(userName, password);
    if(!userPermission){;{return false}};

    const query = `SELECT username, posts.id
    FROM users
    JOIN posts ON posts.userId = users.id
    WHERE username = ? AND posts.id =?`;
    
    ;
    const [certified] =await pool.query(query, [userName,postId]);
    console.log(certified);
    return certified.length > 0;


};

async function checkTodoPermission(userName, password,todoId) {
  const userPermission = await checkPermission(userName, password);
  if(!userPermission){return false};

  const query = `SELECT username, todos.id
  FROM users
  JOIN todos ON todos.userId = users.id
  WHERE username = ? AND todos.id =?`;
  
  ;
  const [certified] =await pool.query(query, [userName,todoId]);
  console.log(certified);
  return certified.length > 0;


};

async function checkAdmin(userName, userId) {
  const query = `SELECT username, id
  FROM users
  WHERE username =? AND id =?`;

  const [certified] =await pool.query(query, [userName,userId]);
  console.log(certified);
  return certified.length > 0;
  
}






module.exports = {
  checkUserPermission: checkPermission,
  checkPostPermission: checkPostPermission,
  checkTodoPermission: checkTodoPermission,
  checkAdmin: checkAdmin,
  checkPathPermission: checkPathPermission,

};