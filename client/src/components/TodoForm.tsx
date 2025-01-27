import { useState } from "react"
import { Button, Flex, Input, Spinner } from "@chakra-ui/react"
import { IoMdAdd } from "react-icons/io"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { BASE_URL } from "../App"

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("")

  const queryClient = useQueryClient()
  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (event: React.FormEvent) => {
      event.preventDefault()

      try {
        const res = await fetch(BASE_URL + "/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: newTodo }),
        })
        const data = await res.json()
        if (res.ok) throw new Error(data.error || "Failed to create todo")
        setNewTodo("")
        return data
      } catch (error) {
        console.error("Error:", error)
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onError: (error) => alert(error.message),
  })
  return (
    <form onSubmit={createTodo}>
      <Flex gap={2}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={(input) => input && input.focus()}
        />
        <Button
          mx={2}
          type="submit"
          _active={{
            transform: "scale(.97)",
          }}
        >
          {isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
        </Button>
      </Flex>
    </form>
  )
}
export default TodoForm
