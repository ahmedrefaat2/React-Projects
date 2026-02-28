import { Button } from "@/components/ui/button"
import {Card,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
import { ToDoList } from "../Contexts/ToDoListContext"
function MyToDo() {
  const {
      currentTab,
      setCurrentTab,
      handleToDoList,
      renderTasks
    }=React.useContext(ToDoList);
  return (
    <Card className="w-full max-w-lg">
        <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <Tabs value={currentTab} onValueChange={setCurrentTab}  className="w-full">
                <TabsList className="mx-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="not-completed">Not completed</TabsTrigger>
                </TabsList>
                <TabsContent value="all">{renderTasks}</TabsContent>
                <TabsContent value="completed">{renderTasks}</TabsContent>
                <TabsContent value="not-completed">{renderTasks}</TabsContent>
            </Tabs>
        </CardHeader>
        <form action={handleToDoList}>
        <CardFooter className="flex-row-reverse gap-2">
        <Input  type="text" name="todo-list" placeholder="New Task"
                required
                autoComplete="off"
        >
        </Input>
        <Button variant="destructive" className="w-20">
            Add
        </Button>
        </CardFooter>
        </form>
        
    </Card>
  )
}

export default MyToDo
