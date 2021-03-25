import React, {Fragment, useState} from 'react'

const InputTodo = () => {
    const [description, setDescription] = useState('');
    // set function to handle form submit
    const onFormSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = '/';
        } catch (error) {
            console.error(error.message)
        }
    }
     return (
        <Fragment>
            <h1 className="text-center mt-5">
                P.E.R.N ToDo List
            </h1>
            <form className="d-flex mt-5" onSubmit={(e) => onFormSubmit(e)}>
                <input type="text" onChange={e => setDescription(e.target.value)} value={description} className="form-control" />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;
