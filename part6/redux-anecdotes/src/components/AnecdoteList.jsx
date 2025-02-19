import { useSelector, useDispatch } from "react-redux"
import { updateAnecdote, vote as voteAction } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.filter
        ? state.anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
          )
          : state.anecdotes
    })
    const dispatch = useDispatch()

    const sortedVotes = [...anecdotes].sort((a,b) => b.votes - a.votes)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(updateAnecdote(anecdote))
        dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {sortedVotes.map(anecdote => 
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList