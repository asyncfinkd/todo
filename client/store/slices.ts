import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  name: '',
  lastName: '',
  email: '',
  role: '',
  logged: false,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    value: initialState,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { login } = UserSlice.actions

export default UserSlice.reducer
