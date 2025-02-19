import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { createComment } from "../reducers/blogReducer"
import { Button, Form } from "react-bootstrap"

const CommentForm = () => {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const id = useParams().id

    const uploadComment = (event) => {
        event.preventDefault()
        dispatch(createComment(id, comment))
        setComment('')
    }

    return (
        <Form onSubmit={uploadComment} className="d-flex my-2">
            <Form.Group>
                <Form.Control value={comment}
                onChange={event => setComment(event.target.value)} style={{width: 130}} />
            </Form.Group>
            <Button type="submit" className="mx-2">Comment</Button>
        </Form>
    )
}

export default CommentForm