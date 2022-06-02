import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: false,
  message: ''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show_true: (state, {payload}) => {
      const message = payload
      state.show = true
      state.message = message
    },
    show_false: (state) => {
      state.show = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { show_true, show_false } = modalSlice.actions

export default modalSlice.reducer