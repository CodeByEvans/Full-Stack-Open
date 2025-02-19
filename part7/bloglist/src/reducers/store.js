import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import authReducer from './authReducer'
import usersReducer from './usersReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        auth: authReducer,
        users: usersReducer
    }
})

export default store