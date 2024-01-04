
const dbTodos = require("../db/dbTodos.js");
const express = require('express');
const todosRoute = express.Router();
const checkPermission = require('./checkPermission.js');



todosRoute.get("/", async (req, res) => {

    const query = req.query;
    const { userId } = query;
    const { completed } = query;
    const { searchLatter } = query;
    try {
        if (searchLatter) {
            const todos = await dbTodos.searchLatter(userId, searchLatter);
            res.json(todos);
        }

        else if (completed == "false") {
            const unCompletedTodos = await dbTodos.getUnCompleted(userId);
            res.json(unCompletedTodos);
        }

        else {


            const [todos] = await dbTodos.getDbTodos(userId);
            res.json(todos);
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})





todosRoute.post("/", async (req, res) => {
    const todo = req.body;
    const { userId } = todo;

    try {

        const { auth } = req.headers;
        
        const userDetails = auth.split(":");
        
        const isPermissioned = await checkPermission.checkUserPermission(userDetails[0], userDetails[1]);
        const isAdmin = await checkPermission.checkAdmin(userDetails[0], userId);
        
         
        if (!isPermissioned || !isAdmin) {
            res.status(400).send({ error: "Permission denied" });
            return;
        }

        const affectedRows = await dbTodos.postDbTodos(todo);

        if (affectedRows) {
            const [todos] = await dbTodos.getDbTodos(userId);
            res.json(todos);
        }
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: err });
    }
});

todosRoute.patch("/updateCompleted/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    const completed = req.body;
    const { userId } = req.body;
    try {
        const affectedRows = await dbTodos.updateCompletedTodos(todoId, completed);
        if (affectedRows) {
            const [todos] = await dbTodos.getDbTodos(userId);
            res.json(todos);
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }

})


todosRoute.patch("/updateTodos/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    const { title } = req.body;
    const { userId } = req.body;
    try {
        const affectedRows = await dbTodos.updateTodos(todoId, title);

        if (affectedRows) {
            const [todos] = await dbTodos.getDbTodos(userId);
            res.json(todos);
        }
    }
    catch (err) {
        res.status(500).json({ error: err });

    }


})

todosRoute.delete("/delete/:todoId", async (req, res) => {
    const { todoId } = req.params;
    const { userid } = req.headers;
    const { auth } = req.headers;
    const userDetails = auth.split(":");
   
    try {
        const isPermissioned = await checkPermission.checkTodoPermission(userDetails[0], userDetails[1], todoId);
        if (!isPermissioned) { 
           
            res.status(400).send({ error: "Permission denied" }); return; }

        const affectedRows = await dbTodos.deleteDbTodos(todoId);
       
        if (affectedRows>0) {
            const [todos] = await dbTodos.getDbTodos(userid);
            console.log(todos);
            res.json(todos);

        }
        else { (res.status(200).json({ error: "Todo not found" })) }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})
module.exports = todosRoute;


