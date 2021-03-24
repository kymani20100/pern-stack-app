const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES
// create a todo
app.post("/todos", async(req,res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = pool.query("INSERT INTO lists (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
})

// get all the todos
app.get("/todos", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM lists");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message)
    }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
       // console.log(req.params);
       const {id} = req.params;
       const todo = await pool.query("SELECT * FROM TODO WHERE todo_id = $1", [id]);
       res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        // get the id from the url param
        const {id} = req.params;
        // get the description from the body param
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE lists SET description = $1 WHERE id = $2", [description, id]);
        res.json('Update succesful')

    } catch (error) {
        console.log(error.message);
    }
});

// delete a todo
app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM lists WHERE id = $1", [id]);
        res.json("items gone!");
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(4000, () => {
    console.log('server has started on port 4000');
})