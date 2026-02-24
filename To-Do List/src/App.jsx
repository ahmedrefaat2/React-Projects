import React from "react"
import { ToDoList } from "./Contexts/ToDoListContext"
import MyToDo from "./components/MyToDo";
import  DisplayAlertDialog  from "./components/DisplayAlertDialog";
import  DisplayDialog  from "./components/DisplayDialog";
export default function App(){
    const {
    showConfirm,
    showEdit,
  }=React.useContext(ToDoList);
    return (
      <div className="flex min-h-screen justify-center items-center font-roboto">
        <MyToDo />
        {showConfirm && <DisplayAlertDialog />}
        {showEdit && <DisplayDialog />}
      </div>
    )
}
