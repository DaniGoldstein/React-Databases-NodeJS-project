const dbPosts = require("../db/dbPosts.js");
const express = require('express');
const validate = require('./validPosts.js');
const checkPermission = require('./checkPermission.js');
const postsRoute = express.Router();



postsRoute.get("/", async (req, res) => {

    const { userId } = req.query;
    const { searchLatter } = req.query;
    try {
        if (searchLatter && userId) {
            const isUser = await validate.checkUser(userId);
            if (!isUser) { res.status(400).send({ error: "User not found" }); return; }
            const posts = await dbPosts.getSearchPostsById(userId, searchLatter);
            res.json(posts);
        }

        else if (userId) {
            const isUser = await validate.checkUser(userId);
            if (!isUser) { res.status(400).send({ error: "User not found" }); return; }
            const posts = await dbPosts.getPostsById(userId);
            res.json(posts);
        }


        else if (searchLatter) {
            const posts = await dbPosts.searchLatter(searchLatter);
            res.json(posts);
        }
        else {
            const allPosts = await dbPosts.getAllDbPosts();

            res.json(allPosts)
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

);


postsRoute.get("/:id/comments", async (req, res) => {

    const { id } = req.params;
    try {
        const isPost = await validate.checkPost(id);

        if (!isPost) { res.status(400).send({ error: "Post not found" }); return; }
        const comments = await dbPosts.getComments(id);
        res.json(comments)
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})


postsRoute.post("/", async (req, res) => {
    const post = req.body; try {
        const isUser = await validate.checkUser(post.userId);

        if (!isUser) { res.status(400).send({ error: "User not found" }); return; }

        const affectedRows = await dbPosts.addPost(post);
        if (affectedRows) {
            const posts = await dbPosts.getAllDbPosts(post.userId);
            res.json(posts);
        }
        else {
            res.status(400).json({ error: "Failed to add post" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }


})


postsRoute.post("/:id/comments", async (req, res) => {

    const comment = req.body;
    try {
        const affectedRows = await dbPosts.addComment(comment);
        if (affectedRows) {
            const comments = await dbPosts.getComments(comment.postId);
            res.json(comments);
        }
        else {
            res.status(400).json({ error: "Failed to add comment" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }

});

postsRoute.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { auth } = req.headers;
    const userDetails = auth.split(":");
    try {
        const isPermissioned = await checkPermission.checkPostPermission(userDetails[0], userDetails[1], id);


        if (!isPermissioned) { res.status(400).send({ error: "Permission denied" }); return; }

        const { body } = req.body;
        const isPost = await validate.checkPost(id);
        if (!isPost) { res.status(400).send({ error: "post not found" }); return; }
        const goodQuery = await dbPosts.updatePost(id, body);
        if (goodQuery) {
            const posts = await dbPosts.getAllDbPosts(id);
            res.json(posts);
        }
        else {
            res.status(400).json({ error: "Failed to update post" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

postsRoute.delete("/delete/:id", async (req, res) => {

    const { id } = req.params;
    const { auth } = req.headers;
    const userDetails = auth.split(":");
    try {

        const isPermissioned = await checkPermission.checkPostPermission(userDetails[0], userDetails[1], id);
        if (!isPermissioned) { res.json(false); return; }
        const affectedRows = await dbPosts.deletePost(id);
        if (affectedRows) {


            const posts = await dbPosts.getAllDbPosts();
            console.log(posts);
            res.json(posts);

        }
        else { res.status(400).json({ error: "Failed to delete post" }); }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})



module.exports = postsRoute;

