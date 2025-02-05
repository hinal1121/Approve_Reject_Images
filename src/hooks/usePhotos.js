import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAlert from '../hooks/useAlert'
import {
  photosActions,
  selectApprovedPhotos,
  selectPhotos,
  selectRejectedPhotos
} from '../redux/reducers/photos'
import { uiActions } from '../redux/reducers/ui'
import api from '../utils/api'

// hooks, that makes it easy to manage photos in application: (get all photos, get only approved ones and so on)
const usePhotos = () => {
  const [photoPresented, setPhotoPresented] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  const allPhotos = useSelector((state) => selectPhotos(state))
  const approvedPhotos = useSelector((state) => selectApprovedPhotos(state))
  const rejectedPhotos = useSelector((state) => selectRejectedPhotos(state))

  const alert_ = useAlert()

  const dispatch = useDispatch()

  const numApproved = useMemo(() => approvedPhotos.length, [approvedPhotos])
  const numRejected = useMemo(() => rejectedPhotos.length, [rejectedPhotos])

  const presentNewPhoto = async () => {
    try {
      setIsFetching(true)

      const { data } = await api.getRandomPhoto()

      if (allPhotos.find((photo) => photo.id === data.id)) {
        return presentNewPhoto()
      }
      
      if (photoPresented && (photoPresented.id === data.id)) {
        return presentNewPhoto()
      }

      setPhotoPresented({
        id: data.id,
        url: data.urls.small,
      })
    } catch (e) {
      alert_.error('Something went wrong!(See console)')
      console.log(e.response)
    } finally {
      setIsFetching(false)
    }
  }

  const approvePhotoPresented = () => {
    // if user already approved of rejected current photo, not to do anything
    if (allPhotos.find((photo) => photo.id === photoPresented.id)) {
      return
    }

    dispatch(photosActions.addPhoto({ ...photoPresented, isApproved: true }))
  }

  const rejectPhotoPresented = () => {
    // if user already approved of rejected current photo, not to do anything
    if (allPhotos.find((photo) => photo.id === photoPresented.id)) {
      return
    }

    dispatch(photosActions.addPhoto({ ...photoPresented, isApproved: false }))
  }

  // open full screen panel to see photo in details
  const viewPhoto = (photoId) => {
    dispatch(uiActions.setPhotoViewing_id(photoId))
  }

  const setPhotos = (photos) => {
    dispatch(photosActions.setPhotos(photos))
  }

  return {
    allPhotos,
    approvedPhotos,
    rejectedPhotos,
    photoPresented,
    presentNewPhoto,
    numApproved,
    approvePhotoPresented,
    rejectPhotoPresented,
    isFetching,
    numRejected,
    viewPhoto,
    setPhotos,
  }
}

export default usePhotos
