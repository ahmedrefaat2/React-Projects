import { useState, useEffect, useMemo, useCallback } from "react"
import { nanoid } from "nanoid"
import {ToDoList} from "../Contexts/ToDoListContext"
import Tasks from "./Tasks"
import { toast } from "sonner"
export function ToDoListProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
});
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

    const taskObject = {
      id: nanoid(10),
      title: newTask,
      description: "Add Description...",
      completed: false,
    }

    setTasks(prev => [...prev, taskObject])
    toast.success("New Task added successfully ✅",
    { position: "top-center",
      duration: 3000,
      style: {
        backgroundColor: "#16a34a",
        color: "#ffffff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        fontWeight: "500",
        maxWidth: "16rem"
  }
    })
    setCurrentTab("all")
  }

  const markCompleted = useCallback((id)=>{
    setTasks(prev =>
      prev.map(obj =>
        obj.id === id ? { ...obj, completed: true } : obj
      )
    )
    setCurrentTab("completed")
  },[setTasks, setCurrentTab])

  const filteredTasks = useMemo(() => {
  if (currentTab === "all") return tasks
  if (currentTab === "completed") return tasks.filter(obj => obj.completed)
  if (currentTab === "not-completed") return tasks.filter(obj => !obj.completed)
  return []
}, [tasks, currentTab])

  const requestDeleteTask = useCallback((id) => {
    setTaskToDelete(id)
    setShowConfirm(true)
  },[setTaskToDelete, setShowConfirm])

  const confirmDeleteTask = () => {
    if (!taskToDelete) return
    const deletedTask = tasks.find(t => t.id === taskToDelete)
    if (!deletedTask) return
    setTasks(prev => prev.filter(task => task.id !== taskToDelete))
    setShowConfirm(false)
    setTaskToDelete(null)
    toast("Task removed 🗑️", {
      position: "top-center",
      duration: 3000,
      action: {
        label: "Undo",
        onClick: () => {
          setTasks(prev => [deletedTask, ...prev])
        }
      },
      style: {
        backgroundColor: "#dc2626",
        color: "#ffffff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        fontWeight: "500",
        maxWidth:"16rem",
      }
    })
  }

  const cancelDeleteTask = () => {
    setShowConfirm(false)
    setTaskToDelete(null)
  }

  const openEditModal = useCallback((task) => {
    setTaskToEdit(task)
    setShowEdit(true)
  },[setTaskToEdit, setShowEdit])

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
    toast.success("Changes saved ✏️",
      {position: "top-center",
      duration: 3000,
      style: {
        backgroundColor: "#f59e0b",
        color: "#ffffff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        fontWeight: "500",
        maxWidth: "16rem"
      }
    })
    setShowEdit(false)
    setTaskToEdit(null)
  }
  
  const renderTasks = useMemo(() => {
  return filteredTasks.map(task => (
    <Tasks
      key={task.id}
      newTask={task}
      onComplete={() => {
        const wasCompleted = task.completed
        markCompleted(task.id)
        if (!wasCompleted) {
          toast.success("Nice! Task completed ✅", {
          position: "top-center",
          duration: 3000,
          style: {
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            fontWeight: "500",
            maxWidth: "16rem"
          }
      })}}}
      onDelete={() => requestDeleteTask(task.id)}
      onEdit={() => openEditModal(task)}
    />
  ))
}, [filteredTasks, markCompleted, requestDeleteTask, openEditModal])

  const value = {
    tasks,
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