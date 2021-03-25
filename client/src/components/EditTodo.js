import React, { Fragment, useState } from 'react';

const EditTodo = ({todo}) => {
    // set the state variables to manage state
    const [description, setDescription] = useState(todo.description);
    // function to submit form and update the field 
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = '/';
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <Fragment>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                 Edit
                </button>

                <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todos</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                    </div>

                    <div className="modal-body">
                        <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" />
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={e => updateDescription(e)} className="btn btn-warning" data-dismiss="modal">Edit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                    </div>

                    </div>
                </div>
                </div>
        </Fragment>
    )
}

export default EditTodo;
