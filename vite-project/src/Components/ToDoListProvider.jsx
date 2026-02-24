import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import {ToDoList} from "../Contexts/ToDoListContext"
import Tasks from "./Tasks"
export function ToDoListProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
});
  const [error, setError] = useState("")
  const [currentTab, setCurrentTab] = useState("all")
  const [showConfirm, setShowConfirm] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
  const handleToDoList = (formData) => {
    const newTask = formData.get("todo-list")

    if (!newTask.trim()) {
      setError("Enter Your New Task Please!")
      return
    }

    setError("")

    const taskObject = {
      id: nanoid(10),
      title: newTask,
      description: "Add Description...",
      completed: false,
    }

    setTasks(prev => [...prev, taskObject])
  }

  const markCompleted = (id) => {
    setTasks(prev =>
      prev.map(obj =>
        obj.id === id ? { ...obj, completed: true } : obj
      )
    )
    setCurrentTab("completed")
  }

  const filteredTasks = (tab) => {
    if (tab === "all") return tasks
    if (tab === "completed") return tasks.filter(obj => obj.completed)
    if (tab === "not-completed") return tasks.filter(obj => !obj.completed)
    return []
  }

  const requestDeleteTask = (id) => {
    setTaskToDelete(id)
    setShowConfirm(true)
  }

  const confirmDeleteTask = () => {
    setTasks(prev => prev.filter(task => task.id !== taskToDelete))
    setShowConfirm(false)
    setTaskToDelete(null)
  }

  const cancelDeleteTask = () => {
    setShowConfirm(false)
    setTaskToDelete(null)
  }

  const openEditModal = (task) => {
    setTaskToEdit(task)
    setShowEdit(true)
  }

  const handleEditTask = (formData) => {
    const updatedTitle = formData.get("title")
    const updatedDescription = formData.get("description")

    setTasks(prev =>
      prev.map(task =>
        task.id === taskToEdit.id
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task
      )
    )

    setShowEdit(false)
    setTaskToEdit(null)
  }
  const renderTasks = (tab) => filteredTasks(tab).map(task=>(
      <Tasks 
        key={task.id}
        newTask={task}
        onComplete={()=>markCompleted(task.id)}
        onDelete={()=> requestDeleteTask(task.id)}
        onEdit={() => openEditModal(task)} 
      />
    ))

  const value = {
    tasks,
    error,
    currentTab,
    showConfirm,
    taskToDelete,
    showEdit,
    taskToEdit,
    setCurrentTab,
    handleToDoList,
    markCompleted,
    filteredTasks,
    requestDeleteTask,
    confirmDeleteTask,
    cancelDeleteTask,
    openEditModal,
    handleEditTask,
    setShowEdit,
    setShowConfirm,
    renderTasks
  }

  return (
    <ToDoList.Provider value={value}>
      {children}
    </ToDoList.Provider>
  )
}