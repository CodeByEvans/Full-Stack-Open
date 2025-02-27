import axios from 'axios'
import { createComment } from '../reducers/blogReducer'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token}
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`,updatedBlog, config)
    return response.data
  } catch (error) {
    console.error("Error updating blog:", error)
  }
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.error("Error removing blog:", error)
  }
}

  const uploadComment = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, {content: comment})
    return response.data
  }

export default { getAll, setToken, create, update, remove, uploadComment }