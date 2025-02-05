import { configureStore } from '@reduxjs/toolkit'
import photosReducer from './reducers/photos'
import uiReducer from './reducers/ui'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    photos: photosReducer,
  },
})

export default store
