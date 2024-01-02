const mysql = require('mysql2/promise');
const pool = require('./connection');



async function getDbTodos(userId) {
        const query = `SELECT * FROM todos
    WHERE userId  = ?`;

        const todos = await pool.query(query, [userId]);
        return (todos);
    
   
}

async function getUnCompleted(userId) {
 
        const query = `SELECT * FROM todos
    WHERE userId  = ? AND completed = 0`;
        const [todos] = await pool.query(query, [userId]);
        return (todos);
    

 
}

async function searchLatter(userId, searchLatter) {
    const query = `SELECT * FROM todos
    WHERE userId  =? AND title LIKE ?`;
    const [todos] = await pool.query(query, [userId, `%${searchLatter}%`]);
    return (todos);
}

async function postDbTodos(todo) {
    const postTodo = [todo.userId, todo.title, todo.completed];
  
        const query = `INSERT INTO todos (userId,title, completed) VALUES(?,?,?)`;

        const [{ affectedRows }] = await pool.query(query, [postTodo[0], postTodo[1], postTodo[2]]);

        return affectedRows;

  
}

async function updateCompletedTodos(todoId, isCompleted) {
    const { completed } = isCompleted;
    const query = `UPDATE todos SET completed =? WHERE id =?`;
    
        const [{ affectedRows }] = await pool.query(query, [completed, todoId]);
        return affectedRows;
    
   
}

async function updateTodos(todoId, title) {
    const newTitle = title;
    const query = `UPDATE todos SET title =? WHERE id =?`;

        const [{ affectedRows }] = await pool.query(query, [newTitle, todoId]);
        return affectedRows;
    
    
}


async function deleteDbTodos(todoId) {

    const query = `DELETE FROM todos WHERE id =?`;
  
        const [{ affectedRows }] = await pool.query(query, [todoId]);
        console.log(affectedRows);
        return affectedRows;
 
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

