const joi = require('joi');

const pool = require('../db/connection');


async function checkUser(userId) {
  try {
    const query = `SELECT * FROM users WHERE id =?`;
    const [user] = await pool.query(query, [userId]);
    console.log(user);
    if (user.length > 0) {
      return true;
    }
    return false;

  } catch (err) {
    res.status(500).send({ error: err });
  }
}


async function checkPost(postId) {
  try {
    const query = `SELECT * FROM posts WHERE id =?`;
    const [post] = await pool.query(query, [postId]);
    if (post.length > 0) {

      return true;
    }
    return false;
  } catch (err) {
    res.status(500).send({ error: err });
  }
};


module.exports = {
  // validateAddPost: validateAddPost,
  checkUser: checkUser,
  checkPost: checkPost
};






