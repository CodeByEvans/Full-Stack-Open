import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        createBlog({ title, author, url})

        setTitle('')
        setAuthor('')
        setUrl('')
    }
    
    return (
        <div>
            <h2>Create a new Blog</h2>

            <form onSubmit={onSubmit}>
                <div>
                    Title:
                    <input
                      data-testid='title'
                      value={title}
                      onChange={event => setTitle(event.target.value)}
                      placeholder="Title"
                    />
                </div>
                <div>
                    Author:
                    <input
                      data-testid='author'
                      value={author}
                      onChange={event => setAuthor(event.target.value)}
                      placeholder="Author"
                    />
                </div>
                <div>
                    Url:
                    <input
                      data-testid='url'
                      value={url}
                      onChange={event => setUrl(event.target.value)}
                      placeholder="Url"
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm