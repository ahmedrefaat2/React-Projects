import React from "react"
import { ToDoList } from "./Contexts/ToDoListContext"
import MyToDo from "./components/MyToDo";
import  DisplayAlertDialog  from "./components/DisplayAlertDialog";
import  DisplayDialog  from "./components/DisplayDialog";
import { Toaster } from "@/components/ui/sonner"
export default function App(){
    const {
    showConfirm,
    showEdit,
  }=React.useContext(ToDoList);
    return (
      <div className="flex min-h-screen justify-center items-center font-roboto">
        <Toaster />
        <MyToDo />
        {showConfirm && <DisplayAlertDialog />}
        {showEdit && <DisplayDialog />}
      </div>
    )
}
