import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  const dispatch = use

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)

    const updatedBlogs = await blogService.getAll()
    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs( updatedBlogs )
  }


  const addBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)

      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))
      setNotification({ message: `A new blog titled "${createdBlog.title}" by ${createdBlog.author} added`, type: 'success'})
      setTimeout(() => {
        setNotification(null)
      },5000)
    } catch (exception) {
      setNotification({ message: 'Failed to create a new blog entry', type: 'error'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const updateBlog = async(updatedBlog) => {
    try {
      await blogService.update(updatedBlog.id, updatedBlog)
      const updatedBlogs = await blogService.getAll();
      updatedBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs(updatedBlogs); 
      dispatch(showNo)
    } catch (exception) {
      setNotification({message: 'Failed to update the blog', type: 'error'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs)
    } catch (exception) {
      setNotification({message: 'Failed to delete the blog', type: 'error'})
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification?.message} type={notification?.type} />
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              data-testid='username'
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              data-testid='password'
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification?.message} type={notification?.type} />
      <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>
      )}
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    </div>
  )
}

export default App