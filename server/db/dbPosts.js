const mysql = require('mysql2/promise');
const pool = require('./connection');
const { post } = require('../routes/todosRoute');



async function getAllDbPosts(res) {

    try {
        const [posts] = await pool.query
            (`SELECT * FROM posts`);
        return posts;
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};

async function getPostsById(res, userId) {

    try {
        const query = `SELECT * FROM posts
    WHERE userId =?`;
        const [posts] = await pool.query(query, [userId]);
        return posts;
    }
    catch (err) {
        res.status(500).json({ error: err });
    }

}

async function searchLatter(res, latter) {

    try {
        const query = `SELECT * FROM posts
    WHERE title LIKE ? OR body LIKE?`;
        const [posts] = await pool.query(query, [`%${latter}%`,`%${latter}%`]);
        return (posts);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

async function getSearchPostsById(res, userId, latter) {

    try {
        const query = `SELECT * FROM posts
    WHERE userId =? AND title LIKE?  OR body LIKE?`;
        const [posts] = await pool.query(query, [userId,`%${latter}%`,`%${latter}%`]);
        console.log(posts);
        return posts;
    }
    catch (err) {
        res.status(500).json({ error: err });
    }


}
async function getComments(res, postId) {
    try {
        const query = `SELECT * FROM comments
 WHERE postId = ?`;
        const [comments] = await pool.query(query, [postId]);
        return comments;
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}
 async function addPost(res, post) {

    try {
        const query = `INSERT INTO posts (userId, title, body)
    VALUES (?,?,?)`;
        const [posts] = await pool.query(query, [post.userId, post.title, post.body]);
        return posts;
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

async function addComment(res, comment) {
    try {
        const query = `INSERT INTO comments (postId, name, email,body)
    VALUES (?,?,?,?)`;
        const [comments] = await pool.query(query, [comment.postId, comment.name, comment.email,comment.body]);
        return comments;
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}







module.exports = {
    getAllDbPosts: getAllDbPosts,
    getComments: getComments,
    searchLatter: searchLatter,
    getPostsById: getPostsById,
    getSearchPostsById: getSearchPostsById,
    addPost: addPost,
    addComment: addComment,
   
}