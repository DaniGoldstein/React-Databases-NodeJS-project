
const dbTodos = require("../db/dbTodos.js");
const express = require('express');
const todosRoute = express.Router();



todosRoute.get("/", async (req, res) => {

    const query = req.query;
    const { userId } = query;
    const { completed } = query;
    const { searchLatter } = query;

    if (searchLatter) {
        const todos = await dbTodos.searchLatter(res, userId, searchLatter);
        res.json(todos);
    }

    else if (completed == "false") {
        const unCompletedTodos = await dbTodos.getUnCompleted(res, userId);
        res.json(unCompletedTodos);
    }

    else {


        const todos = await dbTodos.getDbTodos(res, userId);
        res.json(todos);
    }

})



todosRoute.post("/", async (req, res) => {

    const todo = req.body;
    const { userId } = todo;
    const affectedRows = await dbTodos.postDbTodos(res, userId, todo);
    if (affectedRows) {
        const todos = await dbTodos.getDbTodos(res, userId);
        res.json(todos);
    }


})

todosRoute.patch("/updateCompleted/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    const completed = req.body;
    const { userId } = req.body;
    const affectedRows = await dbTodos.updateCompletedTodos(res, todoId, completed);
    if (affectedRows) {
        const todos = await dbTodos.getDbTodos(res, userId);
        res.json(todos);
    }


})


todosRoute.patch("/updateTodos/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    const { title } = req.body;
    const { userId } = req.body;
    const affectedRows = await dbTodos.updateTodos(res, todoId, title);
    if (affectedRows) {
        const todos = await dbTodos.getDbTodos(res, userId);
        res.json(todos);
    }


})

todosRoute.delete("/delete/:todoId", async (req, res) => {
    const { todoId } = req.params;
    const affectedRows = await dbTodos.deleteDbTodos(res, todoId);
    if (affectedRows) {
        res.send();
    }
    else { (res.status(404).json({ error: "Todo not found" })) }
})
module.exports = todosRoute;


