import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/requests"
import { useNotification } from "./NotificationContext"

const AnecdoteForm = () => {
  const { dispatch } = useNotification()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: "SHOW_NOTIFICATION", payload: `Anecdote "${content}" added` });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
    onError: () => {
      dispatch({ type: "SHOW_NOTIFICATION", payload: `The Anecdote must be at least 5 characters long` });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.lenght < 5) {
      alert('The anecdote must be at least 5 characters long')
      return;
    }
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
