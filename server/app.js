const express = require('express');
const cors = require('cors');

const todosRoute = require('./routes/todosRoute.js');
const loginRoute = require('./routes/loginRoute.js');
const postsRoute = require('./routes/postsRoute.js');
const homeRoute = require('./routes/homeRoute.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/todos",todosRoute);
app.use("/login",loginRoute);
app.use("/posts",postsRoute);
app.use("/user",homeRoute);

// app.use(express.static('"C:\Users\stu\Desktop\My-Virtual-World\client\src\App.js"'));

app.get("/", async (req, res) => {

    res.send("hello world");
})

app.listen(3500,()=>{
    console.log("Server is running on port 3500");
});