import { Button } from "@/Components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input"
import React from "react"
import { ToDoList } from "../Contexts/ToDoListContext"
function DisplayDialog() {
  const {
    showEdit,
    taskToEdit,
    handleEditTask,
    setShowEdit
    }=React.useContext(ToDoList);
  return (
    <Dialog open={showEdit} onOpenChange={setShowEdit}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Edit Task</DialogTitle>
    </DialogHeader>

    <form action={handleEditTask} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Title</label>
        <Input
          name="title"
          defaultValue={taskToEdit?.title}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Description</label>
        <Input
          name="description"
          defaultValue={taskToEdit?.description}
        />
      </div>

      <DialogFooter className="gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowEdit(false)}
          className="font-roboto cursor-pointer"
        >
          Cancel
        </Button>

        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-roboto cursor-pointer hover:translate-y-0.5 active:translate-y-0.75">
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
  )
}

export default DisplayDialog
