const dbPosts = require("../db/dbPosts.js");
const express = require('express');
const validate = require ('./validPosts.js');
const joi = require('joi');


const postsRoute = express.Router();



postsRoute.get("/", async (req, res) => {

    const { userId } = req.query;
    const { searchLatter } = req.query;

    if (searchLatter && userId) {
        const posts = await dbPosts.getSearchPostsById(res, userId ,searchLatter);
        res.json(posts);
    }

   else if (userId) { 
        const posts = await dbPosts.getPostsById(res, userId);
        res.json(posts);
    }


   else if (searchLatter) {
        const posts = await dbPosts.searchLatter(res, searchLatter);
        res.json(posts);
    }
    else {
        const allPosts = await dbPosts.getAllDbPosts(res);
        console.log(allPosts);
        res.json(allPosts)
    }
}

);


postsRoute.get("/:id/comments", async (req, res) => {

    const { id } = req.params;

    const comments = await dbPosts.getComments(res, id);
    res.json(comments)
})


postsRoute.post("/",validate.validateAddPost, async (req, res) => {

    const post = req.body;
    const affectedRows = await dbPosts.addPost(res, post);
    if (affectedRows) {
      const  posts = await dbPosts.getAllDbPosts(res,post.userId);
        res.json(posts);
    }
    else {
        res.status(400).json({ error: "Failed to add post" });
    }


})


postsRoute.post("/:id/comments", async (req, res) => {

    const comment = req.body;
    const affectedRows = await dbPosts.addComment(res, comment);
    if (affectedRows) {
      const  comments = await dbPosts.getComments(res,comment.postId);
        res.json(comments);
    }
    else {
        res.status(400).json({ error: "Failed to add comment" });
    }

});



module.exports = postsRoute;

