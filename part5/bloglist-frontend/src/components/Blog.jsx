import { useState } from "react"

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    console.log(blog)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }

    await updateBlog(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const isSameUser = (blog.user.id === user.id)  || (blog.user.name === user.name)

  return(
    <div className="blog" style={blogStyle} data-testid='blog card'>
      <p className="blog-default">{blog.title} by {blog.author} <button onClick={toggleDetails}>{showDetails ? 'hide': 'view'}</button></p>
      {showDetails && (
        <div className="blog-details">
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {isSameUser && (
            <div>
              <button onClick={() => {removeBlog(blog)}}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog