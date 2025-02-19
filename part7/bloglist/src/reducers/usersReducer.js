import { createSlice } from "@reduxjs/toolkit";
import usersService from '../services/users'

const initialState = []

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers : {
        setUsers: (state, action) => action.payload
    }
})

export const {setUsers} = usersSlice.actions

export const initializeUsers = () => async (dispatch) => {
    const users = await usersService.getUsers();
    dispatch(setUsers(users))
}

export default usersSlice.reducer