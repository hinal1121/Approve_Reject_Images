import ThemeProvider from '@mui/system/ThemeProvider'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import theme from '../utils/theme'

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  )
}

export const customRender = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options })
}
