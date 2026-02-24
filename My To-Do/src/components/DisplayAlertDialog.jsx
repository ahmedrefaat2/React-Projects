import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React from "react"
import { ToDoList } from "../Contexts/ToDoListContext"
function DisplayAlertDialog() {
  const {
    confirmDeleteTask,
    cancelDeleteTask,
    setShowConfirm,
    showConfirm
    }=React.useContext(ToDoList);
  return (
    <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Task</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to delete this task?
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel className="font-roboto cursor-pointer" onClick={cancelDeleteTask}>
        Cancel
      </AlertDialogCancel>

      <AlertDialogAction
        className="bg-red-700 text-destructive-foreground cursor-pointer hover:bg-red-600 hover:translate-y-0.5 active:translate-y-0.75 font-roboto"
        onClick={confirmDeleteTask}
      >
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DisplayAlertDialog
