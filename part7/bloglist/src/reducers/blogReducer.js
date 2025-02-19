import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        appendBlog: (state, action) => {
            state.push(action.payload);
        },
        setBlogs: (state, action) => action.payload,
        setComment: (state, action) => {
            const { blogId, newComment } = action.payload;
            return state.map((blog) =>
                blog.id === blogId
                    ? {...blog, comments: [...blog.comments,  newComment]}
                    : blog
            )
        }
    }
})

export const { appendBlog, setBlogs, likeBlog, setComment } = blogSlice.actions;

export const intializeBlogs = () => async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(blogs));
}

export const createBlog = (blog) => async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog))
}

export const updateBlog = (updatedBlog) => async (dispatch) => {
    await blogService.update(updatedBlog.id, updatedBlog);
    const updatedBlogs = await blogService.getAll()
    updatedBlogs.sort((a,b) => b.likes - a.likes)
    dispatch(setBlogs(updatedBlogs))
}

export const createComment = (id, comment ) => async (dispatch) => {
    const newComment = await blogService.uploadComment(id, comment)
    dispatch(setComment({blogId: id, newComment}))
}

export default blogSlice.reducer