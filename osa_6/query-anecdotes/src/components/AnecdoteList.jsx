import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, updateAnecdote } from "../requests"
import { useNotificationDispatch } from "../context/NotificationContext"
import { setNotification } from "../reducers/notificationReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const currentAnecdotes = queryClient.getQueryData(["anecdotes"])
      const updatedAnecdotes = currentAnecdotes.map(anecdote =>
        anecdote.id !== updatedAnecdote.id
          ? anecdote
          : updatedAnecdote
      )

      queryClient.setQueryData(["anecdotes"], updatedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    newVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    setNotification(notificationDispatch, "VOTE", anecdote.content, 5)
  }

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div> Loading data</div>
  } else if (result.isError) {
    return <div> Anecdote service not available due to server issues </div>
  }

  const anecdotes = result.data

  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={handleVote} />
        )
      }
    </div>
  )
}

export default AnecdoteList