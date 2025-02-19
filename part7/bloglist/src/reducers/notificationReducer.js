import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    type: ""
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return {
                message: action.payload.message,
                type: action.payload.type
            }
        },
        clearNotification() {
            return initialState;
        }
    },
})

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, type, timeout) => {
    return async dispatch => {
        dispatch(setNotification({message, type}))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000)
    }
}
export default notificationSlice.reducer