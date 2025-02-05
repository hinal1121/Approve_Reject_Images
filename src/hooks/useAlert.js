import { useDispatch, useSelector } from 'react-redux'
import { selectAlert, uiActions } from '../redux/reducers/ui'

// hook, that makes it easy to manage alert: close alert, open alert, ...
const useAlert = () => {
  const alert = useSelector((state) => selectAlert(state))

  const dispatch = useDispatch()

  const success = (message) => {
    dispatch(uiActions.openAlert({ severity: 'success', message }))
  }

  const error = (message) => {
    dispatch(uiActions.openAlert({ severity: 'error', message }))
  }

  const close = () => {
    dispatch(uiActions.closeAlert())
  }

  return {
    success,
    error,
    close,
    ...alert,
  }
}

export default useAlert
