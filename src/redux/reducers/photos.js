import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addPhoto(state, { payload }) {
      state.list.push(payload)
    },
    setPhotos(state, { payload }) {
      state.list = payload
    },
  },
})

export const selectPhotos = (state) => {
  return state.photos.list
}

export const selectApprovedPhotos = (state) => {
  return state.photos.list.filter((photo) => photo.isApproved === true)
}

export const selectRejectedPhotos = (state) => {
  return state.photos.list.filter((photo) => photo.isApproved !== true)
}

export const selectPhotoById = (state, id) => {
  return state.photos.list.find((photo) => photo.id === id)
}

export const photosActions = {
  ...photosSlice.actions,
}

const photosReducer = photosSlice.reducer

export default photosReducer
