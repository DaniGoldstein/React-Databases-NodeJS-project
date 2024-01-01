const dbPosts = require("../db/dbPosts.js");
const express = require('express');
const validate = require('./validPosts.js');
const checkPermission = require('./checkPermission.js');
const joi = require('joi');


const postsRoute = express.Router();



postsRoute.get("/", async (req, res) => {

    const { userId } = req.query;
    const { searchLatter } = req.query;

    if (searchLatter && userId) {
        const isUser = await validate.checkUser(userId, res);
        if (!isUser) { res.status(400).send({ error: "User not found" }); return; }
        const posts = await dbPosts.getSearchPostsById(res, userId, searchLatter);
        res.json(posts);
    }

    else if (userId) {
        const isUser = await validate.checkUser(userId, res);
        if (!isUser) { res.status(400).send({ error: "User not found" }); return; }
        const posts = await dbPosts.getPostsById(res, userId);
        res.json(posts);
    }


    else if (searchLatter) {
        const posts = await dbPosts.searchLatter(res, searchLatter);
        res.json(posts);
    }
    else {
        const allPosts = await dbPosts.getAllDbPosts(res);

        res.json(allPosts)
    }
}

);


postsRoute.get("/:id/comments", async (req, res) => {

    const { id } = req.params;
    const isPost = await validate.checkPost(id);
    if (!isPost) { res.status(400).send({ error: "Post not found" }); return; }
    const comments = await dbPosts.getComments(res, id);
    res.json(comments)
})


postsRoute.post("/", async (req, res) => {
    const post = req.body;
    const isUser = await validate.checkUser(post.userId);
    if (!isUser) { res.status(400).send({ error: "User not found" }); return; }

    const affectedRows = await dbPosts.addPost(res, post);
    if (affectedRows) {
        const posts = await dbPosts.getAllDbPosts(res, post.userId);
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
        const comments = await dbPosts.getComments(res, comment.postId);
        res.json(comments);
    }
    else {
        res.status(400).json({ error: "Failed to add comment" });
    }

});

postsRoute.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const {auth} = req.headers;
    const userDetails = auth.split(":");
    const isPermissioned = await checkPermission.checkPostPermission(userDetails[0],userDetails[1],id);
    if (!isPermissioned) { res.status(400).send({ error: "Permission denied" }); return; }
   
    const { body } = req.body;
    const isPost = await validate.checkPost(id);
    if (!isPost) { res.status(400).send({ error: "post not found" }); return; }
    const goodQuery = await dbPosts.updatePost(id, body);
    if (goodQuery) {
        const posts = await dbPosts.getAllDbPosts(res, id);
        res.json(posts);
    }
    else {
        res.status(400).json({ error: "Failed to update post" });
    }
});



module.exports = postsRoute;

