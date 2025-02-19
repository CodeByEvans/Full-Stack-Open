import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { updateBlog } from "../reducers/blogReducer";
import { showNotification } from '../reducers/notificationReducer'
import CommentForm from "./CommentForm";
import Togglable from "./Togglable";
import { useRef } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";


const Blog = () => {
  const blogs = useSelector((state) => state.blogs)

  const commentFormRef = useRef()

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const handleLike = async () => {
    console.log(blog)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }

    try {
      dispatch(updateBlog(updatedBlog))
      dispatch(showNotification(`You voted ${updatedBlog.title}`, "success", 5))
    } catch (exception) {
      dispatch(showNotification('Failed to update the blog',"error", 5))
    }
  }

  return(
    <div className="blog" data-testid='blog card'>
      <h3 style={{marginTop: 20, marginBottom:40}}>This is the page of the blog "{blog.title}"" by {blog.author}</h3>
        <ListGroup className="blog-details">
          <ListGroupItem><a href={blog.url}>this is the url: {blog.url}</a></ListGroupItem> 
          <ListGroupItem><p>{blog.likes} likes <Button onClick={handleLike}>like</Button></p></ListGroupItem>
          <ListGroupItem><p>added by the user: {blog.user.name}</p></ListGroupItem>
        </ListGroup>
        <div>
          <Togglable buttonLabel="New Comment" ref={commentFormRef}>
            <CommentForm/>
          </Togglable>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map(comment =>
              <li key={comment.id}>{comment.content}</li>
            )}
          </ul>
        </div>
    </div>
  )
}

export default Blog