import { Trash, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button"
function Tasks({newTask, onComplete, onDelete, onEdit}) {
  return (
    <div className="hover:scale-105 transform transition-transform duration-300 w-full rounded-lg bg-[#2B3A8C] p-4 text-white flex items-center place-content-between h-18">
      <div>
      <p className={`text-3xl ${newTask.completed?"line-through opacity-80":""}`}>{newTask.title}</p>
      <p className={`text-sm opacity-80 ${newTask.completed?"line-through opacity-50":""}`}>{newTask.description}</p>
      </div>
      <div className="flex gap-4">
      <Button onClick={onDelete} className="cursor-pointer w-8 h-8 rounded-md border-2 border-red-500 bg-white text-red-500 active:translate-y-[1.5px] hover:bg-red-200"><Trash/></Button>
      <Button onClick={onEdit} className="cursor-pointer w-8 h-8 rounded-md border-2 border-blue-500 bg-white text-blue-500 active:translate-y-[1.5px] hover:bg-blue-200"><Pencil/></Button>
      <Button onClick={onComplete} className="cursor-pointer w-8 h-8 rounded-md border-2 border-green-500 bg-white text-green-500 active:translate-y-[1.5px] hover:bg-green-200"><Check/></Button>
      </div>
    </div>
  )
}

export default Tasks
