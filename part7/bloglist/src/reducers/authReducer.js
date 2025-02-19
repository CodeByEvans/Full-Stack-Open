import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
    user:null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = null
        }
    }
})

export const { setUser, logoutUser } = authSlice.actions;

export const logIn = (username, password) => async (dispatch) => {
    const userData = await loginService.login({username, password})
    window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userData)
      )
    blogService.setToken(userData.token)
    dispatch(setUser(userData))
}

export const logOut = () => async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(logoutUser(null))
}

export default authSlice.reducer;