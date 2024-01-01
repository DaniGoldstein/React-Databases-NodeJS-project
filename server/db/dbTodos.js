const mysql = require('mysql2/promise');
const pool = require('./connection');



async function getDbTodos(res, userId) {
    try {
        const query = `SELECT * FROM todos
    WHERE userId  = ?`;

        const [todos] = await pool.query(query, [userId]);
        return (todos);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

async function getUnCompleted(res, userId) {
    try {
        const query = `SELECT * FROM todos
    WHERE userId  = ? AND completed = 0`;
        const [todos] = await pool.query(query, [userId]);
        return (todos);
    }

    catch (err) {
        res.status(500).json({ error: err });
    }
}

async function searchLatter(res, userId, searchLatter) {
    const query = `SELECT * FROM todos
    WHERE userId  =? AND title LIKE ?`;
    const [todos] = await pool.query(query, [userId, `%${searchLatter}%`]);
    return (todos);
}

async function postDbTodos(res, userId, todo) {
    const postTodo = [todo.userId, todo.title, todo.completed];
    try {
        const query = `INSERT INTO todos (userId,title, completed) VALUES(?,?,?)`;

        const [{ affectedRows }] = await pool.query(query, [postTodo[0], postTodo[1], postTodo[2]]);

        return affectedRows;

    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

async function updateCompletedTodos(res, todoId, isCompleted) {
    const { completed } = isCompleted;
    const query = `UPDATE todos SET completed =? WHERE id =?`;
    try {
        const [{ affectedRows }] = await pool.query(query, [completed, todoId]);
        return affectedRows;
    }
    catch (err) {
        res.status(500).json({ error: err });

    }
}

async function updateTodos(res, todoId, title) {
    const newTitle = title;
    const query = `UPDATE todos SET title =? WHERE id =?`;
    try {
        const [{ affectedRows }] = await pool.query(query, [newTitle, todoId]);
        return affectedRows;
    }
    catch (err) {
        res.status(500).json({ error: err });

    }
}


async function deleteDbTodos(res, todoId) {

    const query = `DELETE FROM todos WHERE id =?`;
    try {
        const [{ affectedRows }] = await pool.query(query, [todoId]);
        console.log(affectedRows);
        return affectedRows;
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}



module.exports = {
    getDbTodos: getDbTodos,
    postDbTodos: postDbTodos,
    updateCompletedTodos: updateCompletedTodos,
    updateTodos: updateTodos,
    deleteDbTodos: deleteDbTodos,
    getUnCompleted: getUnCompleted,
    searchLatter: searchLatter
};

