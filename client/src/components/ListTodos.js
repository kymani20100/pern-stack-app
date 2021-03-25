import React, { Fragment, useEffect, useState } from 'react'
// import the editing component *only
import EditTodo from './EditTodo';

const ListTodos = () => {
    // set state to assign data that useEffect will be fetching
    const [todos, setTodos] = useState([]);

    // delete todo function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todo/${id}`, {
                method: "DELETE"
            });
            console.log(deleteTodo);
            // refresh the Todo Lists
            setTodos(todos.filter(todo => todo.todo_id !== id));

        } catch (error) {
            console.log(error.message);
        }
    }

    // fetch data everytime page renders with useEffect
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            // assign json data to the state variable
            setTodos(jsonData);

        } catch (error) {
            console.log(error.message)
        }
    }
    // create a use effect to evoke the function that fetches the data
    useEffect(() => {
        getTodos();
    }, []);
    return (
        <Fragment>
            <table className="table table-striped mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {todos.map((todo) => {
                        return (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td><EditTodo todo={todo} /></td>
                                <td>
                                    <button onClick={() => deleteTodo(todo.todo_id)} className="btn btn-danger">x</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;
