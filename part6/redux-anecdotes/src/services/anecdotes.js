import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {
        content: content,
        votes:0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnecdote = async (object) => {
    const votedAnecdote = {
        ...object,
        votes: object.votes + 1,
    }
    const response = await axios.put(`${baseUrl}/${object.id}`, votedAnecdote)
    return response.data
}

export default { getAll, createNew, voteAnecdote }