const express = require('express');
const todosRoute = require('./routes/todosRoute.js');
const loginRoute = require('./routes/loginRoute.js');
const postsRoute = require('./routes/postsRoute.js');
const app = express();

app.use(express.json());
app.use("/todos",todosRoute);
app.use("/login",loginRoute);
app.use("/posts",postsRoute);

app.get("/", async (req, res) => {

    res.send("hello world");
})

app.listen(3500,()=>{
    console.log("Server is running on port 3500");
});