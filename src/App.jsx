import { useState } from 'react'
import './App.css'
import ToDoComponent from './components/TodoList'
import data from './data/data'

function App() {
  const [tasks, setTasks] = useState(data)

  return (
    <>
    <h1>Create Todo List:</h1>
    <ToDoComponent tasks={tasks} />
    </>
  )
}

export default App
