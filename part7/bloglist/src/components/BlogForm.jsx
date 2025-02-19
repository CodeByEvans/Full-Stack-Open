import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { Button, Form, FormGroup } from "react-bootstrap"

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (event) => {
        event.preventDefault()
        const newBlog = {title, author, url}
        dispatch(createBlog(newBlog))

        setTitle('')
        setAuthor('')
        setUrl('')
    }
    
    return (
        <div className="mt-4">
            <h2>Create a new Blog</h2>

            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      data-testid='title'
                      value={title}
                      onChange={event => setTitle(event.target.value)}
                      placeholder="Title"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      data-testid='author'
                      value={author}
                      onChange={event => setAuthor(event.target.value)}
                      placeholder="Author"
                    />
                </Form.Group>
                <FormGroup>
                    <Form.Label>Url:</Form.Label>
                    <Form.Control
                      data-testid='url'
                      value={url}
                      onChange={event => setUrl(event.target.value)}
                      placeholder="Url"
                    />
                </FormGroup>
                <Button variant="primary" type="submit" className="mt-3">Create</Button>
            </Form>
        </div>
    )
}
export default BlogForm