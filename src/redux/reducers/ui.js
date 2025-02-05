import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentVisibleModal: null, // can be: 'add-photo'
  alert: {
    isOpen: false,
    severity: null, // can be: 'success', 'error'
    message: null, // message that will be written on alert
  },
  photoViewing_id: null, // id of photo that is being views, must be string
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      state.currentVisibleModal = payload
    },
    closeModals(state) {
      state.currentVisibleModal = null
    },
    openAlert(state, { payload }) {
      state.alert = {
        isOpen: true,
        severity: payload.severity,
        message: payload.message,
      }
    },
    closeAlert(state) {
      state.alert = {
        isOpen: false,
        severity: null,
        message: null,
      }
    },
    setPhotoViewing_id(state, { payload }) {
      state.photoViewing_id = payload
    },
  },
})

export const selectCurrentVisibleModal = (state) => {
  return state.ui.currentVisibleModal
}

/*
  return alert object, like:
  {
    isIpen: true,
    severity: 'success',
    message: 'Success'
  }
*/
export const selectAlert = (state) => {
  return state.ui.alert
}

// returns if of photo that is being viewed in full screen panel(in <ViewPhoto /> component)
export const selectPhotoViewing_id = (state) => {
  return state.ui.photoViewing_id
}

export const uiActions = {
  ...uiSlice.actions,
}

const uiReducer = uiSlice.reducer

export default uiReducer
