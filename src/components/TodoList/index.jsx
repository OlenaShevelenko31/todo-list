// import React from 'react'
// import { useState } from 'react'
// import ToDoListItem from '../ToDoListItem';
// import styles from '../TodoList/TodoList.module.css'

// export default function ToDoComponent({ tasks }) {
//   const [todos, setTodos] = useState(tasks);
//   const [newTodo, setNewTodo] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
//   const [editValue, setEditValue] = useState('');

//   const handleAddTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([ { title: newTodo }, ...todos]);
//       setNewTodo('');
//     }
//   };
//   const handleDelete = (index) => {
//     const updatedTodos = todos.filter((_, idx) => idx !== index);
//     setTodos(updatedTodos);
//   };
//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setEditValue(todos[index].title);
//   };

//   const handleSave = (index) => {
//     if (editValue.trim()) {
//       const updatedTodos = [...todos];
//       updatedTodos[index].title = editValue;
//       setTodos(updatedTodos);
//       setEditIndex(null);
//       setEditValue('');
//     }
//   };



//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Add task"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//       />
//       <button onClick={handleAddTodo}>Add</button>

//       {/* ========== showing all tasks ========== */}
//       {todos.map((item, index) => (
//         <div key={index}>
//           <div className={styles.taskContainer}>
//             <input type="checkbox" />
//             <p >{item.title}</p>
//             <button onClick={() => handleEdit(index)}>Edit</button>
//             <button onClick={() => handleDelete(index)}>Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useReducer, useState } from 'react';
import styles from '../TodoList/TodoList.module.css';

// Reducer function to manage todo state
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [{ title: action.payload }, ...state];
    case 'DELETE_TODO':
      return state.filter((_, index) => index !== action.payload);
    case 'EDIT_TODO':
      return state.map((todo, index) =>
        index === action.payload.index ? { ...todo, title: action.payload.title } : todo
      );
    default:
      return state;
  }
};

export default function ToDoComponent({ tasks }) {
  const [todos, dispatch] = useReducer(todoReducer, tasks);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  const handleDelete = (index) => {
    dispatch({ type: 'DELETE_TODO', payload: index });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].title);
  };

  const handleSave = (index) => {
    if (editValue.trim()) {
      dispatch({ type: 'EDIT_TODO', payload: { index, title: editValue } });
      setEditIndex(null);
      setEditValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>

      {/* Rendering all tasks */}
      {todos.map((item, index) => (
        <div key={index} className={styles.taskContainer}>
          <input type="checkbox" />
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => handleSave(index)}>Save</button>
            </>
          ) : (
            <p>{item.title}</p>
          )}
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
