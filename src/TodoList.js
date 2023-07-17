import React, { useState } from 'react';
import "./App.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setCompletedTodos([...completedTodos, false]);
      setNewTodo('');
    }
  };

  // Function to handle editing a todo
  const handleEditTodo = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  // Function to handle updating a todo
  const handleUpdateTodo = () => {
    if (editValue.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = editValue;
      setTodos(updatedTodos);
      setEditIndex(-1);
      setEditValue('');
    }
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);

    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.splice(index, 1);
    setCompletedTodos(updatedCompletedTodos);
  };

  // Function to handle deleting all todos
  const handleDeleteAllTodos = () => {
    setTodos([]);
    setCompletedTodos([]);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (index) => {
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos[index] = !updatedCompletedTodos[index];
    setCompletedTodos(updatedCompletedTodos);
  };

  return (
  
    <div className="todo-container">
      <h1 className="todo-heading">Todo List</h1>
      <div className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="todo-button">
          Add Todo
        </button>
      </div>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Todo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={completedTodos[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                {index === editIndex ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="todo-edit-input"
                  />
                ) : (
                  <span
                    className={completedTodos[index] ? 'completed-todo' : ''}
                    onClick={() => handleEditTodo(index, todo)}
                  >
                    {todo}
                  </span>
                )}
              </td>
              <td>
                {index === editIndex ? (
                  <button onClick={handleUpdateTodo} className="todo-update-button">
                    Update
                  </button>
                ) : (
                  <button onClick={() => handleEditTodo(index, todo)} className="todo-edit-button">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDeleteTodo(index)} className="todo-delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDeleteAllTodos} className="todo-remove-all-button">
        Remove All
      </button>
    </div>

  );
}

export default TodoList;
