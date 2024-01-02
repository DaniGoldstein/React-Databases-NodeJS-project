const mysql = require('mysql2/promise');
const pool = require('./connection');
const { post } = require('../routes/todosRoute');



async function getAllDbPosts() {

        const [posts] = await pool.query
            (`SELECT * FROM posts`);
        return posts;
   
};

async function getPostsById(userId) {

        const query = `SELECT * FROM posts
    WHERE userId =?`;
        const [posts] = await pool.query(query, [userId]);
        return posts;

}

async function searchLatter(latter) {

   
        const query = `SELECT * FROM posts
    WHERE title LIKE ? OR body LIKE?`;
        const [posts] = await pool.query(query, [`%${latter}%`,`%${latter}%`]);
        return (posts);
   
}

async function getSearchPostsById(userId, latter) {

    
        const query = `SELECT * FROM posts
    WHERE userId =? AND title LIKE?  OR body LIKE?`;
        const [posts] = await pool.query(query, [userId,`%${latter}%`,`%${latter}%`]);
        console.log(posts);
        return posts;
    

}
async function getComments(postId) {
   
        const query = `SELECT * FROM comments
 WHERE postId = ?`;
        const [comments] = await pool.query(query, [postId]);
        return comments;
    }
 

 async function addPost(post) {
        const query = `INSERT INTO posts (userId, title, body)
    VALUES (?,?,?)`;
        const [posts] = await pool.query(query, [post.userId, post.title, post.body]);
        return posts;
    
   
}

async function addComment(comment) {
 
        const query = `INSERT INTO comments (postId, name, email,body)
    VALUES (?,?,?,?)`;
        const [comments] = await pool.query(query, [comment.postId, comment.name, comment.email,comment.body]);
        return comments;
}

async function updatePost(id, body) {
  
        const query = `UPDATE posts SET body =? WHERE id =?`;
        const [posts] = await pool.query(query, [body, id]);
        return posts;

}



async function deletePost(id) {
   
        const query = `DELETE FROM posts WHERE id =?`;
        const [{affectedRows}] = await pool.query(query, [id]);
        console.log(affectedRows);
        return affectedRows;

}



module.exports = {
    getAllDbPosts: getAllDbPosts,
    getComments: getComments,
    searchLatter: searchLatter,
    getPostsById: getPostsById,
    getSearchPostsById: getSearchPostsById,
    addPost: addPost,
    addComment: addComment,
   updatePost: updatePost,
    deletePost: deletePost
}